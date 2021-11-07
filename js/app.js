let products = [];

class DetailsProduct {
	constructor(id, name, price, year) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.year = year;
	}
}

class UI {
	// Add a new Product
	addProduct(products) {
		const productList = document.getElementById("index-section-products");
		productList.innerHTML = "";
		products.forEach((product) => {
			const element = document.createElement("article");
			element.className = "product-card";
			element.innerHTML = `
			<p class="product-card__info">
				<b>Product: </b>${product.name}
				</p>
				<p class="product-card__info">
				<b>Price: </b>${product.price}
				</p>
				<p class="product-card__info">
				<b>Year: </b>${product.year}
			</p>
			<button data-id="${product.id}" name="delete" class="product-card__btn"><i class="bi bi-trash2-fill"></i> Delete</button>
					`;
			productList.appendChild(element);
		});
	}

	resetForm() {
		document.querySelector("#card-add__form").reset();
	}

	showMessage(message, type = "green") {
		// Show message in header
		const headerTitle = document.querySelector(".header__title");
		headerTitle.textContent = message;
		if (type == "red") {
			headerTitle.style.color = "#d31225";
		}

		// Remove the Message after 2 seconds
		setTimeout(() => {
			headerTitle.textContent = "App product";
			headerTitle.style = null;
		}, 1500);
	}
}

class LS {
	getProducts() {
		if (localStorage.getItem("products") === null) {
			localStorage.setItem("products", JSON.stringify(products));
		} else {
			const ui = new UI();
			products = JSON.parse(localStorage.getItem("products"));
			ui.addProduct(products);
		}
	}
	deleteProduct(id) {
		const ui = new UI();
		products = products.filter((product) => product.id != id);
		ui.showMessage('Deleted product', 'red');
		this.syncProducts();
	}
	syncProducts() {
		const ui = new UI();
		ui.addProduct(products);
		localStorage.setItem("products", JSON.stringify(products));
	}
}

const ls = new LS();
// Get products from local storage
window.addEventListener("DOMContentLoaded", ls.getProducts());

document.querySelector("#card-add__form").addEventListener("submit", (e) => {
	// Override the default Form behaviour
	e.preventDefault();

	// Getting Form Values
	const name = document.getElementById("product-name").value;
	const price = document.getElementById("product-price").value;
	const year = document.getElementById("product-year").value;

	// Create a new Oject Product
	const product = new DetailsProduct(Date.now(), name, price, year);

	// Create a new UI instance
	const ui = new UI();

	// Input User Validation
	if (name === "" || price === "" || year === "") {
		// Show error message in header of card
		const boxTitle = document.querySelector(".card-add .card-add__header p");
		boxTitle.parentElement.classList.add("error");
		boxTitle.textContent = "Please complete data";
		setTimeout(() => {
			boxTitle.parentElement.classList.remove("error");
			boxTitle.textContent = "Add new product";
		}, 1500);
		return;
	}

	// Save Product
	products.push(product);
	ls.syncProducts();
	ui.showMessage("Product added");
	ui.resetForm();
});

// Delete product btn
document
	.querySelector("#index-section-products")
	.addEventListener("click", (e) => {
		if (e.target.name === "delete") {
			const id = e.target.getAttribute("data-id");
			ls.deleteProduct(id);
		}
	});
