const btnLogin = document.querySelector(".btn-login");
const loginUser = document.querySelector(".login-user");
const loginPassword = document.querySelector(".login-password");
const openPopup = document.querySelector(".btn-open-popup");
const closePopup = document.querySelector(".close-popup");
const popup = document.querySelector(".login-popup-container");
const overlay = document.querySelector(".overlay");
const labelText = document.querySelector(".label-text");
let currentAccount;

const user = [
  {
    name: "Bella",
    password: "qwe123",
  },
];

const addClass = function () {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
};

openPopup.addEventListener("click", function () {
  popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closePopup.addEventListener("click", addClass);

const loggedIn = function (currentAccount) {
  labelText.textContent = `Välkommen tillbaka ${currentAccount.name}, du är nu inloggad!`;
  loginUser.classList.add("hidden");
  loginPassword.classList.add("hidden");
  btnLogin.classList.add("hidden");
  openPopup.textContent = "LOGGA UT";
  openPopup.addEventListener("click", function () {
    addClass();
    location.reload();
    localStorage.clear();
  });
};

const login = function (e) {
  e.preventDefault();
  currentAccount = user.find((acc) => acc.name === loginUser.value);
  if (currentAccount?.password === loginPassword.value) {
    loggedIn(currentAccount);
    localStorage.setItem("password", currentAccount.password);
    localStorage.setItem("name", currentAccount.name);
    localStorage.setItem("isLoggedIn", true);
  } else {
    labelText.textContent = `Oj, något gick fel, kontrollera att du angett rätt uppgifter`;
    loginUser.value = loginPassword.value = "";
    loginPassword.blur();
  }
};

btnLogin.addEventListener("click", login);

let checkLogin = function () {
  if (localStorage.getItem("isLoggedIn")) {
    let user = [
      {
        name: localStorage.getItem("name"),
        password: localStorage.getItem("password"),
      },
    ];
    loggedIn(user);
  }
};

checkLogin();
