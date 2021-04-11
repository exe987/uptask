const Proyectos = require('../models/Proyectos');

const ProyectoRepository = {
    crearProyecto(data) {
        Proyectos.create({
            nombre: data.nombre,
            url: data.url,
        });
    },

    getProyectos() {
        const proyectos = Proyectos.findAll();
        return proyectos;
    },

    getProyecto(url) {
        const proyecto = Proyectos.findOne({
            where: {
                url: url,
            },
        });
        return proyecto;
    },
    getProyectoById(id) {
        const proyecto = Proyectos.findOne({
            where: {
                id: id,
            },
        });
        return proyecto;
    },
};

module.exports = ProyectoRepository;
