import { fetchJSON, isValidFeedback } from './global.js';

document.addEventListener('DOMContentLoaded', () => {
	const feedbackContainer = document.querySelector('.feedback__slide__container');
	let currentSlide = 0;

	const createSlide = (feedback) => {
		const slide = document.createElement('div');
		slide.classList.add('feedback__slide');
		slide.innerHTML = `
            <p class="feedback__slide__text">${feedback.message}</p>
            <div class="feedback__slide__author__box">
                <h1 class="feedback__slide__author">${feedback.full_name}</h1>
                <p class="feedback__slide__author__job">${feedback.profession}</p>
            </div>
            <img src="${feedback.image_url}" alt="${feedback.full_name}" class="feedback__slide__image" draggable="false"/>
        `;
		return slide;
	};

	const renderSlides = (feedbacks) => {
		feedbackContainer.innerHTML = '';
		feedbacks.forEach((feedback) => {
			if (isValidFeedback(feedback)) {
				const slide = createSlide(feedback);
				feedbackContainer.appendChild(slide);
			}
		});

		if (feedbackContainer.firstChild) {
			feedbackContainer.firstChild.classList.add('feedback__slide__active');
		}
	};

	const createNavigationButtons = () => {
		const prevButton = document.createElement('button');
		prevButton.classList.add('feedback__button', 'feedback__button__prev');
		prevButton.textContent = '⬅';
		prevButton.addEventListener('click', () => showSlide(currentSlide - 1));

		const nextButton = document.createElement('button');
		nextButton.classList.add('feedback__button', 'feedback__button__next');
		nextButton.textContent = '⮕';
		nextButton.addEventListener('click', () => showSlide(currentSlide + 1));

		feedbackContainer.appendChild(prevButton);
		feedbackContainer.appendChild(nextButton);
	};

	const showSlide = (index) => {
		const slides = document.querySelectorAll('.feedback__slide');
		if (slides.length === 0) return;

		slides[currentSlide].classList.remove('feedback__slide__active');
		currentSlide = (index + slides.length) % slides.length;
		slides[currentSlide].classList.add('feedback__slide__active');
	};

	(async () => {
		try {
			const feedbacks = await fetchJSON('src/data/feedbacks.json');
			if (Array.isArray(feedbacks)) {
				renderSlides(feedbacks);
				createNavigationButtons();
			} else {
				console.error('Invalid JSON structure:', feedbacks);
			}
		} catch (error) {
			console.error('Error fetching feedbacks:', error);
		}
	})();
});
