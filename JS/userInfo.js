const userInfo = [
    {
        email: "abc@gmail.com",
        password: "123456789",
        username: "chihching"
    },
    {
        email: "123@gmail.com",
        password: "abcdefg",
        username: "mengyo"
    },
];

console.log(JSON.stringify(userInfo));

localStorage.setItem("userInfo", JSON.stringify(userInfo));