export const fetchJSON = async (path) => {
	try {
		const response = await fetch(path);
		if (!response.ok) {
			throw new Error(`Error fetching JSON from ${path}: ${response.statusText}`);
		}
		const data = await response.json();
		if (data.status === 'success') {
			return data.data;
		} else {
			console.error(`Response was not successful for path: ${path}`);
			return null;
		}
	} catch (error) {
		console.error(`fetchJSON error for path ${path}:`, error);
		throw error;
	}
};

export const isValidProduct = (product) => {
	return product.imagem_url && product.name && product.short_description && product.price != null;
};

export const isValidFeedback = (feedback) => {
	return (
		feedback &&
		typeof feedback.message === 'string' &&
		feedback.message.trim() !== '' &&
		typeof feedback.full_name === 'string' &&
		feedback.full_name.trim() !== '' &&
		typeof feedback.profession === 'string' &&
		feedback.profession.trim() !== '' &&
		typeof feedback.image_url === 'string' &&
		feedback.image_url.trim() !== ''
	);
};
