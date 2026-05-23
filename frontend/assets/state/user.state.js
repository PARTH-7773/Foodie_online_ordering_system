let userState = false;
export const getUserState = () => { return userState }
export const setUserState = () => { userState ? userState = false : userState = true }