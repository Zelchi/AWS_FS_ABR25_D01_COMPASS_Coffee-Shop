import { readJSON } from './global.js';

const renderTable = (items) => {
	const tableContainer = document.querySelector('.table__container');
	const tableBox = document.querySelector('.table__box');
	if (!tableContainer || !tableBox) {
		console.error('Container with class "table__container" or "table__box" not found.');
		return;
	}

	tableBox.innerHTML = '';

	let initialBar = document.querySelector('.table__initial__bar');
	if (!initialBar) {
		initialBar = document.createElement('div');
		initialBar.classList.add('table__initial__bar');
		initialBar.innerHTML = `
            <p>Item</p>
            <p class="remove__in__short__window">Type</p>
            <p>Price</p>
        `;
		tableContainer.insertBefore(initialBar, tableBox);
	}

	items.forEach((item) => {
		const row = document.createElement('div');
		row.classList.add('table__row');

		row.innerHTML = `
            <p>${item.name}</p>
            <p class="remove__in__short__window">${item.type}</p>
            <p>$${item.price.toFixed(2)}</p>
        `;

		tableBox.appendChild(row);
	});
};

const filterItemsByType = (items, type) => {
	if (type === 'all') return items;
	if (type === 'warm') return items.filter((item) => item.type === 'Hot Beverage');
	if (type === 'cold') return items.filter((item) => item.type === 'Cold Beverage');
	if (type === 'snacks') return items.filter((item) => item.type === 'Savory Snack');
	if (type === 'dessert') return items.filter((item) => item.type === 'Bakery');
	return [];
};

const setupTableButtons = (items) => {
	const buttons = document.querySelectorAll('.table__select__button, .table__no__selected__button');
	buttons.forEach((button) => {
		button.addEventListener('click', () => {
			const selectedType = button.id.replace('table__select__button__', '');

			buttons.forEach((btn) => btn.classList.replace('table__select__button', 'table__no__selected__button'));
			button.classList.replace('table__no__selected__button', 'table__select__button');

			const filteredItems = filterItemsByType(items, selectedType);
			renderTable(filteredItems);
		});
	});
};

readJSON('src/data/all-items.json')
	.then((response) => {
		if (response.status === 'success' && Array.isArray(response.data)) {
			renderTable(response.data);
			setupTableButtons(response.data);
		} else {
			console.error('Invalid JSON structure:', response);
		}
	})
	.catch((error) => {
		console.error('Error:', error);
	});
