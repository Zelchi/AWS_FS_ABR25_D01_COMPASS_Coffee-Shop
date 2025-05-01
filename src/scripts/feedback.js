import { readJSON } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
	const feedbackContainer = document.querySelector('.feedback__slide__container');
	let currentSlide = 0;

	function showSlide(index) {
		const slides = document.querySelectorAll('.feedback__slide');
		if (slides.length === 0) return;

		slides[currentSlide].classList.remove('feedback__slide__active');
		currentSlide = (index + slides.length) % slides.length;
		slides[currentSlide].classList.add('feedback__slide__active');
	}

	function showNextSlide() {
		showSlide(currentSlide + 1);
	}

	function showPreviousSlide() {
		showSlide(currentSlide - 1);
	}

	readJSON('src/data/feedbacks.json')
		.then((response) => {
			if (response.status === 'success' && Array.isArray(response.data)) {
				feedbackContainer.innerHTML = '';

				response.data.forEach((feedback) => {
					const slide = document.createElement('div');
					slide.classList.add('feedback__slide');
					slide.innerHTML = `
                    <p class="feedback__slide__text">${feedback.message}</p>
                    <div class="feedback__slide__author__box">
                    <h1 class="feedback__slide__author">${feedback.full_name}</h1>
                    <p class="feedback__slide__author__job">${feedback.profession}</p>
                    </div>
                    <img src="${feedback.image_url}" alt="${feedback.full_name}" class="feedback__slide__image" draggable='false'/>
                `;
					feedbackContainer.appendChild(slide);
				});

				feedbackContainer.firstChild.classList.add('feedback__slide__active');

				const prevButton = document.createElement('button');
				prevButton.classList.add('feedback__button', 'feedback__button__prev');
				prevButton.textContent = '⬅';
				prevButton.addEventListener('click', showPreviousSlide);

				const nextButton = document.createElement('button');
				nextButton.classList.add('feedback__button', 'feedback__button__next');
				nextButton.textContent = '⮕';
				nextButton.addEventListener('click', showNextSlide);

				feedbackContainer.appendChild(prevButton);
				feedbackContainer.appendChild(nextButton);
			} else {
				console.error('Invalid JSON structure:', response);
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
});
