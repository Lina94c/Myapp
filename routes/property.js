const express = require('express');
const router = express.Router();
//Importar cosas importantes!!
const Property = require ("../models/Property");
const {veryToken} = require ("../utils/auth");

/* GET property page. 
C.R.U.T =>  C= Create R= Read U=update D= Delete
-Obtener todas las propiedades
-Crear la propiedad
-eliminar || ||*/

//1.CREATE la propiedad
router.post("/",veryToken,(req,res,next)=>{
    //Llamar id de persona loggeada para crear una propiedad (CASA)
    const { _id : _owner } = req.user
    
    Property.create({...req.body,_owner}).then((property) =>{
      res.status(201).json({result:property})
    }).catch((error) => {
      res.status(400).json({msg:"Algo salió mal",error});
    });
});

//READ para leer!! , filtro dinámico
router.get('/', veryToken,(req, res, next) => {
    //req.query ={key:"value"}
   Property.find(req.query)
   .populate("_owner","email name profile_picture") //<----populate
   .then((properties)=>{
       res.status(200).json({result:properties})
   })
   .catch((error)=>{
       res.status(400).json({msj:"Algo salió mal",error})
   })
});

// Traer uno solo! por id
router.get('/:id', veryToken,(req, res, next) => {
    // :id ="28742358792357"
    //req.params= {id:"284723472937978"}
   const {id} = req.params;
   Property.findById(id)
   .populate("_owner","email name profile_picture")
   .then((property)=>{
       res.status(200).json({result:property})
   })
   .catch((error)=>{
       res.status(400).json({msj:"Algo salió mal",error})
   })
});

//UPDATE (Editar), con métodos post, patch
router.patch('/:id', veryToken,(req,res,next)=>{
   const{ id } = req.params;
   //req.body es igual a un objeto
   Property.findByIdAndUpdate(id,req.body,{new:true})
   .then((property)=>{
       res.status(200).json({result:property})
   })
   .catch((error)=>{
       res.status(400).json({msg:"Algo salió mal",error})
   })
});

//DELETE eliminar
router.delete('/:id', veryToken,(req,res,next)=>{
    const{ id } = req.params;
    //req.body es igual a un objeto
    Property.findByIdAndDelete(id)
    .then((property)=>{
        res.status(200).json({msg:"Se borró"})
    })
    .catch((error)=>{
        res.status(400).json({msg:"Algo salió mal",error})
    })
 });

module.exports = router;