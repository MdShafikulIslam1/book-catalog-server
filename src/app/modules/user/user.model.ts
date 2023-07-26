import { Schema, model } from 'mongoose';
import { IUser, IUserMethods } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.statics.isUserExist = async function (
  email: string
): Promise<IUser | null> {
  return await User.findOne({ email: email });
};
userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.salt_round));
  next();
});
export const User = model<IUser, IUserMethods>('User', userSchema);
