import { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    profilelink: {
      type: String,
      required: false,
      default: "",
    },
    image: {
      type: String,
      required: false,
      default: "http://placekitten.com/200/200",
    },
    likeCount: {
      type: Number,
      required: false,
      default: 0,
    },
    passwordReset: {
      type: Boolean,
      default: false,
    },
    updateCheck: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const UserModel = model("User", UserSchema);

export { UserModel };
