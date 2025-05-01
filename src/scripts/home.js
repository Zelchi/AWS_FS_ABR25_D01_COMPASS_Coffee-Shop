const hamburgerMenu = document.querySelector('.hamburger__menu');
const mobileMenu = document.querySelector('.mobile__menu');

hamburgerMenu.addEventListener('click', () => {
	if (mobileMenu.classList.contains('mobile__menu__open')) {
		mobileMenu.classList.remove('mobile__menu__open');
		setTimeout(() => mobileMenu.classList.add('hidden'), 500);
	} else {
		mobileMenu.classList.remove('hidden');
		setTimeout(() => mobileMenu.classList.add('mobile__menu__open'), 10);
	}
});
