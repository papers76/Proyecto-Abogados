import mongoose, { Document, Schema } from 'mongoose';

export interface IUsuario extends Document {
  username: string;
  password: string;
}

const usuarioSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Usuario = mongoose.model<IUsuario>('Usuario', usuarioSchema);
export default Usuario;

