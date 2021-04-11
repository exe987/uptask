const Proyectos = require('../models/Proyectos');
const ProyectoRepository = require('../repositories/proyectosRepositories');

exports.proyectosHome = async (req, res) => {
    const proyectos = await ProyectoRepository.getProyectos();
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos,
    });
};

exports.formularioProyecto = async (req, res) => {
    //NOS TRAEMOS LOS PROYECTOS PARA PASARSELOS AL COMPONENTE
    const proyectos = await ProyectoRepository.getProyectos();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos,
    });
};

exports.nuevoProyecto = async (req, res) => {
    //VALIDACION
    const { nombre } = await req.body;
    let errores = [];
    if (!nombre) {
        errores.push({ texto: 'Agrega un nombre al proyecto!!' });
    }
    //NOS TRAEMOS LOS PROYECTOS PARA PASARSELOS AL COMPONENTE
    const proyectos = await ProyectoRepository.getProyectos();
    if (errores.length > 0) {
        res.render('nuevoProyecto', {
            nombrePagina: 'Nuevo Proyecto',
            errores,
            proyectos,
        });
    } else {
        //GUARDAR EN DB USANDO REPO
        let proyecto = {};
        proyecto.nombre = nombre;
        const response = await ProyectoRepository.crearProyecto(proyecto);
        res.redirect('/');
    }
};

exports.proyectoPorUrl = async (req, res, next) => {
    const url = await req.params.url;
    const proyecto = await ProyectoRepository.getProyecto(url);
    if (!proyecto) next();
    //NOS TRAEMOS LOS PROYECTOS PARA PASARSELOS AL COMPONENTE
    const proyectos = await ProyectoRepository.getProyectos();
    //SI LA HAY MOSTRAR EL COMPONENTE DE TAREAS
    res.render('tareas', {
        nombrePagina: 'Tareas del proyecto',
        proyecto,
        proyectos,
    });
};

exports.formularioEditar = async (req, res, next) => {
    //EXTRAEMOS ID
    const { id } = await req.params.id;
    //NOS TRAEMOS LOS PROYECTOS PARA PASARSELOS AL COMPONENTE
    const proyectos = await ProyectoRepository.getProyectos();
    const proyecto = await ProyectoRepository.getProyectoById(id);
    //RENDERIZAMOS EL COMPONENTE DE NUEVO PROYECTO PERO UTILIZANDO ESE FORM, ESTA VEZ, PARA EDITAR
    //HACIENDO MAS REUTILIZABLE
    res.render('nuevoProyecto', {
        nombrePagina: 'Editar Proyecto',
        proyectos,
        proyecto,
    });
};
