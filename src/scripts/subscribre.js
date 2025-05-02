const inputBox = document.querySelector('.subscribre__input__box');
const input = inputBox.querySelector('.subscribre__input');
const button = inputBox.querySelector('.subscribre__button');
const buttonText = button.querySelector('p');

const message = document.createElement('p');
message.classList.add('subscribre__message');
inputBox.appendChild(message);

const savedEmail = localStorage.getItem('email');
if (savedEmail) {
    message.textContent = 'You are already subscribed!';
    message.style.color = '#FFAD3B';
    buttonText.textContent = 'Unsubscribe';
    input.classList.add('hidden'); 
    button.classList.add('unsubscribre__button'); 
    message.classList.add('unsubscribre__message');
}

button.addEventListener('click', (e) => {
    e.preventDefault();

    const inputValue = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (buttonText.textContent === 'Unsubscribe') {
        localStorage.removeItem('email');
        message.textContent = 'You have unsubscribed successfully.';
        message.style.color = '#FFAD3B';
        buttonText.textContent = 'Subscribe';
        input.value = '';
        input.classList.remove('hidden'); 
        button.classList.remove('unsubscribre__button');
        message.classList.remove('unsubscribre__message');
    } else if (emailRegex.test(inputValue)) {
        if (savedEmail === inputValue) {
            message.textContent = 'You are already subscribed!';
            message.style.color = '#FFAD3B';
        } else {
            localStorage.setItem('email', inputValue);
            message.textContent = 'Email saved successfully!';
            message.style.color = '#FFAD3B';
            buttonText.textContent = 'Unsubscribe';
            input.value = '';
            input.classList.add('hidden'); 
            button.classList.add('unsubscribre__button');
        }
    } else {
        message.textContent = 'Oops! The email address you entered is invalid.';
        message.style.color = 'red';
    }
});
