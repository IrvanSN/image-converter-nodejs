let file_upload = document.getElementById("file_upload");
let chosen_image = document.getElementById("chosen-image");
let file_name = document.getElementById("file-name");
let container = document.querySelector(".drag-container");
let error = document.getElementById("error");
let image_display = document.getElementById("image-display");

const fileHandler = (file, name, type) => {
  if (type.split("/")[0] !== "image") {
    error.innerText = "Please upload an image file";
    return false;
  }
  error.innerText = "";
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    let image_container = document.createElement("figure");
    let img = document.createElement("img");
    img.src = reader.result;
    image_container.appendChild(img);
    image_container.innerHTML += `<figcaption>${name}</figcaption>`;
    image_display.appendChild(image_container);
    container.classList.add("active");
  };
};

//Upload Button
file_upload.addEventListener("change", () => {
  image_display.innerHTML = "";
  Array.from(file_upload.files).forEach((file) => {
    fileHandler(file, file.name, file.type);
  });
});

container.addEventListener(
  "dragenter",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);

container.addEventListener(
  "dragleave",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
  },
  false
);

container.addEventListener(
  "dragover",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.add("active");
  },
  false
);

container.addEventListener(
  "drop",
  (e) => {
    e.preventDefault();
    e.stopPropagation();
    container.classList.remove("active");
    let draggedData = e.dataTransfer;
    let files = draggedData.files;
    image_display.innerHTML = "";
    Array.from(files).forEach((file) => {
      fileHandler(file, file.name, file.type);
    });
  },
  false
);

window.onload = () => {
  error.innerText = "";
};
