import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const container = document.querySelector(".gallery");

function createMurkup(arr) {
  return arr
    .map(
      ({ preview, original, description }) => `
  <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
    )
    .join("");
}
container.insertAdjacentHTML("beforeend", createMurkup(galleryItems));

container.addEventListener("click", handlerClick);
function handlerClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains("gallery__image")) {
    return;
  }
  const currentImage = evt.target.closest(".gallery__link");
  const source = currentImage.href;

  const instance = basicLightbox.create(
    `
        <img src="${source}" width="800" height="600">
    `,
    {
      onShow: (instance) => {
        container.addEventListener("keydown", handleKeyDown);
      },
      onClose: (instance) => {
        container.removeEventListener("keydown", handleKeyDown);
      },
    }
  );

  instance.show();

  function handleKeyDown(event) {
    if (event.key === "Escape") {
      instance.close();
    }
  }
}

// container.addEventListener("keydown", handleKeyDown);

// function closeModal() {
//   instance.close();
//   container.removeEventListener("keydown", handleKeyDown); // Видалення обробника подій
// }
