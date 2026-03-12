const storageHandler = {

    get username(){
        return sessionStorage.getItem("username");
    },

    set username(username) {
        if(username && username.trim().length > 0) {
            sessionStorage.setItem("username", username.trim());
        }else{
            sessionStorage.setItem("username", crypto.randomUUID());
        }
    }
}
export default storageHandler;