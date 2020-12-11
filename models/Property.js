//popción 1
const mongoose = require ("mongoose")
//Schema = Schema
const{Schema} = mongoose;

//const {Schema,model} = require ("mongoose");

const propertySchema = new Schema(
    { // Características: Title, address, price, images, owner ...opcionales)
        _owner:{
            //Esto es para insertar un ID de un elemento de la base de datos
            type:Schema.Types.ObjectId,
            ref:"User",
            required:[true,"La propiedad debe tener un dueño"],
        },     
        title:{
            type:String,
            required:[true,"Debes agregar un título a tu propiedad"],
        },
        address:{
            type:String,
            required:[true,"Debes agregar una dirección"],
        },
        description:{
            type:String,
            minLength:[50,"La descripción es muy pequeña"],
        },
        images:{
            type:[String], // Url
            minLength:[1,"Debes agregar por lo menos una imagen"],
        },
        price:{
            type: Number,
            min:[1,"El precio de propiedad es muuy bajo"],
            required: [true,"Debes agregar un precio"],
        },
        capacity:{
            type: Number, 
            required : [true,"Agrega capacidad"]
        }
    },
    {timestamps:true}
);

//Exportar, hay dos formas:

//1.
module.exports = mongoose.model("Property", propertySchema)
//2. Con línea 6
//module.export=model("Property,propertySchema")