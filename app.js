//accediendo al formulario y task-container
const taskForm = document.querySelector('form')
const taskContainer = document.querySelector('.task-container')
//agregando las tareas existentes en localstorage
loadTasks()
//accediendo al boton para cambiar entre modo light y modo oscuro
const modeButton = document.querySelector('.change-mode')
const buttonImg = modeButton.firstElementChild
//agregar tareas
taskForm.addEventListener('submit', event => {
    event.preventDefault()
    const taskInput = document.getElementById('task-input')
    const task = taskInput.value
    if (task) {
    taskContainer.append(createTaskElement(task))
    storeTaskInLocalStorage(task)
    taskInput.value = ''
    }
})
//crear article que contiene las tareas
function createTaskElement (task) {
  const taskCard = document.createElement('article')
  taskCard.classList.add('task-container__card')
  const taskContent = document.createElement('p')
  taskContent.textContent = task
  const div = document.createElement('div')
  const editButton = document.createElement('button')
  editButton.classList.add('edit')
  const editButtonImg = document.createElement('img')
  editButtonImg.src = './assets/pencil-solid-icon.svg'
  editButtonImg.alt = 'Boton para editar tarea'
  const deleteButton = document.createElement('button')
  deleteButton.classList.add('delete')
  const deleteButtonImg = document.createElement('img')
  deleteButtonImg.src = './assets/delete-icon.svg'
  deleteButtonImg.alt = 'Boton para eliminar tarea'
  deleteButton.append(deleteButtonImg)
  editButton.append(editButtonImg)
  div.append(editButton, deleteButton)
  taskCard.append(taskContent, div)
  return taskCard
}
//botones de editar y eliminar tarea funcionales
taskContainer.addEventListener('click', event => {
    if(event.target.closest('.delete')) {
        deleteTask(event.target.closest('.task-container__card'))
    }
    else if (event.target.closest('.edit')) {
        editTask(event.target.closest('.task-container__card'))
    }
})
//funcion para eliminar elementos
const deleteTask = taskItem => {
    if(confirm('¿Estás segur@ de borrar esta tarea?')) {
        taskItem.remove()
    }
}
//funcion para editar elementos
function editTask (taskItem) {
    const newTask = prompt('Edita la tarea', taskItem.firstElementChild.textContent)
    if(newTask !== null) {
        taskItem.firstElementChild.textContent = newTask
        updateLocalStorage()
    }
}

//usando localstorage para persistencia
function storeTaskInLocalStorage (task)  {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks.push(task)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}
//Insertar elementos guardados en localstorage en el DOM
function loadTasks () {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks.forEach(task => {
        taskContainer.append(createTaskElement(task))
    });
}

function updateLocalStorage () {
    const tasks = [...taskContainer.querySelectorAll('article')].map(article => article.firstElementChild.textContent)
    localStorage.setItem('tasks', JSON.stringify(tasks))
}


//cambiar imagen del boton
modeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark')
    const isSun = buttonImg.src.includes('sun-icon.svg')
    if(isSun){
        buttonImg.src = './assets/moon-icon.svg'
    }
    else {
        buttonImg.src = './assets/sun-icon.svg'
    }
})