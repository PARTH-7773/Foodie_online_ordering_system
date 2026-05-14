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
      message.textContent = "Password are not Match.";
      setTimeout(() => {
        message.textContent = null;
      }, 5000);
      return;
    }

    const respose = await fetch("http://localhost:3000/api/auth/signUp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials:"include",
      body: JSON.stringify(data),
    });
    const result = await respose.json();
    // console.log(result);

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
    }
  });
