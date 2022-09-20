import {saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask} from './firebase.js'

const taskContainer = document.getElementById('task-container')
const taskForm = document.getElementById('task-form')

let editStatus = false
let id = ''
let base64String = ''
let image = ''

window.addEventListener('DOMContentLoaded', async () => {
	
	onGetTasks((querySnapshot) => {
		
		let html = ''

        	querySnapshot.forEach(doc => {

					/*const decrypted = CryptoJS.AES.decrypt(doc.data().image, "zIV#Khn@U2P$)eWG").toString(CryptoJS.enc.Utf8)

					console.log(doc.data().title)
					console.log(doc.data().description)
					console.log(doc.data().image)
					console.log("------------------------------------------------")
					console.log(decrypted)*/

					const imgSrc = "data:image/jpeg;base64,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"

                	html += `
                        	<div>
                                	<h3>${doc.data().title}</h3>
                                	<p>${doc.data().description}</p>
                                	<img id="showImg" src="${imgSrc}" alt="no img"/>
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

taskForm.addEventListener('submit', async (e) => {
	e.preventDefault()
	
	const title = taskForm['task-title']
	const description = taskForm['task-description']
	const image = await uploadImage()
	
	let encrypted = CryptoJS.AES.encrypt(image, "zIV#Khn@U2P$)eWG").toString();

	if(editStatus){
		updateTask(id, {title:title.value, description:description.value, image:encrypted})
		editStatus = false
		taskForm['btn-task-save'].innerText = 'Guardar'
	} else {
		saveTask(title.value, description.value, encrypted)
	}

	taskForm.reset()
})

async function uploadImage() {
    return await toBase64(taskForm['task-image'].files[0])
}

const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
