// const generateGuestId = () =>
//     (typeof crypto !== 'undefined' && crypto.randomUUID)
//     ? crypto.randomUUID()
//     : `guest_${Math.random().toString(36).slice(2)}`;
const storageHandler = {
    getUsername: () => sessionStorage.getItem('username'),
    
    setUsername: (name) => sessionStorage.setItem('username', name.trim()),

    setGuest: () => sessionStorage.setItem('username', crypto.randomUUID())
};

export default storageHandler;