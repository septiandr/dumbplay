const express = require("express");
const router = express.Router();

const {addUser,getUsers,getUser,updateUser,deleteUser} = require('../controller/user')
const {addArtist,getArtists,getArtist,updateArtist,deleteArtist} = require('../controller/artist')
const {addSong,getSongs,getSong,updateSong,deleteSong} = require('../controller/song')
const {addTransaction,getTransactions,getTransaction,updateTransaction,deleteTransaction} = require('../controller/transaction')

const {addPlaylist,getPlaylists,deletePlaylist} = require('../controller/playlist')


const {auth} = require('../middleware/auth')
const {uploadFile} = require('../middleware/uploadFile')
const { register, login,checkAuth} = require('../controller/auth');

router.post("/transaction",uploadFile('image'), addTransaction);
router.get("/transactions", getTransactions);
router.get("/transaction/:id", getTransaction);
router.put("/transaction/:id", updateTransaction);
router.delete("/transaction/:id", deleteTransaction);

router.post("/song",uploadFile('image','music'), addSong);
router.get("/songs", getSongs);
router.get("/song/:id", getSong);
router.put("/song/:id", updateSong);
router.delete("/song/:id", deleteSong);

router.post("/artist", addArtist);
router.get("/artists", getArtists);
router.get("/artist/:id", getArtist);
router.put("/artist/:id", updateArtist);
router.delete("/artist/:id", deleteArtist);

router.post("/user", addUser);
router.get("/users", getUsers);
router.get("/user/:id", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);

router.post("/playlist", addPlaylist);
router.get("/playlists/:userId", getPlaylists);
router.delete("/playlist/:id", deletePlaylist);

router.post("/register", register);
router.post("/login", login);
router.get("/check-auth/:id",checkAuth);


module.exports = router;