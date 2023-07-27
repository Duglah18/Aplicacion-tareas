import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import './style.css'

const taskform = document.querySelector<HTMLFormElement>('#taskForm')

const Lista = document.querySelector<HTMLDivElement>('#tasksList')

let numId:number = 0

interface Task {
    title: string
    description: string
    id: number
}

let tasks: Task[] = []

taskform?.addEventListener('submit', e => {
    e.preventDefault();

    const title = taskform['title'] as unknown as HTMLInputElement
    const text = taskform['description'] as unknown as HTMLTextAreaElement

    const noValidoTitle = title.value.trim()
    const noValidoText = text.value.trim()

    if (noValidoTitle == "" || noValidoText == ""){
        Toastify({
            text: "El titulo y la descripcion no pueden estar vacios",
            style: {
                background: "red",
            },
            close: true,
            position: 'center'
        }).showToast()
        return null
    } 

    tasks.push({
        title: title.value,
        description: text.value,
        id: newId()
    })

    localStorage.setItem('tasks', JSON.stringify(tasks))

    Toastify({
        text: "Tarea Guardada"
    }).showToast()

    renderTasks(tasks)

    taskform.reset()
    title.focus()
})

document.addEventListener("DOMContentLoaded", () => {
    tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    renderTasks(tasks)
})

function renderTasks(tasks:Task[]) {
    Lista!.innerHTML = '' //Obligatoriamente existe

    tasks.forEach(task => {
        const taskElement = document.createElement('div')
        taskElement.className = "elemento"
        
        const header = document.createElement('header')
        header.className = "elemento-header"

        const title = document.createElement('span')
        title.innerText = task.title

        const btnDelete = document.createElement('button')
        btnDelete.className = "btnDelete"
        btnDelete.innerText = "Delete"
        btnDelete.addEventListener('click', () => {
            const index = tasks.findIndex(t => t.id === task.id)
            tasks.splice(index,1)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            renderTasks(tasks)
        })

        header.append(title)
        header.append(btnDelete)

        const description  = document.createElement('p')
        description.innerText = task.description
        
        taskElement.append(header)
        
        taskElement.append(description)
        
        Lista?.append(taskElement)
    })
}

function newId():number {
    if (tasks.length > 1) {
        numId = +tasks[tasks.length-1].id
    }

    numId = numId + 1

    return numId
}
