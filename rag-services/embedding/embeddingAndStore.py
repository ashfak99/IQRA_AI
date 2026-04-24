import json
import chromadb
from sentence_transformers import SentenceTransformer
import os

def build_vector_database(json_path, db_path):
    print("Step 1: Loading AI Model...")
    
    model = SentenceTransformer('all-MiniLM-L6-v2') 
    
    print(f"Step 2: Loading Data from {json_path}...")
    with open(json_path, 'r', encoding='utf-8') as f:
        chunks = json.load(f)
        
    print(f"Total Chunks found: {len(chunks)}")
    
    print(f"Step 3: Initializing ChromaDB at {db_path}...")
    
    chroma_client = chromadb.PersistentClient(path=db_path)
    
    collection_name = "quran_embeddings"
    try:
        chroma_client.delete_collection(name=collection_name)
    except:
        pass 
        
    collection = chroma_client.create_collection(name=collection_name)

    documents = []
    metadatas = []
    ids = []
    
    for i, chunk in enumerate(chunks):
        documents.append(chunk['page_content'])
        metadatas.append(chunk['metadata'])
        ids.append(f"ayah_{i}")

    print("Step 4: Generating Embeddings and Saving to Database...")
    print("Sit back, this might take 2-5 minutes depending on your CPU...")
    
    embeddings = model.encode(documents, show_progress_bar=True).tolist()
    
    batch_size = 3118
    for i in range(0, len(ids), batch_size):
        collection.add(
            embeddings=embeddings[i : i + batch_size],
            documents=documents[i : i + batch_size],
            metadatas=metadatas[i : i + batch_size],
            ids=ids[i : i + batch_size]
        )
        print(f"Inserted batch {i} to {i + len(ids[i:i+batch_size])}")
        
    print("\n✅ SUCCESS: Vector Database is Ready!")
    print(f"Total {collection.count()} items stored in database.")

if __name__ == "__main__":
    INPUT_JSON = r"D:\Project\IQRA AI\data\quran_chunks.json"
    OUTPUT_DB = r"D:\Project\IQRA AI\data\chroma_db"
    
    os.makedirs(OUTPUT_DB, exist_ok=True)
    
    build_vector_database(INPUT_JSON, OUTPUT_DB)