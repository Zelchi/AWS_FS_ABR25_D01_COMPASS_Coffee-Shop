import { fetchJSON, isValidProduct, getElement } from './global.js';

const createProductCard = (product) => {
	if (!product.imagem_url || !product.name || !product.short_description || product.price == null) {
		return null;
	}

	const card = document.createElement('div');
	card.classList.add('product__card');

	card.innerHTML = `
        <img src="${product.imagem_url}" class="product__card__image" draggable='false'/>
        <h3 class="product__card__title">${product.name}</h3>
        <p class="product__card__description">${product.short_description}</p>
        <p class="product__card__price">$${product.price.toFixed(2)}</p>
        <button class="btn__skin product__card__button"><p>Order Now</p></button>
    `;

	return card;
};

const renderProducts = (products) => {
	const container = getElement('.shop__products__box__container');
	if (!container) {
		console.error('Container with class "shop__products__box__container" not found.');
		return;
	}

	container.innerHTML = '';

	products.forEach((product) => {
		const card = createProductCard(product);
		if (card) {
			container.appendChild(card);
		}
	});
};

const getRandomProducts = (data, count) => {
	const validProducts = data.filter(isValidProduct);
	const shuffled = validProducts.sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
};

(async () => {
	try {
		const items = await fetchJSON('src/data/all-items.json');
		if (Array.isArray(items)) {
			const randomProducts = getRandomProducts(items, 4);
			renderProducts(randomProducts);
		} else {
			console.error('Invalid JSON structure:', items);
		}
	} catch (error) {
		console.error('Error:', error);
	}
})();
