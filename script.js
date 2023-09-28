const btnLogin = document.querySelector(".btn-login");
const loginUser = document.querySelector(".login-user");
const loginPassword = document.querySelector(".login-password");
const openPopup = document.querySelector(".btn-open-popup");
const closePopup = document.querySelector(".close-popup");
const popup = document.querySelector(".login-popup-container");
const overlay = document.querySelector(".overlay");
const labelText = document.querySelector(".label-text");

const users = [
  {
    name: "Bella",
    password: "qwe123",
  },
];

const addClass = () => {
  popup.classList.add("hidden");
  overlay.classList.add("hidden");
};

openPopup.addEventListener("click", () => {
  popup.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closePopup.addEventListener("click", addClass);

////////////////////  LOGIN ///////////////////////////

const loggedIn = () => {
  labelText.textContent = `Välkommen tillbaka ${localStorage.getItem(
    "name"
  )}, du är nu inloggad!`;
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

////////////////////  INPUT ///////////////////////////

const login = (e) => {
  e.preventDefault();
  const currentAccount = users.find(
    (acc) =>
      acc.name === loginUser.value && acc.password === loginPassword.value
  );
  if (currentAccount) {
    localStorage.setItem("name", currentAccount.name);
    localStorage.setItem("isLoggedIn", true);
    loggedIn();
  } else {
    labelText.textContent = `Oj, något gick fel, kontrollera att du angett rätt uppgifter`;
    loginUser.value = loginPassword.value = "";
    loginPassword.blur();
  }
};

btnLogin.addEventListener("click", login);

let checkLogin = () => {
  if (localStorage.getItem("isLoggedIn"))
    loggedIn(localStorage.getItem("name"));
};

checkLogin();
