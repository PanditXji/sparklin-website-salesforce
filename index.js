// code for testimonial slider
window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const image = document.getElementById("scrollImage");

  const scaleFactor = 120 + scrollPosition / 10;

  image.style.transform = `scale(${scaleFactor})`;
  image.style.width = full;
});

document.querySelectorAll(".slider").forEach((slider) => {
  slider.addEventListener("mouseover", () => {
    slider.style.animationPlayState = "paused";
  });
  slider.addEventListener("mouseout", () => {
    slider.style.animationPlayState = "running";
  });
});
// end testimonial slider code

// nav button animation

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

gsap.set(".null", { opacity: 1 });

const carouselContainer = document.querySelector(".carousel slide");
const casestudyDivs = Array.from(
  carouselContainer.querySelectorAll(".carousel-inner")
);
const navButtons = Array.from(
  carouselContainer.querySelectorAll(".nav-button")
);
let activeSlideIndex = 0;
let autoPlayTimer = null;
let isTabActive = true;

// Initialize the carousel by showing the first slide and animating its content
function initializeCarousel() {
  casestudyDivs.forEach((slide, i) => {
    if (i === activeSlideIndex) {
      slide.style.display = "block";
      gsap.set(slide, { x: "0%" }); // Set the initial position of the slide to 0%
      gsap.from(slide, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          animateText(); // Animate text after the initial slide animation
        },
      });
    } else {
      slide.style.display = "none";
    }
  });
}

function showSlide(index) {
  casestudyDivs.forEach((slide, i) => {
    if (i === index) {
      slide.style.display = "block";
      gsap.set(slide, { x: "0%" }); // Set the initial position of the slide to 0%
      gsap.from(slide, { opacity: 0, duration: 0.5, onComplete: animateText }); // Animate the slide opacity
    } else {
      slide.style.display = "none";
    }
  });
}

function animateText() {
  const activeSlide = casestudyDivs[activeSlideIndex];
  const elements = Array.from(activeSlide.querySelectorAll(".animate"));

  elements.forEach((element) => {
    gsap.set(element, { opacity: 0, y: 20, clearProps: "all" });
  });

  gsap.from(elements, { opacity: 0, y: 20, duration: 1 });
}

function navigateCarousel() {
  clearInterval(autoPlayTimer);
  autoPlayTimer = null;

  const previousSlideIndex = activeSlideIndex;
  activeSlideIndex = (activeSlideIndex + 1) % casestudyDivs.length;

  const previousSlide = casestudyDivs[previousSlideIndex];
  const currentSlide = casestudyDivs[activeSlideIndex];

  currentSlide.style.display = "block"; // Show the current slide
  animateText(); // Animate the content immediately
  // Animate the text to disappear immediately before changing the slide
  //   gsap.to(".animate", { opacity: 0, duration: 0.3 });
  gsap.fromTo(
    previousSlide,
    { x: "0%" },
    {
      x: "100%",
      duration: 0.3,
      onComplete: () => {
        previousSlide.style.display = "none";
      },
    }
  );
  gsap.fromTo(
    currentSlide,
    { x: "-100%" },
    {
      x: "0%",
      duration: 0.3,
      onComplete: () => {
        autoPlayTimer = setInterval(navigateCarousel, 10000);
      },
    }
  );
}

function handleVisibilityChange() {
  if (document.visibilityState === "visible") {
    isTabActive = true;
    if (!autoPlayTimer) {
      autoPlayTimer = setInterval(navigateCarousel, 10000);
    }
  } else {
    isTabActive = false;
    clearInterval(autoPlayTimer);
    autoPlayTimer = null;
  }
}

navButtons.forEach((navButton) => {
  navButton.addEventListener("click", navigateCarousel);
});

// Wait for the entire page to load (including images and other resources)
window.addEventListener("load", () => {
  // Add a delay of 3 seconds (3000 milliseconds) before starting the automatic carousel navigation
  setTimeout(() => {
    initializeCarousel();

    autoPlayTimer = setInterval(navigateCarousel, 10000);
  }, 700);
});

// text animation

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

gsap.set(".null", { opacity: 1 });
const visionSection = document.querySelector("#visionsection");
const images = Array.from(visionSection.querySelectorAll(".typeimages"));

gsap.registerPlugin(ScrollTrigger);

