import mongoose from "mongoose";

const hadithSchema = new mongoose.Schema({
    collectionName: { 
        type: String, 
        required: true,
        index: true 
    },
    bookNumber: { 
        type: Number 
    },
    hadithNumber: { 
        type: String, 
        required: true 
    },
    narrator: { 
        type: String 
    },
    arabicText: { 
        type: String, 
        required: true 
    },
    translation: { 
        type: String, 
        required: true 
    },
    grade: { 
        type: String, 
        enum: ['Sahih', 'Hasan', 'Daif', 'Mutawatir', 'Unknown'],
        default: 'Unknown'
    },
    embedding: { 
        type: [Number], 
        required: true 
    }
});

const HadithSchema = mongoose.model("HadithSchema",hadithSchema);
export default HadithSchema;