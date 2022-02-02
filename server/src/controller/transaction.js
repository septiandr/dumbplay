// import model here
const { transaction } = require("../../models");
const {user} = require("../../models");
exports.addTransaction = async (req, res) => {
  try {
    console.log(req.body)
      const add ={
        ...req.body,
        attache:req.files.image[0].filename,
      }
    await transaction.create(add);
    res.send({
      status: "success",
      message: "Add Transaction",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getTransactions = async (req, res) => {
  try {
    const transactions = await transaction.findAll({
      include:[{
        model:user,
        as:"users",
        attributes:{
          exclude:["createdAt","updatedAt"],
        }
      }],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data:{
        transactions
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await transaction.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const{...data}=req.body
 
    const update ={
      ...data,
     }
    await transaction.update(update, {
      where: {
        id,
      },
    });

    const updatedData = await transaction.findOne({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      data: {
        user: updatedData,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.deleteTransaction = async (req, res) => {
  const { id } = req.params;
  try {
    await transaction.destroy({
      where: {
        id,
      },
    });

    res.send({
      status: "success",
      data:{
        id:id
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
