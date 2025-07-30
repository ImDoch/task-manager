//accediendo al formulario y task-container
const taskForm = document.querySelector('form')
const taskContainer = document.querySelector('.task-container')
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
    taskInput.value = ''
    }
})
//crear article que contiene las tareas
const createTaskElement = (task) => {
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
const editTask = taskItem => {
    const newTask = prompt('Edita la tarea', taskItem.firstElementChild.textContent)
    if(newTask !== null) {
        taskItem.firstElementChild.textContent = newTask
    }
}

//cambiar imagen del boton
modeButton.addEventListener('click', () => {
    const isSun = buttonImg.src.includes('sun-icon.svg')
    if(isSun){
        buttonImg.src = './assets/moon-icon.svg'
    }
    else {
        buttonImg.src = './assets/sun-icon.svg'
    }
})