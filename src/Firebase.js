// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from 'firebase/analytics'
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCFXB1zZPNmcrLz-nSxph0H9-SHb7IkpNA',
  authDomain: 'contact-list-96e9e.firebaseapp.com',
  projectId: 'contact-list-96e9e',
  storageBucket: 'contact-list-96e9e.appspot.com',
  messagingSenderId: '704027683216',
  appId: '1:704027683216:web:4bee94c3d0afb25263eb15',
  measurementId: 'G-B1CHEF853M',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const db = getFirestore(app)

export { db, collection, getDocs, addDoc, deleteDoc, doc, updateDoc }
