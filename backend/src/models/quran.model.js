import mongoose,{Schema} from "mongoose";

const quranSchema = new Schema({
    surahNumber : {
        type : Number,
        required : true,
        index : true
    },
    surahNameArabic: { 
        type: String, 
        required: true 
    },
    surahNameEnglish: { 
        type: String, 
        required: true 
    },
    ayahNumber: { 
        type: Number, 
        required: true 
    },
    arabicText: { 
        type: String, 
        required: true 
    },
    translationEnglish: { 
        type: String, 
        required: true 
    },
    embedding: { 
        type: [Number],
        required: true 
    },
})

const QuranSchema = mongoose.model("QuranSchema",quranSchema);
export default QuranSchema;