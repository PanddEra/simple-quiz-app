const storageHandler = {

    set username(username) {
        const existing = sessionStorage.getItem("username");

        // 🔥 DO NOT overwrite if already exists
        if (existing) return;

        const value = username?.trim();

        if (value) {
            sessionStorage.setItem("username", value);
        } else {
            const guestId = this.generateGuestId();
            sessionStorage.setItem("username", guestId);
        }
    },

    generateGuestId() {
    if (typeof crypto !== "undefined" && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return "guest_" + Math.random().toString(36).slice(2);
}
}
export default storageHandler;
