import { getElement } from './global.js';

const hamburgerMenu = getElement('.navbar__hamburger__menu');
const mobileMenu = getElement('.navbar__mobile__menu');
const navbar = getElement('.navbar');

hamburgerMenu.addEventListener('click', () => {
	if (mobileMenu.classList.contains('navbar__mobile__menu__open')) {
		mobileMenu.classList.remove('navbar__mobile__menu__open');
		setTimeout(() => {
			mobileMenu.classList.add('hidden');
			navbar.classList.remove('hidden');
		}, 500);
	} else {
		mobileMenu.classList.remove('hidden');
		navbar.classList.add('hidden');
		setTimeout(() => mobileMenu.classList.add('navbar__mobile__menu__open'), 10);
	}
});
