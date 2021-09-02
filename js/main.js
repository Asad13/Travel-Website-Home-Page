document.getElementById('navbar-toggler').addEventListener('click', function () {
    let x = document.getElementById('topnav');
    if (x.className === "nav") {
        x.className += " responsive-navbar";
    } else {
        x.className = "nav";
    }
});


/* ------------ Slider START ------------  */

let sliderContainer = document.getElementById('my-blogposts-slider-container');
let slider = document.getElementById('my-blogposts-slider');

let pressed = false;
let pressedforWheel = false;
let startX = 0;
let translated = 0;

/* ---------- Drag Sliding for computers(Dragging by mouse) START ---------- */
sliderContainer.addEventListener('mousedown', (e) => {
    sliderContainer.style.cursor = "grabbing";
    pressed = true;
    startX = e.pageX;
});

sliderContainer.addEventListener('mouseleave', () => {
    pressed = false;
    pressedforWheel = false;
});

sliderContainer.addEventListener('mouseup', () => {
    sliderContainer.style.cursor = "grab";
    pressed = false;
});

sliderContainer.addEventListener('mousemove', (e) => {
    if (pressed) {
        e.preventDefault();
        let x = e.pageX;
        translated += (x - startX);
        if (translated > 0) {
            translated = 0;
            slider.style.left = `${translated}px`;
            return;
        }
        let upperLimit = slider.offsetWidth - screen.availWidth + 200;
        if (Math.abs(translated) > upperLimit) {
            translated = -upperLimit;
            slider.style.left = `${translated}px`;
            return;
        }
        slider.style.left = `${translated}px`;
    }
});

/* ---------- Drag Sliding for computers(Dragging by mouse) END ---------- */

/* ---------- Drag Sliding for mobiles(Dragging by finger) START ---------- */

sliderContainer.addEventListener('touchstart', (e) => {
    pressed = true;
    startX = e.touches[0].clientX;
});

sliderContainer.addEventListener('touchend', () => {
    pressed = false;
});


sliderContainer.addEventListener('touchmove', (e) => {
    if (pressed) {
        // e.preventDefault();
        let x = e.touches[0].clientX;
        translated += (x - startX);

        if (translated > 0) {
            translated = 0;
            slider.style.left = `${translated}px`;
            return;
        }
        let upperLimit = slider.offsetWidth - screen.availWidth + 100;
        if (Math.abs(translated) > upperLimit) {
            translated = -upperLimit;
            slider.style.left = `${translated}px`;
            return;
        }
        slider.style.left = `${translated}px`;
    }
});

/* ---------- Drag Sliding for mobiles(Dragging by finger) END ---------- */

/* ---------- Prev Next Button Scrolling START ---------- */

let sliderPrevButton = document.getElementById('blogpost-prev');
let sliderNextButton = document.getElementById('blogpost-next');

let widthOfSinglePost = document.querySelector('.blogpost').offsetWidth;

sliderNextButton.addEventListener('click', function () {
    translated = translated - widthOfSinglePost;
    let upperLimit = slider.offsetWidth - screen.availWidth + ((screen.availWidth <= 576) ? 100 : 200);
    if (Math.abs(translated) > upperLimit) {
        translated = -upperLimit;
    }
    slider.style.left = `${translated}px`;
});


sliderPrevButton.addEventListener('click', function () {
    translated = translated + widthOfSinglePost;
    if (translated > 0) {
        translated = 0;
    }
    slider.style.left = `${translated}px`;
});
/* ---------- Prev Next Button Scrolling END ---------- */

/* ---------- Mouse wheel scrolling START ---------- */

sliderContainer.addEventListener('click', () => {
    pressedforWheel = true;
});

sliderContainer.addEventListener('wheel', (e) => {
    if (pressedforWheel) {
        e.preventDefault();
        console.log(e.deltaY);
        if (e.deltaY > 0) {
            translated = translated - 50;
            let upperLimit = slider.offsetWidth - screen.availWidth + ((screen.availWidth <= 576) ? 100 : 200);
            if (Math.abs(translated) > upperLimit) {
                translated = -upperLimit;
            }
            slider.style.left = `${translated}px`;
        } else {
            translated = translated + 50;
            if (translated > 0) {
                translated = 0;
            }
            slider.style.left = `${translated}px`;
        }
    }
});
/* ---------- Mouse wheel scrolling END ---------- */

/* ------------ Slider END ------------  */

/* ------------ Scroll Up START --------------- */
let scrollUpButton = document.querySelector('.scroll-up');
scrollUpButton.addEventListener('click', (e) => {
    let pos = e.pageY;
    let scrollUnit = parseInt((e.pageY / 400));
    let scroller = setInterval(function () {
        if (pos > 0) {
            scrollBy(0, -scrollUnit);
            pos -= scrollUnit;
        } else {
            clearInterval(scroller);
        }
    }, 1);
});

/* ------------ Scroll Up END --------------- */

/* ----- Initializing aos-master library -----*/
AOS.init();