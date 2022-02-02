// import model
const { user } = require("../../models");
// import joi validation
const Joi = require("joi");

// import package here
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  // our validation schema here
  
  const schema = Joi.object({
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(5).required(),
    fullName: Joi.string().min(4).required(),
    gender: Joi.string().min(4).required(),
    address: Joi.string().min(4).required(),
    phone: Joi.string().min(5),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);
  
  // if error exist send validation error message
  if (error)
  return res.status(400).send({
    error: {
      error,
      message: error.details[0].message,
    },
  });
 
  try {
    // code here
    
    const salt = await bcrypt.genSalt(10);
    // we hash password from request with salt
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
   
    if(userExist){
      return res.status(400).send('user exist');
    }else{
    const newUser = await user.create({
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      gender: req.body.gender,
      phone: req.body.phone,
      address: req.body.address,
      login: new Date,
      status: 'user'
    });
    
    const token = jwt.sign({ id: user.id }, process.env.TOKEN_KEY);
    res.status(200).send({
      status: "success...",
      data: {
        user:{
          id:newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          gender: newUser.gender,
          phone: newUser.phone,
          address: newUser.address,
          status:newUser.status,
          login:newUser.login,
          token
        }
      },
    });
    console.log('p')
  }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  // our validation schema here
  const schema = Joi.object({
    email: Joi.string().email().min(5).required(),
    password: Joi.string().min(4).required(),
  });

  // do validation and get error object from schema.validate
  const { error } = schema.validate(req.body);
  // if error exist send validation error message
  if (error)
    return res.status(400).send({
      error: {
        data:req.body,
        message: error.details[0].message,
      },
    });
  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    await user.update({login: new Date}, {
      where: {
        id: userExist.id,
      },
    });
    // compare password between entered from client and from database
    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    // check if not valid then return response with status 400 (bad request)
    if (!isValid) {
      return res.status(400).send({
        status: "failed",
        message: "credential is invalid",
      });
    }
    // generate token
    const token = jwt.sign({ id: userExist.id }, process.env.TOKEN_KEY);
   
    res.status(200).send({
      status: "success...",
      data: {
        user:{
          id:userExist.id,
          email: userExist.email,
          fullName: userExist.fullName,
          gender: userExist.gender,
          phone: userExist.phone,
          address: userExist.address,
          status:userExist.status,
          token
        }
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
exports.checkAuth = async (req, res) => {
  try {
    const { id } = req.params;
    const dataUser = await user.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    
    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success...",
      data: {
        user: {
          id: dataUser.id,
          fullName: dataUser.fullName,
          email: dataUser.email,
          status: dataUser.status,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
