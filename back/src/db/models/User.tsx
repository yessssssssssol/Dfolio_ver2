import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ userId }) {
    const user = await UserModel.findOne({ id: userId });
    return user;
  }
  static async findByObjectId({ objectId }) {
    const user = await UserModel.findOne({ _id: objectId });
    return user;
  }

  static async findAll(sortBy) {
    const users = await UserModel.find({}).sort({ [sortBy]: -1 });

    return users;
  }

  static async update({ userId, fieldToUpdate, newValue }) {
    const filter = { id: userId };
    const update = { [fieldToUpdate]: newValue };
    let option = {};
    if (fieldToUpdate === "likeCount") {
      option = { returnOriginal: false, timestamps: false };
    } else {
      option = { returnOriginal: false };
    }

    console.log(userId);
    console.log(fieldToUpdate);
    console.log(newValue);
    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async updatePassword({ email, newPassword, passwordReset }) {
    const filter = { email };
    const update = { password: newPassword, passwordReset };
    const option = { runValidators: true };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }
  static async deleteById({ userId }) {
    const deleteResult = await UserModel.deleteOne({ id: userId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { User };
