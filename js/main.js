const carousel = document.querySelector(".carousel-inner");
let items = Array.from(document.querySelectorAll(".carousel-item"));

// Function to update item-class
function update() {
  items.forEach((el) => {
    el.classList.remove("bounce");
    el.classList.remove("item-1");
    el.classList.remove("item-2");
    el.classList.remove("item-3");
    el.classList.remove("item-4");
    el.classList.remove("item-5");
  });

  items.forEach((el, i) => {
    el.classList.add(`item-${i + 1}`); 
  });
}

// Function to rearrange items based on direction
function directCarousel(direction) {
  if (direction === "up") {
    items.push(items.shift());
  } else if (direction === "down") {
    items.unshift(items.pop());
  }

  update(); // Updating the classes after rearranging
}

// animation class
function addAnimation() {
  carousel.classList.add("animate");

  setTimeout(() => {
    carousel.classList.remove("animate");
    items.forEach(el => {
      el.classList.add("bounce") //  To provide bounce effect to each item
    })

  }, 200);
}

// Mouse event handlers
let startY = 0;
let isDragging = false;

function startDrag(e) {
  isDragging = true;
  startY = e.clientY;
}

function drag(e) {
  if (!isDragging) return;

  const currentY = e.clientY;
  const deltaY = currentY - startY;

  // Checking drag direction and adding animation
  if (deltaY < -10) {
    directCarousel("up");
    addAnimation(); 
    isDragging = false; 
  } else if (deltaY > 10) {
    directCarousel("down");
    addAnimation(); 
    isDragging = false; 
  }
}

function endDrag() {
  isDragging = false;
}

// Event listeners
carousel.addEventListener("mousedown", startDrag);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup", endDrag);
carousel.addEventListener("mouseleave", endDrag);
