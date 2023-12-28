let tasks = [
  { id: 1, title: "Task 1", completed: false },
  { id: 2, title: "Task 2", completed: true },
  { id: 3, title: "Task 3", completed: false },
  { id: 4, title: "Task 4", completed: true },
  { id: 5, title: "Task 5", completed: false }
];

//* Muestra todas las tareas 
const getAllTasks = (req, res) => {
  
  res.render("index", { title:  "Lista de Tareas", tasks,});
};

//* Muestra el formulario para agregar una tarea 
const getAddTaskForm = (req, res) => {
  res.render("add", { title: "Agregar Tarea" })
};

//* Agrega una tarea(POST) 
const addTask = (req, res) => {
  const { title } = req.body;

  let id = tasks.length + 1;

  tasks.push({ id, title, completed: false });

  res.redirect("/");
};


//* Muestra el formulario para editar una tarea 
const getEditTaskForm = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find(task => task.id === id);

  if (!task) {
    res.redirect("/");
  } else {
    res.render("edit", { title: "Editar Tarea", task });
  }
};

//* Edita una tarea(PUT) 
const editTask = (req, res) => {
  let id = parseInt(req.params.id);
  let taskIndex = tasks.findIndex((task) => task.id === id);
  console.log({id,taskIndex});

  if (taskIndex === -1) {
    res.redirect("/");
  } else {
    tasks[taskIndex].title = req.body.title;
    res.redirect("/");
  }


};

//* Marca una tarea como completada(PUT) 
const completeTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = true;
  }

  res.redirect("/");
};

//* Marca una tarea como no completada(PUT) 
const uncompleteTask = (req, res) => {
  let id = parseInt(req.params.id);
  let task = tasks.find((task) => task.id === id);

  if (task) {
    task.completed = false;
  }

  res.redirect("/");
};


//* Elimina una tarea(DELETE) 
const deleteTask = (req, res) => {
  let id = parseInt(req.params.id);
  tasks = tasks.filter((task) => task.id !== id);
  res.redirect("/");
};


export default {
  getAllTasks,
  getAddTaskForm,
  addTask,
  getEditTaskForm,
  editTask,
  completeTask,
  uncompleteTask,
  deleteTask
};

