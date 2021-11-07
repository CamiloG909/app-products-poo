class DetailsProduct {
	constructor(name, price, year) {
		this.name = name;
		this.price = price;
		this.year = year;
	}
}

class UI {
	// Add a new Product
	addProduct(product) {
		const productList = document.getElementById("index-section-products");
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
		<button name="delete" class="product-card__btn"><i name="delete-icon" class="bi bi-trash2-fill"></i> Delete</button>
        `;
		productList.appendChild(element);
	}

	resetForm() {
		document.querySelector("#card-add__form").reset();
	}

	deleteProduct(element) {
		if (element.name === "delete") {
			element.parentElement.remove();
			this.showMessage("Product deleted", "red");
		}
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

document.getElementById("card-add__form").addEventListener("submit", (e) => {
	// Override the default Form behaviour
	e.preventDefault();

	// Getting Form Values
	const name = document.getElementById("product-name").value;
	const price = document.getElementById("product-price").value;
	const year = document.getElementById("product-year").value;

	// Create a new Oject Product
	const product = new DetailsProduct(name, price, year);

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
	ui.addProduct(product);
	ui.showMessage("Product added");
	ui.resetForm();
});

document
	.querySelector("#index-section-products")
	.addEventListener("click", (e) => {
		const ui = new UI();
		ui.deleteProduct(e.target);
	});
