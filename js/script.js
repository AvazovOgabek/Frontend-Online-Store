const products = [
    { name: 'Product 1', category: 'Electronics', price: 19.99, image: 'image/download.png', description: 'Description of Product 1.' },
    { name: 'Product 2', category: 'Clothing', price: 24.99, image: 'image/download.png', description: 'Description of Product 2.' },
    { name: 'Product 3', category: 'Books', price: 14.99, image: 'image/minimal-product-backdrop-with-white-wall_53876-147888.avif', description: 'Description of Product 3.' },
    // Add more products with different categories
  ];
  
  function displayProducts(products) {
    const productsSection = document.getElementById('products');
    productsSection.innerHTML = '';
  
    products.forEach(product => {
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>${product.category}</p>
        <p>$${product.price.toFixed(2)}</p>
        <button onclick="openProductDetails(${JSON.stringify(product)})">Details</button>
        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
      `;
      productsSection.appendChild(productDiv);
    });
  }
  
  function filterProducts(category) {
    if (category === 'All') {
      displayProducts(products);
    } else {
      const filteredProducts = products.filter(product => product.category === category);
      displayProducts(filteredProducts);
    }
  }
  
  function searchProducts() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchInput) ||
      product.category.toLowerCase().includes(searchInput)
    );
  
    displayProducts(filteredProducts);
  }
  
  function checkout() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
  
    if (cartItems.children.length === 0) {
      alert('Your cart is empty. Add items before checking out.');
      return;
    }
  
    alert('Thank you for your purchase!');
    

    clearCart();
  }

  function addToCart(productName, price, quantity = 1) {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    const listItem = document.createElement('li');
    listItem.textContent = `${productName} x${quantity} - $${(price * quantity).toFixed(2)}`;
    cartItems.appendChild(listItem);

    const currentTotal = parseFloat(cartTotal.textContent);
    cartTotal.textContent = (currentTotal + price * quantity).toFixed(2);
}

function clearCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
  
    cartItems.innerHTML = ''; // Clear the cart items
    cartTotal.textContent = '0.00'; // Reset the total amount
  }

  function openProductDetails(product) {
    const overlay = document.getElementById('overlay');
    const productDetails = document.getElementById('product-details');
    const productImage = document.querySelector('.product-details img');
    const productName = document.querySelector('.product-details h2');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const quantityInput = document.getElementById('quantity');
  
    productImage.src = product.image || 'placeholder-image.jpg';
  
    productName.textContent = product.name;
    productDescription.textContent = product.description;
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    quantityInput.value = 1;
  
    overlay.style.display = 'block';
    productDetails.style.display = 'block';
  }
  
  function closeProductDetails() {
    const overlay = document.getElementById('overlay');
    const productDetails = document.getElementById('product-details');
  
    overlay.style.display = 'none';
    productDetails.style.display = 'none';
  }
  
  function addToCartDetails() {
    const productName = document.querySelector('.product-details h2').textContent;
    const price = parseFloat(document.getElementById('product-price').textContent.substring(1));
    const quantity = parseInt(document.getElementById('quantity').value);
  
    addToCart(productName, price, quantity);
  
    closeProductDetails();
  }
  
  displayProducts(products);
  