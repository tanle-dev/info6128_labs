import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

class AppDB{
    constructor(){
        this.db = null
        this.isAvailable = false
    }

    open(){
        return new Promise((resolve, reject) => {
            try {
                const firebaseConfig = {
                    apiKey: "AIzaSyB3KrcrdYwuKuXLB8BDN8NcUOHia3fUKKE",
                    authDomain: "musicapppwa-248a2.firebaseapp.com",
                    projectId: "musicapppwa-248a2",
                    storageBucket: "musicapppwa-248a2.appspot.com",
                    messagingSenderId: "463319072917",
                    appId: "1:463319072917:web:0be3f21d24fcaa55389b9c"
                };
                
                  // Initialize Firebase
                const app = initializeApp(firebaseConfig);
        
                const db = getFirestore(app)
                if(db){
                    this.db = db,
                    this.isAvailable = true,
                    resolve()
                }else{
                    reject("The data is not available")
                }
            } catch (error) {
                reject(error.message)
            }
        })
    
    }

    add(title, singer, likes){
        return new Promise((resolve, reject) => {
            if(!this.isAvailable){
                reject("Database not opened!")
            }

            const newSong = {
                title: title,
                singer: singer,
                likes: likes
            }

            const dbCollection = collection(this.db, "SongList")
            addDoc(dbCollection, newSong)
            .then(docRef => {
                resolve(docRef)
            })
            .catch(error => {
                reject(error.message)
            })
        })
    }

    getAll(){
        return new Promise((resolve, reject) => {
            if(!this.isAvailable){
                reject("Database not opened!")
            }

            const result = []

            const dbCollection = collection(this.db, "SongList")
            getDocs(dbCollection)
                .then(querySnapshot => {
                    querySnapshot.forEach( doc => {
                        const data = doc.data()
                        data.id = doc.id
                        result.push(data)
                    })
                    resolve(result)
                })
                .catch(error => {
                    reject(error.message)
                })
        })
    }

    update(song){
        return new Promise((resolve, reject) => {
            if(!this.isAvailable){
                reject("Database's not opened!")
            }

            const docRef = doc(this.db, "SongList", song.id)

            updateDoc(docRef, {
                likes: song.likes
            })
                .then(() => {
                    resolve()
                })
                .catch(error => {
                    reject(error.message)
                })
        })
    }

    delete(song){
        return new Promise((resolve, reject) => {
            if(!this.isAvailable){
                reject("Database's not opened")
            }

            const docRef = doc(this.db, "SongList", song.id)
            deleteDoc(docRef)
                .then(() => {
                    resolve()
                })
                .catch(error => {
                    reject(error.message)
                })
        })
    }
}

export default new AppDB()