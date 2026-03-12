const requestHandler = {
    get username() {
        const username = fetch('.../php/get_username');
    },

    set username(name){

    },

    issetUsername: () => {
        return !!this.username;
    }
}
export default requestHandler;