images.forEach((image, index) => {
  const delay = index * 0.2;
  gsap.set(image, { opacity: 0, y: 20 }); // Set y: -20 to start from below

  ScrollTrigger.create({
    trigger: ".splt",
    start: `0pxr+=${index * 300} 20%`,
    end: `0px+=${(index + 1) * 300} 21%`,
    toggleClass: "active",
    scrub: true,
    onEnter: () => {
      gsap.to(
        images.filter((img, idx) => idx < index),
        { opacity: 0, y: -20, duration: 0.5 }
      ); // Adjust y: 20 to animate upwards
      gsap.to(image, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    },
    onEnterBack: () => {
      gsap.to(
        images.filter((img, idx) => idx > index),
        { opacity: 0, y: -20, duration: 0.5 }
      ); // Adjust y: 20 to animate upwards
      gsap.to(image, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    },
    onLeaveBack: () => {
      gsap.to(image, { opacity: 0, y: 0, duration: 0.5 }); // Adjust y: 20 to animate upwards
    },
    onLeave: () => {
      gsap.set(image, { opacity: 1, y: 0 });
    },
  });
});

// Pin the vision section at the top of the viewport
ScrollTrigger.create({
  trigger: "#visionsection",
  start: "top top",
  end: "+=2000px",
  pin: true,
  pinSpacing: false,
});

// harry potter animation

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});
gsap.set(".null", { opacity: 1 });
const slider2 = document.querySelector(".another-slider");
const main = document.querySelector("main");
gsap.registerPlugin(ScrollTrigger);
gsap.to(slider2, {
  x: "-25%",
  scrollTrigger: {
    trigger: slider2,
    start: "top 100%",
    end: "bottom 10%",
    scrub: true,
    // markers: true,
  },
});

gsap.fromTo(
  ".blog-main-img",
  { opacity: 0, y: "-22vw", filter: "blur(30px)" },
  {
    opacity: 1,
    y: "0vw",
    filter: "blur(0px)",
    scrollTrigger: {
      trigger: ".blog-main-img",
      start: "top 50%",
      end: "10px",
      scrub: true,

      // markers: true,
    },
  }
);
gsap.from(".blog-logo-content *", {
  opacity: 0,
  y: 20,
  duration: 0.3,
  stagger: 0.2,
  scrollTrigger: {
    trigger: ".blog-logo-content",
    start: "top 100%",
    end: "+=300",
    scrub: true,
  },
});
gsap.fromTo(
  main,
  {
    width: "100%",
  },
  {
    width: "95%",
    borderRadius: "+=20px +=20px",
    scrollTrigger: {
      trigger: main,
      start: "bottom 100%",
      end: "bottom 20%",
      scrub: true,
    },
  }
);

// Select all elements with the .animate-me class
const animateElements = document.querySelectorAll(".animate-me");

// Loop through each element and apply the animation
animateElements.forEach((element) => {
  gsap.from(element, {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element, // Use the current element as the trigger
      start: "top 90%",
      end: "bottom 88%",
      scrub: true,
    },
  });
});

// video animation
gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

gsap.set(".null", { opacity: 1 });
gsap.registerPlugin(ScrollTrigger);

const tl = gsap
  .timeline({
    scrollTrigger: {
      trigger: ".video-section",
      scrub: true,
      pin: true,
      pinSpacing: true,
      // markers: true,
      start: "top 0%",
      end: "+50%",
    },
  })
  .to(".video-section picture", {
    scale: 1.7,
    ease: "none",
  });

const words = [
  "Innovation",
  "Bold",
  "Brave",
  "Crazy",
  "Curious",
  "Obsessive",
  "Misfits",
  "Rebels",
  "Dreamers",
  "Magical",
  "Moonshots",
  "Revolution",
  "Collaboration",
  "Velocity",
  "Emotion",
  "Empathy",
  "Growth",
  "Progress",
  "Future",
  "Humanity",
  "Evolution",
  "Experience",
  "Better",
  "Sparklin",
];

const loader = document.querySelector(".loader");
const loadingText = document.querySelector(".loading-text");

let currentIndex = 0;
let wordChangeInterval;

function changeWord() {
  loadingText.textContent = words[currentIndex];
  currentIndex = (currentIndex + 1) % words.length;
}

function startTextChangeAnimation() {
  wordChangeInterval = setInterval(changeWord, 100);
}

function stopTextChangeAnimation() {
  clearInterval(wordChangeInterval);
}

function startSlideUpAnimation() {
  gsap.to(".loader-wrapper", {
    y: "-100%",
    opacity: 0,
    scale: 0,
    // delay: 1,
    duration: 0.001,
    onComplete: () => {
      document.body.classList.add("loaded");
    },
  });
}

loadingText.textContent = "Sparklin";

document.addEventListener("DOMContentLoaded", () => {
  startTextChangeAnimation();
});

// Wait for the entire page to load (including images and other resources)
window.addEventListener("load", () => {
  stopTextChangeAnimation();
  loadingText.textContent = "Sparklin";
  startSlideUpAnimation();
});

// swipper js for card scroll
$(".owl-carousel").owlCarousel({
  loop: true,
  margin: 10,
  nav: true,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 3,
    },
  },
});