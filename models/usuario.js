const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    id: {
        type: Number,
        require: true
    },
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    estado: {
        type: String,
        require: true,
        default: "1"
    }
});

UsuarioSchema.method('toJson', function() {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});
module.exports = model('Usuario', UsuarioSchema);