const { Schema, model } = require('mongoose');

const EstadoSchema = Schema({
    id: {
        type: Number,
        required: true
    },
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    descripcion: {
        type: String,
        required: true,
        unique: true
    },
    descripcion2: {
        type: String,
    },

});

EstadoSchema.method('toJson', function () {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Estado', EstadoSchema);