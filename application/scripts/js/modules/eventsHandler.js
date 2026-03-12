'use strict';
import requestHandler from "./requestHandler";
export default function initEvents({
    loginModal
                                   }){

    const loginForm = loginModal.body;

    window.addEventListener('DOMContentLoaded', (e) => {
        if(requestHandler.issetUsername()){
            loginModal.show();
        }
    })

    loginForm.addEventListener('submit', () => {
        requestHandler.setUsername();
    })
}