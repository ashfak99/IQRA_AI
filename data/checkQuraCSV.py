import pandas as pd

df = pd.read_csv('quranComplete.csv', encoding='utf-16')

unique_surahs = df['surah_id'].nunique()
print(f"Total Unique Surahs Found: {unique_surahs}")

surah_stats = df['surah_id'].value_counts().sort_index()


all_ids = set(range(1, 115)) 
found_ids = set(df['surah_id'].unique())
missing = all_ids - found_ids

if not missing:
    print("Success! Saari 114 Surahs maujood hain.")
else:
    print(f"Missing Surah IDs: {missing}")