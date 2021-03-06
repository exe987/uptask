const { Sequelize } = require('sequelize');
const db = require('../config/db');
const slug = require('slug');
const shortid= require('shortid')
//ESTE ES EL MODELO
const Proyectos = db.define(
    'proyectos',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombre: {
            type: Sequelize.STRING,
        },
        url: {
            type: Sequelize.STRING,
        },
    },
    {
        hooks: {
            //SE AGREGA UNA URL ANTES DE CREAR EL PROYECTO
            beforeCreate(proyecto) {
                const url = slug(proyecto.nombre).toLowerCase();
                proyecto.url = `${url}-${shortid.generate()}`;
            },
        },
    }
);

module.exports = Proyectos;
