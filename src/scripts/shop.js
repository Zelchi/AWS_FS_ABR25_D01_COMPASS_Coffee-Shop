import { readJSON } from './global.js';

const createProductCard = (product) => {
	const card = document.createElement('div');
	card.classList.add('product-card');

	card.innerHTML = `
        <img src="${product.imagem_url}" alt="${product.name}" class="product-card-image" draggable='false'/>
        <h3 class="product-card-title">${product.name}</h3>
        <p class="product-card-description">${product.short_description}</p>
        <p class="product-card-price">$${product.price.toFixed(2)}</p>
        <button class="btn-skin product-card-button"><p>Order Now</p></button>
    `;

	return card;
};

const renderProducts = (products) => {
	const container = document.querySelector('.shop-products-box-container');
	if (!container) {
		console.error('Container with class "shop-products-box-container" not found.');
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
