let form = document.querySelector("#form");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let loginBtn = document.querySelector(".loginBtn");

function setError(element, message) {
  let account = element.parentElement;
  let errorDisplay = account.querySelector(".error");

  errorDisplay.innerText = message;
  account.classList.add("error");
}

function setSuccess(element) {
  let account = element.parentElement;
  let errorDisplay = account.querySelector(".error");

  errorDisplay.innerText = "";
  account.classList.remove("error");
}

function validateInputs() {
  let userInfo = localStorage.getItem("userInfo");
  userInfo = JSON.parse(userInfo);
  console.log(userInfo);

  let emailIsValid = true;
  let passwordIsValid = true;
  let count = 0;
  let emailValue = email.value;
  let passwordValue = password.value;

  for (let i = 0; i < userInfo.length; i++) {
    console.log(userInfo[i].email);
    console.log(userInfo[i].password);
    count++;
    console.log("count:" + count);

    if (emailValue === "") {
      setError(email, "請輸入Email");
      emailIsValid = false;
    } else if (/[^A-Za-z0-9@.]/.test(emailValue)) {
      setError(email, "信箱名稱僅可輸入大小寫字母和數字");
      emailIsValid = false;
    } else if (emailValue === userInfo[i].email) {
      setSuccess(email);
      emailIsValid = true;
      alert("hi");
    } else {
      setError(email, "此信箱尚未註冊");
      emailIsValid = false;
    };

    if (passwordValue === "") {
      setError(password, "請輸入密碼");
      passwordIsValid = false;
    } else if (passwordValue === userInfo[i].password) {
      setSuccess(password);
      passwordIsValid = true;
    } else {
      setError(password, "密碼有誤");
      passwordIsValid = false;
    }

    if (emailIsValid && passwordIsValid) {
      window.location.href = "http://127.0.0.1:5500/index.html";
    };
  }
}

loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  validateInputs();
});

