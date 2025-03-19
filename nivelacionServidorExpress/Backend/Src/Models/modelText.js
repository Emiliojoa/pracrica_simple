import { model, Schema } from 'mongoose';

const textSchema = new Schema({
    texto: {
        type: String,
        require: true,
    }
});

export const textModel = model('Text', textSchema);