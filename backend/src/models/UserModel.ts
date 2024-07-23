import mongoose, {Document, Schema} from "mongoose";
import { User } from "../Interfaces/User";


export interface  IUser extends User,  Document  {}

const UserSchema = new Schema (
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
    },
    image:{
      type: String,
    },
    products: {
      type:[{type:Schema.Types.ObjectId, ref:'Product'}]
    },
    orders: {
      type:[{type:Schema.Types.ObjectId, ref:'Order'}]
    },
    cart: {
      type: [{type:Schema.Types.ObjectId, ref:'Product'}]
    }
  }
)

export default mongoose.model<IUser>('NovaMartUser', UserSchema)