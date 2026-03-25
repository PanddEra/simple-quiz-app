import createModal from "./modules/modalGenerator.js";
import initEvents from "./modules/eventsHandler.js";

const loginModal = createModal({
    id: 'loginModal',
    title: 'Want to log in?',
    body:
        `<form id="loginForm">
            <div class="mb-3">
                <input type="text" class="form-control" id="usernameInput" placeholder="username">
                <label for="usernameInput">Username</label>
            </div>
         </form>`,
    footer:
        `<div class="modal-footer d-flex justify-content-between">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Guest Mode</button>
            <button form="loginForm" type="submit" class="btn btn-success">Login</button>
        </div>`
});

const sendAnswersModal = createModal({
        title: 'Submit your answers?',
        id: 'sendAnswersModal',
        body: '',
        footer:
            `<button type="button" class="btn btn-primary" id="confirmSendAnswerModalBtn">Submit</button>
             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" id="cancelSendAnswerModalBtn">Cancel</button>`
});


initEvents({
    loginModal,
    sendAnswersModal,

})
