const {Schema,model} = require ("mongoose");

const reservationSchema = new Schema(
    {//Aquí van los atributos
        _property:{
            type: Schema.Types.ObjectId,
            ref:"Property",
            required:true,
        },
        _guest:{
            type: Schema.Types.ObjectId,
            ref:"User",
            required:true,
        },
        checkin:{
            type:Date,
            required:[true,"Ingresa una fecha de inicio"],
        },
        checkout:{
            type:Date,
            required:[true,"Ingresa una fecha de salida"],
        },
        guest_number:{
            type:Number,
            min:[1,"El mínimo de personas por reservación es una"],
        },
    },
    {timestamps:true}
);

module.exports = model("Reservation", reservationSchema);