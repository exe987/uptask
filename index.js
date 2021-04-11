const express = require('express');
const path = require('path');
const port = 4000;
const routes = require('./routes/index');
const app = express();
//HELPERS
const helpers = require('./helpers');

//---------------------------CONEXION A DB CON SEQUELIZE------------------------//
const db = require('./config/db');
//TRAEMOS LOS MODELOS
require('./models/Proyectos');

db.sync()
    .then(() => console.log('Conexión exitosa'))
    .catch((error) => console.log(error));
//-----------------------------------------------------------------------------//

//PERMITIR QUE CARGUEN LOS ARCHIVOS ESTATICOS(CSS O JS VAINILLA)
app.use(express.static('./public')); //public es el nombre de la carpeta donde se alojan los archivos

//HABILITAR PUG
app.set('view engine', 'pug');

//HABILITAR VISTAS DE CARPETA VISTAS
app.set('views', path.join(__dirname, './views'));

/*VARDUMP para que se haga disponible en todo el proyecto. eso lo hace el .locals.
USANDO .locals podemos hacer disponibles en todo el proyecto todo tipo de dato como funciones
variables, clases, etc*/
app.use((req, res, next) => {
    res.locals.vardump = helpers.vardump;
    next();
});

//HABILITAR PARSEO PARA QUE RECONOZCA DATOS DE FORMULARIOS
app.use(express.urlencoded({ extended: true }));

app.use('/', routes());
//PORT
app.listen(port, () => console.log(`Server on port ${port}`));
