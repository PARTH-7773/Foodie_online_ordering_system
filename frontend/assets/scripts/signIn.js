import { getUserState, setUserState } from "../state/user.state.js";





document.getElementById("submit-form").addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = {
        email: document.querySelector('.email').value,
        password: document.querySelector('.password').value
    };
    try {
        const response = await fetch('http://localhost:7773/api/auth/signIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const result = await response.json()
        // console.log("user data :", result)
        if (!result.success) {
            document.querySelector('#message').textContent = typeof result.message === "object" ? result.message[0].msg : result.message;
            return
        }


        if (result.success) {
            setUserState()
            console.log(getUserState())
            const user = {
                name: result.data.name,
                role: result.data.role,
                _id: result.data._id,
                state: getUserState(),
            }
            localStorage.setItem("foodieUser", JSON.stringify(user));
            window.location.href = 'http://localhost:5500/frontend/index.html';
        }
    } catch (error) {
        console.log(error)
    }

})



