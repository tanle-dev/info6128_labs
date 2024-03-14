const message = document.getElementsByClassName('message__text')[0]
if('serviceWorker' in navigator){
    navigator.serviceWorker.addEventListener('message', event => {
        message.innerHTML = event.data
    })
}

const sendNotificationBtn = document.getElementById('sendNotifi__btn')
const formNotification = document.getElementById('notifi__section')
const showNotificationBtn = document.getElementById('show_notifi')
if('Notification' in window && 'serviceWorker' in navigator){
    switch(Notification.permission){
        case 'default':
            sendNotificationBtn.classList.remove('inactive')
            formNotification.classList.add('inactive')
            break
        case 'granted':
            sendNotificationBtn.classList.add('inactive')
            formNotification.classList.remove('inactive')
            break
        case 'denied':
            sendNotificationBtn.classList.remove('inactive')
            formNotification.classList.add('inactive')
            notificationNotAllowed()
            break
    }
}

sendNotificationBtn.addEventListener('click', () => {
    requestPermission()
})
showNotificationBtn.addEventListener('click', () => {
    validateForm('notifi__title')
    if(validateForm('notifi__title')){
        displayNotification()
    }

})

function requestPermission(){
    Notification.requestPermission()
    .then(permission => {
        if(permission === 'granted'){
            sendNotificationBtn.classList.add('inactive')
            formNotification.classList.remove('inactive')
        }else{
            notificationNotAllowed()
        }
    })
}

function displayNotification(){
    const options = {
        body: document.getElementById('notifi__desc').value,
        image: '../assets/imgs/dream.jpeg',
        actions: [
            {
                action: 'confirm',
                title: 'OK'
            },
            {
                action: 'cancel',
                title: 'Cancel'
            }
        ]
    }
    const title = document.getElementById('notifi__title').value

    navigator.serviceWorker.ready
     .then(registration => {
        registration.showNotification(title, options)
     })
}

function notificationNotAllowed(){
}

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

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js', { scope: '/' })
        .then( (registration)  => {
        })
        .catch( (err) =>  {});
}