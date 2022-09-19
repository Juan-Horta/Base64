// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import { 
	getFirestore, 
	collection, 
	addDoc,
	getDocs,
	onSnapshot,
	deleteDoc,
	doc,
	getDoc,
	updateDoc
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLTWutK6X3QqKVLfg08rmf9yPTC1Hg_PA",
  authDomain: "fir-crud-test-34b76.firebaseapp.com",
  projectId: "fir-crud-test-34b76",
  storageBucket: "fir-crud-test-34b76.appspot.com",
  messagingSenderId: "117441509839",
  appId: "1:117441509839:web:6fdf3b7858a2d6c3587aba"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore()

export const saveTask = (title, description, image) => {
  addDoc(collection(db, 'tasks'), {title, description, image});
}

export const getTasks = () => getDocs(collection(db, 'tasks'))

export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

export const deleteTask = (id) => deleteDoc(doc(db, 'tasks', id))

export const getTask = (id) => getDoc(doc(db, 'tasks', id))

export const updateTask = (id, newData) => updateDoc(doc(db, 'tasks', id), newData)
