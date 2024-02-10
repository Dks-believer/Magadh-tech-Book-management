import adminModel from "../models/adminModel.js";

const createAdminService = async (params, callback) => {
  try {
    const { userID, totalStock } = params;

    const admin = new adminModel({
      _id: userID,
      totalStock,
    });
    console.log("createAdminService" , admin)
    await admin.save();

    return callback(false, {
      success: true,
      admin,
    });
  } catch (error) {
    return callback({
      success: false,
      message: error?.message,
    });
  }
};

export { createAdminService };
