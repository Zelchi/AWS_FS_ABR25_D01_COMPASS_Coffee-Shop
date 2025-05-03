import { fetchJSON, isValidProduct } from './global.js';

const getElement = (selector) => document.querySelector(selector);

const createInitialBar = (tableContainer, tableBox) => {
	let initialBar = getElement('.table__initial__bar');
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
};

const createTableRow = (item) => {
	const row = document.createElement('div');
	row.classList.add('table__row');
	row.innerHTML = `
        <p>${item.name}</p>
        <p class="remove__in__short__window">${item.type}</p>
        <p>$${item.price.toFixed(2)}</p>
    `;
	return row;
};

const renderTable = (items) => {
	const tableContainer = getElement('.table__container');
	const tableBox = getElement('.table__box');
	if (!tableContainer || !tableBox) {
		console.error('Container with class "table__container" or "table__box" not found.');
		return;
	}

	tableBox.innerHTML = '';
	createInitialBar(tableContainer, tableBox);

	items.filter(isValidProduct).forEach((item) => {
		const row = createTableRow(item);
		tableBox.appendChild(row);
	});
};

const filterItemsByType = (items, type) => {
	const typeMap = {
		all: () => items,
		warm: () => items.filter((item) => item.type === 'Hot Beverage'),
		cold: () => items.filter((item) => item.type === 'Cold Beverage'),
		snacks: () => items.filter((item) => item.type === 'Savory Snack'),
		dessert: () => items.filter((item) => item.type === 'Bakery'),
	};
	return (typeMap[type] || (() => []))();
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

(async () => {
	try {
		const items = await fetchJSON('src/data/all-items.json');
		if (Array.isArray(items)) {
			renderTable(items);
			setupTableButtons(items);
		} else {
			console.error('Invalid JSON structure:', items);
		}
	} catch (error) {
		console.error('Error:', error);
	}
})();
