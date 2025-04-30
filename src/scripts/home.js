const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileMenu = document.querySelector('.mobile-menu');

hamburgerMenu.addEventListener('click', () => {
	if (mobileMenu.classList.contains('open')) {
		mobileMenu.classList.remove('open');
		setTimeout(() => mobileMenu.classList.add('hidden'), 500);
	} else {
		mobileMenu.classList.remove('hidden');
		setTimeout(() => mobileMenu.classList.add('open'), 10);
	}
});