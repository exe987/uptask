const { Sequelize } = require('sequelize');
/*ACA SEQUELIZE CONECTA LA DB, CREAMOS LA DB PONIENDOLE NOMBRE UPTASK EN ESTE CASO Y LOS DEMAS SON
PARAMETROS DE CONEXION SOLO PODEMOS LLEGAR A TOCAR DIALECT, YA QUE PUEDE CAMBIAR EL GESTOR EN ESTE CASO
USAMOS MYSQL, EL NUMERO DE PUERTO TAMBIEN PUEDE LLEGAR A CAMBIAR*/
/*ANTES DE HACER LA CONEXION CREAR UNA DB EN SQL, CON EL MISMO NOMBRE QUE LE COLOCAMOS EN EL SIG 
PARAMETRO 'UPTASKNODE'*/
const db = new Sequelize('uptasknode', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    port: '3306',
    operatorsAliases: 0,//0 es false, si le ponemos false da error
    define: {
        timestamps: false,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = db;
