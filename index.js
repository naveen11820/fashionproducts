const apiUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';
const productContainer = document.getElementById('productContainer');

async function fetchProducts() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

function calculateDiscountPercentage(price, compareAtPrice) {
  const discountPercentage = ((compareAtPrice - price) / compareAtPrice) * 100;
  return Math.round(discountPercentage);
}

function createProductCard(product) {
  const card = document.createElement('div');
  card.classList.add('product-card');

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('image-container');

  const mainImage = document.createElement('img');
  mainImage.src = product.image;
  mainImage.alt = product.title;
  mainImage.classList.add('main-image');

  const secondImage = document.createElement('img');
  secondImage.src = product.second_image;
  secondImage.alt = product.title;
  secondImage.classList.add('second-image');
  secondImage.style.display = 'none'; // Initially hide the second image

  // Previous and Next buttons
  const prevButton = document.createElement('button');
  prevButton.textContent = 'Previous';
  prevButton.classList.add('prev-button');
  prevButton.addEventListener('click', () => showPreviousImage(mainImage, secondImage));

  const nextButton = document.createElement('button');
  nextButton.textContent = 'Next';
  nextButton.classList.add('next-button');
  nextButton.addEventListener('click', () => showNextImage(mainImage, secondImage));

  imageContainer.appendChild(prevButton);
  imageContainer.appendChild(mainImage);
  imageContainer.appendChild(secondImage);
  imageContainer.appendChild(nextButton);

  card.appendChild(imageContainer);

  const paragraph = document.createElement('p');
  paragraph.textContent = product.badge_text;
  card.appendChild(paragraph);

  const heading = document.createElement('h3');
  heading.textContent = product.title;
  card.appendChild(heading);

  const vendorParagraph = document.createElement('p');
  vendorParagraph.textContent = `Vendor: ${product.vendor}`;
  card.appendChild(vendorParagraph);

  const priceParagraph = document.createElement('p');
  priceParagraph.textContent = `Price: $${product.price}`;
  card.appendChild(priceParagraph);

  const comparePriceParagraph = document.createElement('p');
  comparePriceParagraph.textContent = `Compare at Price: $${product.compare_at_price}`;
  card.appendChild(comparePriceParagraph);

  const discountParagraph = document.createElement('p');
  discountParagraph.textContent = `${calculateDiscountPercentage(product.price, product.compare_at_price)}% off`;
  card.appendChild(discountParagraph);

  const button = document.createElement('button');
  button.textContent = 'Add to Cart';
  card.appendChild(button);

  return card;
}

function showPreviousImage(mainImage, secondImage) {
  mainImage.style.display = 'block';
  secondImage.style.display = 'none';
}

function showNextImage(mainImage, secondImage) {
  mainImage.style.display = 'none';
  secondImage.style.display = 'block';
}

async function showCategory(category) {
  const products = await fetchProducts();
  const filteredProducts = products.categories.find(product => product.category_name === category);

  // Clear existing cards
  productContainer.innerHTML = '';

  // Display new cards
  filteredProducts.category_products.forEach(product => {
    const card = createProductCard(product);
    productContainer.appendChild(card);
  });
}

// Wrap the initial load call in a window load event listener
window.onload = function () {
  showCategory('Men');
};
