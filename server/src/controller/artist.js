// import model here
const { artist } = require("../../models");

exports.addArtist = async (req, res) => {
  try {
    console.log(req.body)
    await artist.create(req.body);
    res.send({
      status: "success",
      message: "Add Artist",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getArtists = async (req, res) => {
  try {
    const artists = await artist.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    res.send({
      status: "success",
      data:{
        artists
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

exports.getArtist = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await artist.findOne({
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
exports.updateArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const{...data}=req.body
    const update ={
      ...data,
    }
    await artist.update(update, {
      where: {
        id,
      },
    });

    const updatedData = await artist.findOne({
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
exports.deleteArtist = async (req, res) => {
  const { id } = req.params;
  try {
    await artist.destroy({
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
