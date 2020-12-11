const express = require('express');
const router  = express.Router();

//Importar cosas importantes
const bcrypt = require("bcrypt");
const User   = require("../models/User");
const jwt    = require("jsonwebtoken");
const {clearRes} = require ("../utils/auth");

/**POST signup*/
router.post('/signup',(req, res, next) => {
  //Trabajar todo el código aquí
  const{email,password,confirmPassword,name} =req.body;

  if (password !== confirmPassword) return res.status(403).json({msg:"La contraseña no coincide"})
  
  bcrypt.hash(password,10).then((hashedPassword)=>{
    const user = {email,password:hashedPassword,name};
    //Mandar a mongo
    User.create(user).then(()=>{
      res.status(200).json({msg:"Usuario creado con éxito"})
    }).catch((error)=>{
      res.status(400).json({msg:"Hubo un error",error})
    })
  })
});

//POST login
router.post('/login',(req, res, next) => {
  //Trabajar todo el código aquí
  const {email,password} = req.body;
  User.findOne({email})
  
  .then((user)=>{
    if(user === null) return res.status(404).json({msg:"No existe correo"})
    bcrypt.compare(password,user.password).then((match)=>{
      
      //Borrar password para usuario =>
      if(match){
        //const  withoutPass = user.toObject();
        //delete withoutPass.password
        const newUser = clearRes(user.toObject())
        //esto nos genera un token mezclando un valor (id) más la palabara secreta y tiene una duración de 1 día
        const  token =jwt.sign({id:user._id},process.env.SECRET,{
        expiresIn:"1d"
        })

        res.cookie("token",token,{
          expires:   new Date(Date.now + 86400000),
          secure:    false,
          httpOnly : true,
        }).json({user:newUser, code:200})
      }
      else{
        return res.status(401).json({msg:"Contraseña incorrecta"})
      }
    })
  }).catch((error)=>{
    res.status(400).json({msg:"Hubo un error"},error)
  })
});

router.post("/logout",(req,res)=>{
  res.clearCookie("token").json({msg:"Vuelve pronto"})
})

module.exports = router;
