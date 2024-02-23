// Author: Tan Le
// Last modified: 2024/02/02

import AppDb from "./app-db/app-db.js";


AppDb.open()
    .then(() => {
        console.log("Success")
    })
    .catch(error => {
        console.log("Fail to open: ", error)
    })
/**
 * 
 * @param elementId - id of element to validate
 * @returns  true if the value of element is not empty, false otherwise
 */
function validateForm(elementId){
    let element = document.getElementById(elementId);
    if(element.value == ""){
        element.nextElementSibling.style.display = "block";
        return false
    }
    else{
        element.nextElementSibling.style.display = "none";
    }
    return true
}

/**
 *  Add new song to the list
 * @returns  none
 */

let songName = document.getElementById("song__title");
let artistName = document.getElementById("song__artist");

function addSongToList() {
    let songList = document.getElementsByClassName("song__list")[0];
    let songItem = document.getElementsByClassName("song__item")[0].cloneNode(true);
    songItem.removeAttribute("hidden");
    songList.appendChild(songItem);
    songItem.getElementsByClassName("song__name")[0].innerHTML = songName.value;
    
    songItem.getElementsByClassName("singer")[0].innerHTML = artistName.value;
    
    songItem.getElementsByClassName("remove__btn")[0].addEventListener("click", () => {
        songList.removeChild(songItem)
    })
    songItem.getElementsByClassName("like__btn")[0].addEventListener("click", () => {
    })

    AppDb.add(songName.value, artistName.value, 0)
            .then(() => {
                console.log("Add to database successfully")
            })
            .catch(error => {
                console.log("Fail to add ", error.message)
            })
}

/**
 * Add new song to the list when click submit button
 */
document.getElementById("submit__btn").addEventListener("click", () => {
    validateForm("song__title");
    validateForm("song__artist");
    if(validateForm("song__title") && validateForm("song__artist"))
    {
        addSongToList()
        songName.value = "";
        artistName.value = "";
    }
});

function renderSongListFromDatabase(result){

}

/**
 * Register service worker
 * 
 */
if ('serviceWorker' in navigator) {
    console.log('Service Worker is supported');
    navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then( (registration)  => {
            console;log('Service Worker is registered', registration);
        })
        .catch( (err) =>  {});
}
