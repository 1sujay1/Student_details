const db = require("../../models");
const UserModel = db.user;

const createUser = async function (req, res) {
  try {
    let { name, totalMarks, _id } = req.body;
    if (!name || !totalMarks) {
      return res.json({
        status: false,
        message: "Required Name and TotalMarks",
      });
    }

    if (_id) {
      let checkExists = await UserModel.findOne({ _id, isDeleted: false });
      if (!checkExists) {
        return res.json({
          status: false,
          message: "User not found or deleted",
        });
      }
      let updateData = {};
      if (name) updateData.name = name;
      if (totalMarks) updateData.totalMarks = totalMarks;

      let updateResp = await UserModel.updateOne({ _id }, updateData);
      return res.json({
        status: true,
        msg: ["User updated successfully"],
        data: updateResp,
      });
    } else {
      let createResp = await UserModel.create(req.body);
      return res.json({
        status: true,
        msg: ["User created successfully"],
        data: createResp,
      });
    }
  } catch (error) {
    return res.json({
      status: false,
      message: "Internal Server Error " + JSON.stringify(error),
    });
  }
};

const getUser = async function (req, res) {
  try {
    let { page_no, page_size, id, name, totalMarks } = req.query;

    const page = parseInt(page_no) || 1;
    const pageSize = parseInt(page_size) || 10;
    let filter = { isDeleted: false };
    if (id) filter._id = id;
    // Determine if the search term is numeric
    const isNumeric = !isNaN(parseFloat(name)) && isFinite(name);

    if (name) {
      if (isNumeric) {
        filter.totalMarks = name;
      } else {
        filter.name = { $regex: new RegExp(name, "i") }; // 'i' for case insensitivity
      }
    }
    if (totalMarks) filter.totalMarks = totalMarks;

    const totalStudentsCount = await UserModel.countDocuments(filter);

    const students = await UserModel.find(filter)
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    if (!students.length) {
      return res.json({
        status: false,
        message: "No Data found",
      });
    }
    // Calculate total number of pages
    const totalPages = Math.ceil(totalStudentsCount / pageSize);
    return res.json({
      status: true,
      data: students,
      paginationData: { currentPage: page, pageSize, totalPages },
    });
  } catch (error) {
    return res.json({
      status: false,
      message: "Internal Server Error " + JSON.stringify(error),
    });
  }
};

const deleteUser = async function (req, res) {
  const _id = req.params.id;
  try {
    let checkExists = await UserModel.findOne({ _id, isDeleted: false });
    if (!checkExists) {
      return res.json({
        status: false,
        message: "User not found or already deleted",
      });
    }
    let deleteResp = await UserModel.updateOne({ _id }, { isDeleted: true });
    return res.json({
      status: true,
      msg: ["User deleted successfully"],
      data: deleteResp,
    });
  } catch (err) {
    return res.json({
      status: false,
      message: "Internal Server Error " + JSON.stringify(error),
    });
  }
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
};
