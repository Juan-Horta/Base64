import {saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask} from './firebase.js'

const taskContainer = document.getElementById('task-container')
const taskForm = document.getElementById('task-form')

let editStatus = false
let id = ''
let base64String = ''

window.addEventListener('DOMContentLoaded', async () => {
	
	onGetTasks((querySnapshot) => {
		
		let html = ''

        	querySnapshot.forEach(doc => {
                	html += `
                        	<div>
                                	<h3>${doc.data().title}</h3>
                                	<p>${doc.data().description}</p>
                        		<button class ="btn-delete" data-id="${doc.id}">Eliminar</button>
					<button class ="btn-edit" data-id="${doc.id}">Editar</button>
				</div> 
                	`
        	})

        	taskContainer.innerHTML = html

		const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
		btnsDelete.forEach(btn => {
			btn.addEventListener('click', (event) => {
				deleteTask(event.target.dataset.id)
			})
		})

		const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
		btnsEdit.forEach((btn) => {
                        btn.addEventListener('click', async (event) => {
                                const doc = await getTask(event.target.dataset.id)
                        	
				taskForm['task-title'].value = doc.data().title
				taskForm['task-description'].value = doc.data().description
			
				editStatus = true
				id = event.target.dataset.id

				taskForm['btn-task-save'].innerText = 'Actualizar'
			})
                })
	
	})
})


const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })

async function uploadImage() {
    image = toBase64(taskForm['task-image'].files[0]).then(image64 => (image = image64))
}

taskForm.addEventListener('submit', (e) => {
	e.preventDefault()
	
	const title = taskForm['task-title']
	const description = taskForm['task-description']
	uploadImage()
	
	console.log(image)

	if(editStatus){
		updateTask(id, {title:title.value, description:description.value, image:image})
		editStatus = false
		taskForm['btn-task-save'].innerText = 'Guardar'
	} else {
		saveTask(title.value, description.value, image)
	}

	taskForm.reset()
})
