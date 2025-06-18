import mongoose from "mongoose";

export const getValidObjectId = (_id: string): string => {
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new Error("Invalid ID");
  }
  return _id;
};
