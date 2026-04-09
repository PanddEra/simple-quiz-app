const storageHandler = {
    getUsername: () => sessionStorage.getItem('username'),
    
    setUsername: (name) => sessionStorage.setItem('username', `${name.trim()}_${crypto.randomUUID().slice(0, 4)}`),

    setGuest: () => sessionStorage.setItem('username', `guest_${crypto.randomUUID().slice(0, 8)}`)
};

export default storageHandler;