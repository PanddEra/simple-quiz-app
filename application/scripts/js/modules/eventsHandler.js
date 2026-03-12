'use strict';
import storageHandler from "./storageHandler";

export default function initEvents({
    loginModal
                                   }){

    const loginForm = loginModal.body;

    window.addEventListener('DOMContentLoaded', (e) => {
        if(storageHandler.username && storageHandler.username.length === 0){
            loginModal.show();
        }
    })

    loginForm.addEventListener('submit', (e) => {
            storageHandler.username = e.target.value;
    })
}