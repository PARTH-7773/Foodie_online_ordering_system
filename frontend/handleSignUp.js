const message = document.querySelector("#message");
const formWrapper = document.querySelector(".form-wrapper");

const submitSignUp = document
  .getElementById("submitSignUp")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: document.querySelector("#name").value,
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value,
      conformPassword: document.querySelector("#confirm_password").value,

    };
    if (data.password !== data.conformPassword) {
       showErrorMsg("Password are not Match.")
    }

    function showErrorMsg(msg){
      message.textContent = msg;
      setTimeout(() => {
        message.textContent = null; 
      }, 5000);
      return;
    }

    const respose = await fetch("https://foodiecom.vercel.app/api/auth/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },    
      body:JSON.stringify(data)
    });
    const result = await respose.json();

    if (result.success) {
      formWrapper.innerHTML = null;
      let div = document.createElement("div");
      div.style = "text-align: center;";

      div.innerHTML = `
        <h2>Account Created! ✅</h2>
        <p>${result.message}</p>
        <br>
        <a href="signin.html" class="btn">Go to Sign In</a>
        `;

      formWrapper.appendChild(div);
    }else{
      console.log(result.message);
      showErrorMsg( typeof result.message === "object" ? result.message[0].msg : result.message)
    }
  });
