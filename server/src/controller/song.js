// import model here
const { song } = require("../../models");
const {artist} =require("../../models")
exports.addSong = async (req, res) => {
  try {
      console.log(req.files.image[0].filename)
      const add ={
        ...req.body,
        attache:req.files.music[0].filename,
        thumbnail:req.files.image[0].filename
      }
    await song.create(add);
    res.send({
      status: "success",
      message: "Add Song",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getSongs = async (req, res) => {
  try {
    console.log('p')
    const songs = await song.findAll({
      include:[{
        model:artist,
        as:"artist",
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
        songs
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

exports.getSong = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await song.findOne({
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
exports.updateSong = async (req, res) => {
  try {
    const { id } = req.params;
    const{...data}=req.body
    const thumbnail = req.file.filename
    const update ={
      ...data,
      thumbnail,
    }
    await song.update(update, {
      where: {
        id,
      },
    });

    const updatedData = await song.findOne({
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
exports.deleteSong = async (req, res) => {
  const { id } = req.params;
  try {
    await song.destroy({
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
