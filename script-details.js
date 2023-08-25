const productId = new URLSearchParams(window.location.search).get("productId");

const auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTZlY2MwMzRmZjAwMTQwM2Y0ZTgiLCJpYXQiOjE2OTI5NDgyMDQsImV4cCI6MTY5NDE1NzgwNH0.rbfPITP6-Szkp6rMe_E-UzPJHRC545XCznuOexMpSiw";
const URL = "https://striveschool-api.herokuapp.com/api/product/" + productId;

const section = document.getElementsByTagName("section")[0];

window.addEventListener("DOMContentLoaded", () => {
  fetch(URL, {
    headers: {
      Authorization: auth,
    },
  })
    .then((resp) => {
      return resp.json();
    })
    .then((productObj) => {
      section.innerHTML = `<div class="card mb-3" style="max-width: 740px">
      <div class="row g-0">
        <div class="col-md-4">
          <img
            src=${productObj.imageUrl}
            class="img-fluid rounded-start h-100 object-fit-cover"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">${productObj.name}</h5>
            <p class="card-text">
              ${productObj.description}
            </p>
            <p class="card-text">${productObj.brand}</p>
            <p class="card-text">${productObj.price}$</p>
            <p class="card-text"><small class="text-body-secondary">${productObj._id}</small></p>
            <div class="d-flex justify-content-between">
              <a href="./index.html"><button type="button" class="btn btn-sm btn-outline-primary">Go back</button></a>
              <button type="button" class="btn btn-sm btn-outline-success">Buy</button>
            </div>
          </div>
        </div>
      </div>
    </div>`;
    })
    .catch((err) => {
      console.log(err);
    });
});
