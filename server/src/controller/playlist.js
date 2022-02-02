// import model here
const { playlist } = require("../../models");
const { song } = require("../../models");
const {artist} = require("../../models");
exports.addPlaylist = async (req, res) => {
  try {
    console.log(req.body)
    await playlist.create(req.body);
    res.send({
      status: "success",
      message: "Add Playlist",
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.getPlaylists = async (req, res) => {
  try {
    const { userId } = req.params;

    const playlists = await playlist.findAll({
        where: {
            userId:userId,
          },
          include:[{
            model:song,
            as:"song",
            include:[{
              model:artist,
              as:"artist",
              attributes:{
                exclude:["createdAt","updatedAt"],
              }
            }],
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
        playlists
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


exports.deletePlaylist = async (req, res) => {
  const { id } = req.params;
  try {
    await playlist.destroy({
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
