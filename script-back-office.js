const productId = new URLSearchParams(window.location.search).get("productId");

const auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTZlY2MwMzRmZjAwMTQwM2Y0ZTgiLCJpYXQiOjE2OTI5NDgyMDQsImV4cCI6MTY5NDE1NzgwNH0.rbfPITP6-Szkp6rMe_E-UzPJHRC545XCznuOexMpSiw";
URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

const resetForm = () => {
  document.getElementById("productName").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productBrand").value = "";
  document.getElementById("productImgSrc").value = "";
};

const deleteProduct = () => {
  fetch(URL, {
    method: "DELETE",
    headers: {
      Authorization: auth,
    },
  })
    .then(() => {
      resetForm();
    })
    .catch((err) => {
      console.log(err);
    });
};

const modalLogicDelete = (event, product) => {
  event.preventDefault();

  event.target.setAttribute("data-bs-toggle", "modal");
  event.target.setAttribute("data-bs-target", "#exampleModal");

  let modal = document.querySelector(".modal");

  modal.querySelector("h1").innerText = `${product.name}`;
  modal.querySelector(".modal-body").innerText = `Are you sure you want to delete this product?`;
  modal.querySelectorAll("button")[1].innerText = "Yes";
  modal.querySelectorAll("button")[1].onclick = deleteProduct;
  modal.querySelectorAll("button")[2].innerText = "No";
};

const modalLogicModify = (event, product) => {
  event.preventDefault();

  event.target.setAttribute("data-bs-toggle", "modal");
  event.target.setAttribute("data-bs-target", "#exampleModal");

  let modal = document.querySelector(".modal");

  modal.querySelector("h1").innerText = `${product.name}`;
  modal.querySelector(".modal-body").innerText = `Are you sure you want to keep this changes?`;
  modal.querySelectorAll("button")[1].innerText = "Yes";
  modal.querySelectorAll("button")[1].onclick = sendProduct;
  modal.querySelectorAll("button")[2].innerText = "No";
};

const modalLogicReset = (event) => {
  event.preventDefault();

  event.target.setAttribute("data-bs-toggle", "modal");
  event.target.setAttribute("data-bs-target", "#exampleModal");

  let modal = document.querySelector(".modal");

  modal.querySelector("h1").innerText = "Reset form";
  modal.querySelector(".modal-body").innerText = `Are you sure you want to delete all input fields?`;
  modal.querySelectorAll("button")[1].innerText = "Yes";
  modal.querySelectorAll("button")[1].onclick = resetForm;
  modal.querySelectorAll("button")[2].innerText = "No";
};

if (productId) {
  const submitBtn = document.getElementById("functionBtn");
  const deleteBtn = document.getElementById("deleteBtn");

  submitBtn.innerText = "Modify";
  submitBtn.setAttribute("type", "button");
  deleteBtn.classList.remove("d-none");

  fetch(URL, {
    headers: {
      Authorization: auth,
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((productObj) => {
      document.getElementById("productName").value = productObj.name;
      document.getElementById("productDescription").value = productObj.description;
      document.getElementById("productPrice").value = productObj.price;
      document.getElementById("productBrand").value = productObj.brand;
      document.getElementById("productImgSrc").value = productObj.imageUrl;

      deleteBtn.addEventListener("click", (event) => {
        modalLogicDelete(event, productObj);
      });
      submitBtn.addEventListener("click", (event) => {
        modalLogicModify(event, productObj);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

const sendProduct = async (event) => {
  event.preventDefault();

  const newProduct = {
    name: document.getElementById("productName").value,
    description: document.getElementById("productDescription").value,
    price: parseInt(document.getElementById("productPrice").value),
    brand: document.getElementById("productBrand").value,
    imageUrl: document.getElementById("productImgSrc").value,
  };

  try {
    const resp = await fetch(URL, {
      method: productId ? "PUT" : "POST",
      body: JSON.stringify(newProduct),
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTZlY2MwMzRmZjAwMTQwM2Y0ZTgiLCJpYXQiOjE2OTI5NDgyMDQsImV4cCI6MTY5NDE1NzgwNH0.rbfPITP6-Szkp6rMe_E-UzPJHRC545XCznuOexMpSiw",
        "Content-type": "application/json",
      },
    });
    if (resp.ok) {
      if (!productId) {
        resetForm();
      }
      const newProductObj = await resp.json();
    }
  } catch (err) {
    console.log(err);
  }
};
