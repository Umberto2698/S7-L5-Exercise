const drawCard = (image) => `<div class="col mb-4">
                          <div class="card mb-4 shadow-sm h-100">
                          <img src=${image.imageUrl} class="card-img-top" style="height: 200px; object-fit: cover; cursor: pointer" onclick="goToDetails(${image._id})">
                            <div class="card-body d-flex flex-column">
                              <h5 class="card-title" onclick="goToDetails(${image._id})" style="cursor: pointer">${image.name}</h5> 
                                <p class="card-text mt-auto">
                                      ${image.description}
                                </p>
                                <p class="card-text">${image.price}$</p>
                                
                                <div
                                  class="d-flex justify-content-between align-items-center"
                                >
                                  <div class="btn-group">
                                  <a href="./details.html?productId=${image._id}">
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-outline-secondary"
                                    >
                                      Learn More
                                    </button>
                                    <a/>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-outline-secondary"
                                        onclick="hideMe(event)">
                                      Hide
                                    </button>
                                    <a href="./back-office.html?productId=${image._id}">
                                    </div>
                                    <button
                                      type="button"
                                      class="btn btn-sm btn-outline-secondary ms-auto">
                                      Modify
                                    </button>
                                    </a>
                              </div>
                            </div>
                          </div>
                        </div>`;

const hideMe = (event) => {
  event.currentTarget.closest(".col").remove();
};

const goToDetails = (id) => {
  window.location.assign("./details.html?picId=" + id);
};

const auth =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU4NTZlY2MwMzRmZjAwMTQwM2Y0ZTgiLCJpYXQiOjE2OTI5NDgyMDQsImV4cCI6MTY5NDE1NzgwNH0.rbfPITP6-Szkp6rMe_E-UzPJHRC545XCznuOexMpSiw";
const URL = "https://striveschool-api.herokuapp.com/api/product/";

const loadImages = () => {
  const spinner = document.getElementById("spinner");
  spinner.classList.remove("d-none");

  fetch(URL, {
    method: "GET",
    headers: {
      Authorization: auth,
    },
  })
    .then((resp) => {
      if (!resp.ok) {
        throw new Error(`Error ${resp.status}: ${resp.statusText}.`);
      }
      return resp.json();
    })
    .then((products) => {
      const grid = document.getElementById("myGrid");
      grid.innerHTML = "";
      products.forEach((product) => {
        grid.innerHTML += drawCard(product);
      });
      spinner.classList.add("d-none");
    })
    .catch((err) => {
      const body = document.body;
      body.innerHTML = `<div class="container">
          <div>
          <h1 class="text-center" style="margin-top: 45vh"> ${err.message}</h1>
      </div>
      </div>
      `;
    });
};

window.addEventListener("DOMContentLoaded", loadImages());
