'use strict';
import requestHandler from "./requestHandler";
export default function initEvents({
    loginModal
                                   }){

    const loginForm = loginModal.body;

    window.addEventListener('DOMContentLoaded', (e) => {
        if(requestHandler.isSetUsername()){
            loginModal.show();
        }
    })

    loginForm.addEventListener('submit', (e) => {
        requestHandler.setUsername();
    })
}