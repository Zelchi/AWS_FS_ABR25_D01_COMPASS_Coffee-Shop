export const readJSON = async (relativePath) => {
	try {
		const response = await fetch(relativePath)
		if (!response.ok) {
			throw new Error(`Error fetching JSON: ${response.statusText}`)
		}
		const jsonData = await response.json()
		return jsonData
	} catch (error) {
		console.error(error)
		throw error
	}
};