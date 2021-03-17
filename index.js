const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


//CREAR EL SERVIDOR DE EXPRESS
const app = express();

//CONFIGURAR CORS
app.use(cors());

//BASE DE DATOS
dbConnection();

//mean_user
//jefferjlmk

//LECTURA Y PARSEO DEL BODY
app.use(express.json());

//RUTAS
app.use('/api/estados', require('./routes/estados'));
app.use('/api/usuarios', require('./routes/usuarios'));




app.listen(process.env.PORT, () => {
    console.log("El servidor esta corriendo en el puerto: " + process.env.PORT);
});