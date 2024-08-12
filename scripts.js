/*Cập nhật số lượng trên icon-cart*/
document.addEventListener("DOMContentLoaded", function () {
  var cartCount = document.getElementById("cart-count");
  var addToCartButtons = document.querySelectorAll(".add-product-to-cart");
  var quantityInput = document.getElementById("quantity");

  addToCartButtons.forEach(function (button) {
    button.onclick = function () {
      var currentQuantity = parseInt(cartCount.textContent, 10);
      var newQuantity = currentQuantity + parseInt(quantityInput.value, 10);
      cartCount.textContent = newQuantity;
    };
  });
});
/*-------------------------------------------------------------------------------------*/
/*phân trang product*/
document.addEventListener("DOMContentLoaded", () => {
  // Giả lập lấy dữ liệu sản phẩm từ một API hoặc nguồn động
  async function fetchProducts() {
    // Thay thế phần này bằng mã để lấy dữ liệu thực tế từ API hoặc nguồn khác
    // Ví dụ: const response = await fetch('api/products');
    // const products = await response.json();

    // Giả lập dữ liệu sản phẩm
    const products = Array.from({ length: 50 }, (_, i) => ({
      img: "https://via.placeholder.com/200",
      name: `Product ${i + 1}`,
      price: `$${(i + 1) * 10}`,
    }));

    return products;
  }

  const productsPerPage = 12;
  let currentPage = 1;
  let products = [];

  function renderProducts(page) {
    const productGrid = document.querySelector(".product-grid");
    productGrid.innerHTML = "";

    const start = (page - 1) * productsPerPage;
    const end = start + productsPerPage;
    const paginatedProducts = products.slice(start, end);

    paginatedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.className = "product-card";
      productCard.innerHTML = `
        <div class="product-img-container">
              <img src="./picture/product/product1.png" alt="Product 1" />
              <div class="overlay">
                <img src="./picture/home/cart.png" alt="add-to-cart" />
                <button class="add-to-cart-button" type="button">Add to cart</button>
            </div>
        </div>
        <div class="product-discription">
              <p class="product-type">T-shirt</p>
              <p class="product-information">Short Sleeve T-shirt with letters and bow Sweet Girl - Wise Tee</p>
              <p class="product-price">$265.0</p>
        </div>
              
      `;
      productGrid.appendChild(productCard);
    });
  }

  function setupPagination() {
    const numPages = Math.ceil(products.length / productsPerPage);
    const paginationContainer = document.querySelector(".page-buttons");
    paginationContainer.innerHTML = "";

    const firstPageButton = document.getElementById("first-page-button");
    const prevButton = document.getElementById("prev-button");
    const nextButton = document.getElementById("next-button");
    const lastPageButton = document.getElementById("last-page-button");

    if (firstPageButton && prevButton && nextButton && lastPageButton) {
      // Disable/enable navigation buttons
      firstPageButton.disabled = currentPage === 1;
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = currentPage === numPages;
      lastPageButton.disabled = currentPage === numPages;

      // Add event listeners for navigation buttons
      firstPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage = 1;
          renderProducts(currentPage);
          setupPagination();
        }
      });

      prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
          currentPage--;
          renderProducts(currentPage);
          setupPagination();
        }
      });

      nextButton.addEventListener("click", () => {
        if (currentPage < numPages) {
          currentPage++;
          renderProducts(currentPage);
          setupPagination();
        }
      });

      lastPageButton.addEventListener("click", () => {
        if (currentPage < numPages) {
          currentPage = numPages;
          renderProducts(currentPage);
          setupPagination();
        }
      });
    }

    // Create page buttons
    for (let i = 1; i <= numPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.className = "page-button";
      pageButton.textContent = i;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        renderProducts(currentPage);
        setupPagination();
      });
      if (i === currentPage) {
        pageButton.classList.add("active");
      }
      paginationContainer.appendChild(pageButton);
    }
  }

  // Fetch products and initialize
  fetchProducts().then((data) => {
    products = data;
    renderProducts(currentPage);
    setupPagination();
  });
});
/*---------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  var modal = document.getElementById("iframe-modal");
  var closeButton = document.getElementById("iframe-close");

  // Event delegation for opening modal
  document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart-button")) {
      modal.style.display = "block";
    }
  });

  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
/*Quantity Selector---------------------------------------------------------------------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  var quantityInput = document.getElementById("quantity");
  var increaseBtn = document.getElementById("increase");
  var decreaseBtn = document.getElementById("decrease");

  increaseBtn.addEventListener("click", function () {
    var currentValue = parseInt(quantityInput.value, 10);
    quantityInput.value = currentValue + 1;
  });

  decreaseBtn.addEventListener("click", function () {
    var currentValue = parseInt(quantityInput.value, 10);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });
});
/*JavaScript để thêm hàng vào bảng dựa trên dữ liệu nhận được: (cart.html)----------------------------*/
document.addEventListener("DOMContentLoaded", function () {
  // Giả lập dữ liệu sản phẩm
  const products = [
    {
      id: 1,
      image: "path/to/image1.jpg",
      name: "Product 1",
      price: 50,
      quantity: 2,
      total: 100,
    },
    {
      id: 2,
      image: "path/to/image2.jpg",
      name: "Product 2",
      price: 30,
      quantity: 1,
      total: 30,
    },
    {
      id: 3,
      image: "path/to/image2.jpg",
      name: "Product 2",
      price: 30,
      quantity: 1,
      total: 30,
    },
    {
      id: 4,
      image: "path/to/image2.jpg",
      name: "Product 2",
      price: 30,
      quantity: 1,
      total: 30,
    },
    // Thêm nhiều sản phẩm nếu cần
  ];

  const cartItemsContainer = document.getElementById("cart-items");

  products.forEach((product) => {
    // Tạo một hàng mới
    const row = document.createElement("tr");

    // Tạo các ô cho hàng
    row.innerHTML = `
      <td>
                  <input type="checkbox" class="product-checkbox" />
                </td>
                <td>
                  <div class="product-content">
                    <div class="product-image-container">
                      <img
                        src="./picture/product/product1.png"
                        alt="Product"
                        class="product-image-cart"
                      />
                    </div>
                    <div class="product-name-container">
                      <span class="product-name-cart"
                        >Short Sleeve T-shirt with letters and bow Sweet Girl -
                        Wise Tee</span
                      >
                    </div>
                  </div>
                </td>
                <td>
                  <span class="product-price-cart">$265.0</span>
                </td>
                <td>
                  <span class="product-quantity-cart">1</span>
                </td>
                <td>
                  <span class="product-total-cart">$265.0</span>
                </td>
                <td><button class="remove-btn">Remove</button></td>
    `;

    // Thêm hàng vào bảng
    cartItemsContainer.appendChild(row);
  });

  // Thêm sự kiện cho các nút "Remove"
  cartItemsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("remove-btn")) {
      const row = event.target.closest("tr");
      if (row) {
        row.remove();
      }
    }
  });
});
