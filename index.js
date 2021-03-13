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


//RUTAS
app.get('/', (req, resp) => {
    resp.status(400).json({
        ok: true,
        msg: "Hola mundo",
    });
});




app.listen(process.env.PORT, () => {
    console.log("El servidor esta corriendo en el puerto: " + process.env.PORT);
});

