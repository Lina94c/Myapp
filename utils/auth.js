//Esto nos ayudará a verificar si existe el usuario
const jwt = require("jsonwebtoken");
const User = require ("../models/User");

exports.veryToken = (req,res,next) =>{
    const {token} = req.cookies;
    // Se usa verify para saber si existe un token
    jwt.verify(token,process.env.SECRET,(error,decoded)=>{
        //Código
        if(error) return res.status(401).json({error});
        //Esto busca  en la llave id
        // decoded ={id}
        User.findById(decoded.id).then((user)=>{
            //Guardar usuario en req.user para poder usarlo en cualquier lugar
            req.user = user;
            // con el next se indica que se puede continuar
            next()
        });
    });
};

//Haremos un middleware para checar roles y un utils para limpiar respuest de datos basura
  exports.checkRol =(roles) =>{
      return (req,res,next)=>{
        const {role}=req.user;
        if(roles.includes(role)){
            return next()
        }
        else{
            return res.status(403).json({msg:"No tienes permiso para realizar esta acción"})
        }
      }
  }

  //Limpiar el objeto
  exports.clearRes =(data)=>{
      //destructuramos el objeto "data" y retornamos un nuevo objeto únicamente con datos requiridos para dev="desarrollador"
      const {password,__v,createdAt,updateAd, ...cleanedData}= data
      return cleanedData
  }