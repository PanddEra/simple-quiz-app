'use strict';
import createModal from "./modules/modalGenerator.js";
import init from "./modules/eventsHandler.js";

const loginModal = createModal({
    id: 'loginModal',
    title: 'Want to log in?',
    body: `
        <form id="loginForm">
            <div class="mb-3">
                <input type="text" class="form-control" id="usernameInput" placeholder="username">
                <label for="usernameInput">Username</label>
            </div>
        </form>`,
    footer: `
        <button type="button" class="btn btn-danger" data-guest-mode-btn>Guest Mode</button>
        <button form="loginForm" type="submit" class="btn btn-success">Login</button>`
});

init({ loginModal });