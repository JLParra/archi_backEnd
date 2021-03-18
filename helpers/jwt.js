const { response } = require("express");
const jwt = require("jsonwebtoken");
const { Model } = require("mongoose");

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.jwt_secret, { expiresIn: '8h' }, (err, token) => {
            if (err) {
                console.log(err);
                reject('No se puede generar el JWT')
            } else {
                resolve(token);
            }
        });
    });

}
module.exports = { generarJWT };