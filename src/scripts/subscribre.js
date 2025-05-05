import { getElement } from './global.js';

const inputBox = getElement('.subscribre__input__box');
const input = getElement('.subscribre__input');
const button = getElement('.subscribre__button');
const buttonText = getElement('.subscribre__button__text');

const message = document.createElement('p');
message.classList.add('subscribre__message');
inputBox.appendChild(message);

const updateUI = (isSubscribed, textMessage, color) => {
	message.textContent = textMessage;
	message.style.color = color;

	if (isSubscribed) {
		buttonText.textContent = 'Unsubscribe';
		input.classList.add('hidden');
		button.classList.add('unsubscribre__button');
		message.classList.add('unsubscribre__message');
	} else {
		buttonText.textContent = 'Subscribe';
		input.classList.remove('hidden');
		button.classList.remove('unsubscribre__button');
		message.classList.remove('unsubscribre__message');
	}
};

const savedEmail = localStorage.getItem('email');
if (savedEmail) {
	updateUI(true, 'You are already subscribed!', '#FFAD3B');
}

const handleSubscription = () => {
	const inputValue = input.value.trim();
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (buttonText.textContent === 'Unsubscribe') {
		localStorage.removeItem('email');
		updateUI(false, 'You have unsubscribed successfully.', '#FFAD3B');
		input.value = '';
	} else if (emailRegex.test(inputValue)) {
		if (savedEmail === inputValue) {
			updateUI(true, 'You are already subscribed!', '#FFAD3B');
		} else {
			localStorage.setItem('email', inputValue);
			updateUI(true, 'Email saved successfully!', '#FFAD3B');
			input.value = '';
		}
	} else {
		updateUI(false, 'Oops! The email address you entered is invalid.', 'red');
	}
};

button.addEventListener('click', (e) => {
	e.preventDefault();
	handleSubscription();
});

input.addEventListener('keypress', (e) => {
	if (e.key === 'Enter' && buttonText.textContent === 'Subscribe') {
		e.preventDefault();
		handleSubscription();
	}
});
