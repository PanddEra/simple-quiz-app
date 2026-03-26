const generateGuestId = () => 
    (typeof crypto !== 'undefined' && crypto.randomUUID) 
    ? crypto.randomUUID() 
    : `guest_${Math.random().toString(36).slice(2)}`;

export const storageHandler = {
    getUsername: () => sessionStorage.getItem('username'),
    
    setUsername: (name) => {
        if (name?.trim()) sessionStorage.setItem('username', name.trim());
    },

    setGuest: () => sessionStorage.setItem('username', generateGuestId())
};