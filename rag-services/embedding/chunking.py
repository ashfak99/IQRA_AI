import pandas as pd
import json

def generate_chunks(input_csv_path, output_json_path):
    print(f"Loading data from {input_csv_path}...")
    
    try:
        df = pd.read_csv(input_csv_path,encoding='utf-16').fillna("")
    except Exception as e:
        print(f"Error loading CSV: {e}")
        return
    
    documents = []
    
    for index, row in df.iterrows():
        
        if not row['english_text'].strip():
            continue
            
        page_content = row['english_text']
        
        metadata = {
            "surah_id": int(row['surah_id']),
            "ayah_number": int(row['ayah_number']),
            "arabic_text": row['arabic_text'],
            "hindi_translation": row['hindi_text']
        }
        
        chunk_object = {
            "page_content": page_content,
            "metadata": metadata
        }
        
        documents.append(chunk_object)
        
    print(f"Total Chunks Generated: {len(documents)}")
    print("Exporting to JSON...")
    
    with open(output_json_path, 'w', encoding='utf-8') as json_file:
        json.dump(documents, json_file, ensure_ascii=False, indent=4)
        
    print(f"Successfully saved chunks to {output_json_path}")
if __name__ == "__main__":
    generate_chunks(
        input_csv_path=r"D:\Project\IQRA AI\data\quranComplete.csv", 
        output_json_path=r"D:\Project\IQRA AI\data\quran_chunks.json"
    )