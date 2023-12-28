import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import taskController from './controllers/taskController.js';
import errorController from './controllers/errorController.js';
import { fileURLToPath } from "url";

//* Guardando path del directorio actual 
const __dirname = fileURLToPath(new URL(".",import.meta.url));
// console.log(__dirname);

const app = express();
const port = 3000;

//? Middlewares 
//* Permite dar permisos a los clientes para que puedan acceder a los recursos del servidor
app.use(cors()); 
//* Permite proteger el servidor de ciertos ataques 
app.use(helmet());
//* Permite mostrar en consola las peticiones que se hacen al servidor 
app.use(morgan('dev'));

//* Permite establecer la ruta en donde estan las vistas de la app  
app.set('views', path.join(__dirname, 'views'));
//* Permite que el servidor pueda renderizar archivos pug (Templates PUG) 
app.set('view engine', 'pug');

//* Permite que la /public sea accesible desde el navegador para que se pueda acceder a los archivos de esta 
app.use(express.static(path.join(__dirname, 'public')));
//* Permite que el servidor pueda recibir datos en formato json 
app.use(express.json());
//* Codifica los datos que se envian desde el cliente para que puedan ser leidos por el servidor
app.use(express.urlencoded({ extended: false }));


//? Rutas de mi app
app.get('/', taskController.getAllTasks);
app.get('/add', taskController.getAddTaskForm);
app.post('/add', taskController.addTask);
app.get('/edit/:id', taskController.getEditTaskForm);
app.post('/edit/:id', taskController.editTask);
app.get('/complete/:id', taskController.completeTask);
app.get('/uncomplete/:id', taskController.uncompleteTask);
app.get('/delete/:id', taskController.deleteTask); 

//? Ruta para manejar errores 404 
app.use(errorController.error404);

//? Inicializando el servidor 
app.listen(port, () => {
  console.log(`La aplicación está funcionando en http://localhost:${port}`);
});