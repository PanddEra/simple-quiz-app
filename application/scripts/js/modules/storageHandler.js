// const generateGuestId = () =>
//     (typeof crypto !== 'undefined' && crypto.randomUUID)
//     ? crypto.randomUUID()
//     : `guest_${Math.random().toString(36).slice(2)}`;

const storageHandler = {
    getUsername: () => sessionStorage.getItem('username'),
    
    setUsername: (name) => sessionStorage.setItem('username', `${name.trim()}_${crypto.randomUUID().slice(0, 4)}`),

    setGuest: () => sessionStorage.setItem('username', `guest_${crypto.randomUUID().slice(0, 8)}`)
};

export default storageHandler;