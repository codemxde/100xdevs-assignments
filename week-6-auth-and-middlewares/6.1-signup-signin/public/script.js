let userInfo = null;

const body = document.body;
const root = document.getElementById("root");
const divContainer = document.createElement("div");

const description = document.createElement("h2");
const signUpContainer = document.createElement("div");
const signInContainer = document.createElement("div");

const signUpUsername = document.createElement("input");
const signUpPassword = document.createElement("input");
const signUpBtn = document.createElement("button");

const signInUsername = document.createElement("input");
const signInPassword = document.createElement("input");
const signInBtn = document.createElement("button");

const userContainer = document.createElement("div");
const logoutBtn = document.createElement("button");
const welcome = document.createElement("h1");

const welcomeText = document.createElement("p");
welcomeText.textContent =
  "Hey, we have something in common! We both seem to be tech junkies! We get all our dopamine from it, frankly.\n Our netcafe is the best when it comes to the latest news, trends and masala when it comes to tech!";

const addSignUpListener = () => {
  signUpBtn.addEventListener("click", () => {
    const username = signUpUsername.value;
    const password = signUpPassword.value;

    clearSignUpFields();

    fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Sign up Successful!");
        } else if (response.status === 409) {
          alert(
            `${username} is already signed up! you should sign in instead.`
          );
        }
      })
      .catch((err) => {
        alert("Server refused connection");
      });
  });
};

const clearSignUpFields = () => {
  signUpUsername.value = "";
  signUpPassword.value = "";
};

const addSigninListener = () => {
  signInBtn.addEventListener("click", () => {
    const username = signInUsername.value;
    const password = signInPassword.value;

    clearSignInFields();

    fetch("http://localhost:3000/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          const token = response.headers.get("Authentication");
          if (token) {
            localStorage.setItem("token", token);
            loadDOM();
          } else {
            alert("Server did not provide auth token!");
          }
        } else if (response.status === 404) {
          alert("user is not signed up yet");
        } else if (response.status === 403) {
          alert("password is incorrect!");
        }
      })
      .catch((err) => {
        alert("server connection aborted!");
      });
  });
};

const clearSignInFields = () => {
  signInUsername.value = "";
  signInPassword.value = "";
};

const createAuthComponent = () => {
  divContainer.className = "auth-container";
  description.className = "description-header";
  signUpContainer.className = "sign-up-container";
  signInContainer.className = "sign-up-container";

  description.textContent = "welcome to codemxde.com";

  signUpUsername.id = "sign-up-username";
  signUpUsername.type = "text";
  signUpUsername.placeholder = "username";
  signUpPassword.id = "sign-up-password";
  signUpPassword.type = "password";
  signUpPassword.placeholder = "password";
  signUpBtn.textContent = "Sign Up";
  signUpBtn.className = "sign-btn";
  addSignUpListener();

  signUpContainer.appendChild(signUpUsername);
  signUpContainer.appendChild(signUpPassword);
  signUpContainer.appendChild(signUpBtn);

  signInUsername.id = "sign-in-username";
  signInUsername.type = "text";
  signInUsername.placeholder = "username";
  signInPassword.id = "sign-in-password";
  signInPassword.type = "password";
  signInPassword.placeholder = "password";
  signInBtn.textContent = "Sign In";
  signInBtn.className = "sign-btn";
  addSigninListener();

  signInContainer.appendChild(signInUsername);
  signInContainer.appendChild(signInPassword);
  signInContainer.appendChild(signInBtn);

  divContainer.appendChild(description);
  divContainer.appendChild(signUpContainer);
  divContainer.appendChild(signInContainer);

  divContainer.classList.add("hide");

  root.appendChild(divContainer);
};

createAuthComponent();

const addLogoutListener = () => {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    // hide welcome container
    userContainer.style.display = "none";
    body.classList.remove("login-img");
    loadDOM();
  });
};

const createLogout = () => {
  logoutBtn.className = "logout-btn";
  logoutBtn.textContent = "Log Out";

  addLogoutListener();
};

createLogout();

const createWelcomeComponent = () => {
  welcome.classList.add("welcome-header");
  welcomeText.className = "welcome-text";
  createLogout();
  userContainer.appendChild(welcome);
  userContainer.appendChild(welcomeText);
  userContainer.appendChild(logoutBtn);
  userContainer.className = "user-container";
  userContainer.style.display = "none";

  root.appendChild(userContainer);
};

createWelcomeComponent();

function loadDOM() {
  // * check whether there is a jwt token present in the local storage
  const token = localStorage.getItem("token");
  if (token) {
    // * first verify token from BE
    fetch("http://localhost:3000/validate-token", {
      method: "POST",
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else if (response.status === 403) {
          localStorage.removeItem("token", token);
          alert("please sign in again");
          divContainer.classList.remove("hide");
          document.body.classList.add("render-img");
        }
      })
      .then((data) => {
        if (data) {
          console.log(data);
          userInfo = data;
          divContainer.classList.add("hide");
          body.classList.remove("render-img");
          body.classList.add("login-img");

          welcome.textContent = `Welcome ${userInfo.username}!`;
          userContainer.style.display = "flex";
        }
      })
      .catch((err) => {
        alert("Server refused connection");
      });
  } else {
    // * render the signin and sign up components
    document.body.classList.add("render-img");
    divContainer.classList.remove("hide");
  }
}
loadDOM();
