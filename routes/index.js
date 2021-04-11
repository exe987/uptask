const router = require('express').Router();
const proyectosController = require('../controllers/proyectosController');
const { body } = require('express-validator');

module.exports = () => {
    //RUTA HOME
    router.get('/', proyectosController.proyectosHome);
    //NUEVO PROYECTO
    router.get('/nuevo-proyecto', proyectosController.formularioProyecto);
    router.post(
        '/nuevo-proyecto',
        /*VALIDATOR: En este caso se fija si el 'nombre' del body viene vacio, no tiene espacios al 
    principio o final y si no tiene caracteres raros*/
        body('nombre').notEmpty().trim().escape(),
        proyectosController.nuevoProyecto
    );
    //LISTA PROYECTOS
    router.get('/proyectos/:url', proyectosController.proyectoPorUrl)
    //ACTUALIZAR
    router.get('/proyecto/editar/:id', proyectosController.formularioEditar)

    return router;
};
