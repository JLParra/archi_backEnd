const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        mongoose.connection.openUri(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD; ver logs');
    }

    console.log('DB online');

}

module.exports = { dbConnection }