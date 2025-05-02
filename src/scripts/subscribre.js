const inputBox = document.querySelector(".subscribre__input__box");
const input = inputBox.querySelector("#subscribre__input");
const button = inputBox.querySelector("#subscribre__button");
const buttonText = button.querySelector("p");

const message = document.createElement("p");
message.classList.add("subscribre__message");
inputBox.insertAdjacentElement("afterend", message);

const savedEmail = localStorage.getItem("email");
if (savedEmail) {
    message.textContent = "You are already subscribed!";
    message.style.color = "orange";
    buttonText.textContent = "Unsubscribe";
}

button.addEventListener("click", (e) => {
    e.preventDefault();

    const inputValue = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (buttonText.textContent === "Unsubscribe") {
        localStorage.removeItem("email");
        message.textContent = "You have unsubscribed successfully.";
        message.style.color = "red";
        buttonText.textContent = "Subscribe";
        input.value = "";
    } else if (emailRegex.test(inputValue)) {
        if (savedEmail === inputValue) {
            message.textContent = "You are already subscribed!";
            message.style.color = "orange";
        } else {
            localStorage.setItem("email", inputValue);
            message.textContent = "Email saved successfully!";
            message.style.color = "green";
            buttonText.textContent = "Unsubscribe";
            input.value = "";
        }
    } else {
        message.textContent = "Oops! The email address you entered is invalid.";
        message.style.color = "red";
    }
});