(async function () {
  const response = await fetch(
    "https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json"
  );
  const data = await response.json();
  const categoryData = data.categories;

  const categoryBtn = document.querySelectorAll(".category-name");
  const categoryProduct = document.querySelector(".category-products");
  let selectedCategory = "Men";

  categoryBtn.forEach((item, ind) => {
    item.addEventListener("click", (e) => {
      renderButton(selectedCategory, "remove");
      selectedCategory = e.currentTarget.id;

      renderButton(selectedCategory, "add");
      renderCategory(selectedCategory);
    });
  });

  function renderButton(curr, opr = "add") {
    let selectedCat = document.getElementById(curr);
    if (opr == "add") {
      selectedCat.classList.add("selected");
      selectedCat.firstElementChild.style.visibility = "visible";
    } else {
      selectedCat.classList.remove("selected");
      selectedCat.firstElementChild.style.visibility = "hidden";
      selectedCat.firstElementChild.display = "hide";
    }
  }

  function renderCategory(category) {
    let htmlPart = "";
    let categoryItem = categoryData.find(
      (item) => item.category_name === category
    ).category_products;

    categoryItem.forEach((item) => {
      let offer = Math.floor((item.price / item.compare_at_price) * 100);
      htmlPart += ` <div class="category-product">
        <div class="product-img">
          <img
            src="${item.image}"
            alt="${item.second_image}"
          />
          ${item.badge_text ? `<div>${item.badge_text}</div>` : ""}        
        </div>
        <div class="product-details">
          <div class="product-details-name">
            <span class="product-title">${item.title}</span>
            <div></div>
            <span class="product-vendor">${item.vendor}</span>
          </div>
          <div class="product-details-price">
            <span class="product-price">Rs ${item.price}</span>
            <span class="compare-price">Rs ${item.compare_at_price}</span>
            <span>${offer}% Off</span>
          </div>
        </div>
        <button class="add-btn">Add to Cart</button>
      </div>`;
    });

    categoryProduct.innerHTML = htmlPart;
  }
  renderButton(selectedCategory);
  renderCategory(selectedCategory);
})();
