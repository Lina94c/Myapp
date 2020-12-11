const express = require('express');
const router = express.Router();
//Importar cosas importantes!!
const Reservation = require ("../models/Reservation");
const {veryToken} = require ("../utils/auth");

/* C.R.U.T =>  C= Create R= Read U=update D= Delete
-Obtener todas las propiedades
-Crear la propiedad
-eliminar || ||*/


//READ para leer!!
//Todas las reservaciones de usuario
router.get('/', veryToken,(req, res, next) => {
   const {_id} = req.user
   Reservation.find({_guest : _id})
   .populate({ // <---- agegar todo este para hacer un populate aninado
    path:"property",
    populate:{
        path:"_owner",
        select: "name",
    },
}) 
   .then((reservations)=>{
       res.status(200).json({result:reservations})
   })
   .catch((error)=>{
       res.status(400).json({msj:"Algo salió mal",error})
   })
});

//Trae las reservaciones por propiedad
router.get('/property/:property_id', veryToken,(req, res, next) => {
    const { property_id } = req.params;
    Reservation.find({ _property : property_id })
    .populate("_guest","name") //<----- Populate
    .then((reservations)=>{
        res.status(200).json({result:reservations})
    })
    .catch((error)=>{
        res.status(400).json({msj:"Algo salió mal",error})
    })
 });

//Crear reservación
router.post("/", veryToken,(req,res,next)=>{
    const { _id : _guest} = req.user
    const reservation ={...res.body, _guest};

    Reservation.create(reservation)
    .then((reservation)=>{
        res.status(200).json({result:reservation})
    })
    .catch((error)=>{
        res.status(400).json({msg:"Algo salió mal",error})
    })
});

//Editar
router.patch('/:id', veryToken,(req,res,next)=>{
    const{ id } = req.params;
    //req.body es igual a un objeto
    Reservation.findByIdAndUpdate(id,req.body,{new:true})
    .then((reservation)=>{
        res.status(200).json({result:reservation})
    })
    .catch((error)=>{
        res.status(400).json({msg:"Algo salió mal",error})
    })
 });

 //Eliminar
 router.delete('/:id', veryToken,(req,res,next)=>{
    const{ id } = req.params;
    //req.body es igual a un objeto
    Reservation.findOneAndDelete(id)
    .then((reservation)=>{
        res.status(200).json({msg:"Se borro reservación"})
    })
    .catch((error)=>{
        res.status(400).json({msg:"Algo salió mal",error})
    })
 });

module.exports = router;