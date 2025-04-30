import { readJSON } from './global.js';

const createProductCard = (product) => {
	const card = document.createElement('div');
	card.classList.add('product-card');

	card.innerHTML = `
        <img src="${product.imagem_url}" alt="${product.name}" class="product-card__image" draggable='false'/>
        <h3 class="product-card__title">${product.name}</h3>
        <p class="product-card__description">${product.short_description}</p>
        <p class="product-card__price">$${product.price.toFixed(2)}</p>
        <button class="btn__skin product-card__button"><p>Order Now</p></button>
    `;

	return card;
};

const renderProducts = (products) => {
	const container = document.querySelector('.home__products__box__container');
	if (!container) {
		console.error('Container with class "home__products__box__container" not found.');
		return;
	}

	container.innerHTML = '';

	products.forEach((product) => {
		const card = createProductCard(product);
		container.appendChild(card);
	});
};

const getRandomProducts = (data, count) => {
	const shuffled = data.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};

readJSON('src/data/all-items.json')
	.then((response) => {
		if (response.status === 'success' && Array.isArray(response.data)) {
			const randomProducts = getRandomProducts(response.data, 4);
			renderProducts(randomProducts);
		} else {
			console.error('Invalid JSON structure:', response);
		}
	})
	.catch((error) => {
		console.error('Error:', error);
	});
