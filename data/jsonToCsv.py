import json
import pandas as pd

def merge_json_to_csv(hindiFile, englishFile, arabicFile):
    
    with open(hindiFile, 'r', encoding='utf-8') as f:
        hindi_data = json.load(f)
    with open(englishFile, 'r', encoding='utf-8') as f:
        english_data = json.load(f)
    with open(arabicFile, 'r', encoding='utf-8') as f:
        arabic_data = json.load(f)

    final_list = []

    for hi_chap , en_chap, ar_chap in zip(hindi_data,english_data,arabic_data):
        surah_no = hi_chap['chapter']

        for index, (hi_verse, en_verse, ar_verse) in enumerate(zip(hi_chap['verses'], en_chap['verses'], ar_chap['verses'])):
            row = {
                'surah_id': surah_no,
                'ayah_number': index + 1,
                'arabic_text': ar_verse,
                'english_text': en_verse,
                'hindi_text': hi_verse
            }
            final_list.append(row)

    df = pd.DataFrame(final_list)
    df.to_csv('quranComplete.csv',index=False,encoding='utf-16')

    print(f"Success! Total {len(df)} aayaton ka data CSV mein save ho gaya hai.")
    return df

merge_json_to_csv('array.json','array_english.json','array_arabic.json')
