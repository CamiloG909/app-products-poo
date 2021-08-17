/* eslint-disable class-methods-use-this */
/* eslint-disable max-classes-per-file */
class DetailsProduct {
	constructor(name, price, year) {
		this.name = name
		this.price = price
		this.year = year
	}
}

class UI {
	// Add a new Product
	addProduct(product) {
		const productList = document.getElementById('index-section-products')
		const element = document.createElement('article')
		element.className = 'product-card'
		element.innerHTML = `
		<p class="product-card__info">
			<b>Product: </b>${product.name}
			<b>Price: </b>${product.price}
			<b>Year: </b>${product.year}
		</p>
		<input type="submit" value="Delete" name="delete" class="btn-delete">
        `
		productList.appendChild(element)
	}

	resetForm() {
		document.getElementById('card-add__form').reset()
	}

	deleteProduct(element) {
		if (element.name === 'delete') {
			element.parentElement.remove()
			this.showMessage('Product Deleted Successfully', 'deleted')
		}
	}

	showMessage(message, cssClass) {
		const div = document.createElement('div')
		div.className = `message-product message-product--${cssClass}`
		div.appendChild(document.createTextNode(message))

		// Show in The DOM
		const container = document.querySelector('.message-products-container')

		// Insert Message in the UI
		container.appendChild(div)

		// Remove the Message after 3 seconds
		setTimeout(() => {
			document.querySelector('.message-product').remove()
		}, 2000)
	}
}

document.getElementById('card-add__form').addEventListener('submit', (e) => {
	// Override the default Form behaviour
	e.preventDefault()

	// Getting Form Values
	const name = document.getElementById('product-name').value
	const price = document.getElementById('product-price').value
	const year = document.getElementById('product-year').value

	// Create a new Oject Product
	const product = new DetailsProduct(name, price, year)

	// Create a new UI instance
	const ui = new UI()

	// Input User Validation
	if (name === '' || price === '' || year === '') {
		return ui.showMessage('Please Insert data in all fields', 'danger')
	}

	// Save Product
	ui.addProduct(product)
	ui.showMessage('Product Added Successfully', 'added')
	ui.resetForm()
})

document
	.getElementById('index-section-products')
	.addEventListener('click', (e) => {
		const ui = new UI()
		ui.deleteProduct(e.target)
		e.preventDefault()
	})
