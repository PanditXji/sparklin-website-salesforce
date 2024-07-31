const testimonialContent = document.querySelectorAll(".change");
const testimonial = document.querySelector(".spark-learning");

let index = 0;

intervalId = setInterval(() => {
  const current = testimonialContent[index];
  const nextIndex = (index + 1) % testimonialContent.length;
  const next = testimonialContent[nextIndex];

  current.style.transition = "transform 1s"; // Enable transition for the move up animation
  current.style.transform = "translateY(-6vw)"; // Move up

  if (nextIndex === 1) {
    next.style.transition = "transform 1s"; // Enable transition for the move down animation
    next.style.transform = "translateY(0vw)"; // Move next item in from the top
  }

  setTimeout(() => {
    current.style.opacity = "0"; // Hide after moving up
    setTimeout(() => {
      current.classList.add("hidden"); // Hide after moving up
      current.style.transition = ""; // Reset transition property
      current.style.transform = ""; // Reset transform property
      testimonial.appendChild(current); // Append current element after the last element
      setTimeout(() => {
        next.classList.remove("hidden"); // Show next testimonial
        next.style.opacity = "1"; // Show next testimonial
      }, 50); // Delay before showing next testimonial
    }, 500); // Delay before hiding current testimonial
  }, 1000); // Delay before moving up

  index = nextIndex; // Update index for next iteration
}, 3000); // Interval for carousel movement

testimonial.addEventListener("mouseenter", startCarousel);
testimonial.addEventListener("mouseleave", stopCarousel);

const carousel = document.querySelector(".spark-learning");
const slides = document.querySelectorAll(".change");
const slideHeight = slides[0].clientHeight;
let currentSlide = 0;

function moveSlides() {
  currentSlide = (currentSlide + 1) % slides.length;
  const topValue = -1 * currentSlide * slideHeight;
  carousel.style.top = `${topValue}px`;
}

setInterval(moveSlides, 3000); // Change slides every 3 seconds

if (history.pushState) {
  var newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;
  window.history.pushState({ path: newurl }, "", newurl);
}

document.addEventListener("DOMContentLoaded", function () {
  const followLinks = document.querySelectorAll(".follow-link");

  followLinks.forEach((followLink) => {
    const caption = document.createElement("div");
    caption.classList.add("follow-caption");
    followLink.parentNode.appendChild(caption);

    followLink.addEventListener("mousemove", function (e) {
      const captionText = followLink.getAttribute("data-caption");
      caption.textContent = captionText;

      const linkRect = followLink.getBoundingClientRect();
      const x = e.clientX - linkRect.left + window.scrollX;
      const y = e.clientY - linkRect.top;
      caption.style.transform = `translate(${x}px, ${y}px)`;
    });
    followLink.addEventListener("mouseenter", function () {
      caption.style.opacity = "1";
      caption.style.transform = "100px";
    });

    followLink.addEventListener("mouseleave", function () {
      caption.style.opacity = "0";
      // caption.style.transform = "";
    });
  });
});

$(document).ready(function () {
  // Add smooth scrolling to all links
  $("a").on("click", function (event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top,
        },
        800,
        function () {
          // Add hash (#) to URL when done scrolling (default click behavior)
          window.location.hash = hash;
        }
      );
    } // End if
  });
});

window.onunload = function () {
  window.scrollTo(0, 0);
};

function InfiniteSlider(animTime, selector, container) {
  this.slider = document.querySelector(selector);
  this.container = document.querySelector(container);
  this.width = 0;
  this.oldWidth = 0;
  this.duration = parseInt(animTime);
  this.start = 0;
  this.refresh = 0; // 0, 1, or 2, as in steps of the animation
  this._prevStop = false;
  this._stop = false;
  this._oldTimestamp = 0;
}

InfiniteSlider.prototype.animate = function () {
  /* fix for browsers who like to run JS before images are loaded */
  var imgs = Array.prototype.slice
    .call(this.slider.querySelectorAll("img"))
    .filter(function (img) {
      return img.naturalWidth === 0;
    });
  if (imgs.length > 0) {
    window.requestAnimationFrame(this.animate.bind(this));
    return;
  }

  /* Add another copy of the slideshow to the end, keep track of original width */
  this.oldWidth = this.slider.offsetWidth;
  var sliderText =
    '<span class="slider-extra">' + this.slider.innerHTML + "</span>";
  this.slider.innerHTML += sliderText;

  /* can have content still when we move past original slider */
  this.width = this.slider.offsetWidth;
  var minWidth = 2 * screen.width;

  /* Add more slideshows if needed to keep a continuous stream of content */
  while (this.width < minWidth) {
    this.slider.innerHTML += sliderText;
    this.width = this.slider.width;
  }
  this.slider
    .querySelector(".slider-extra:last-child")
    .classList.add("slider-last");

  /* loop animation endlessly (this is pretty cool) */
  window.requestAnimationFrame(this.controlAnimation.bind(this));
};

InfiniteSlider.prototype.halt = function () {
  this._stop = true;
  this._prevStop = false;
};

InfiniteSlider.prototype.go = function () {
  this._stop = false;
  this._prevStop = true;
};

InfiniteSlider.prototype.stagnate = function () {
  this.container.style.overflowX = "scroll";
};

InfiniteSlider.prototype.controlAnimation = function (timestamp) {
  if (this._stop === true) {
    if (this._prevStop === false) {
      this.slider.style.marginLeft = getComputedStyle(this.slider).marginLeft;
      this._prevStop = true;
      this._oldTimestamp = timestamp;
    }
  } else if (this._stop === false && this._prevStop === true) {
    this._prevStop = false;
    this.start = this.start + (timestamp - this._oldTimestamp);
  } else {
    //reset animation
    if (this.refresh >= 1) {
      this.start = timestamp;
      this.slider.style.marginLeft = 0;
      this.refresh = 0;
      window.requestAnimationFrame(this.controlAnimation.bind(this));
      return;
    }
    if (timestamp - this.start >= this.duration) {
      this.refresh = 1;
    }

    var perc = ((timestamp - this.start) / this.duration) * this.oldWidth;
    this.slider.style.marginLeft = -perc + "px";
  }
  window.requestAnimationFrame(this.controlAnimation.bind(this));
  return;
};

document.addEventListener("DOMContentLoaded", function () {
  var slider = new InfiniteSlider("50000", ".slider", "#slider-container");
  slider.animate();
});

document.querySelector("video").play();

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);
lenis.on("scroll", (e) => {
  console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

gsap.registerPlugin(ScrollTrigger);

const splitTypes = document.querySelectorAll(".reveal-type");

splitTypes.forEach((word, i) => {
  const bg = word.dataset.bgColor;
  const fg = word.dataset.fgColor;

  const text = new SplitType(word, { types: "words" });

  gsap.fromTo(
    text.words,
    {
      color: bg,
    },
    {
      color: (index, target) => {
        const isSpan = target.parentElement.tagName === "SPAN";
        return isSpan ? target.parentElement.dataset.fgColor : fg;
      },
      duration: 0.2,
      stagger: 0.2,
      scrollTrigger: {
        trigger: word,
        start: "top 80%",
        end: "top 20%",
        scrub: true,
        markers: false,
        toggleActions: "play play reverse reverse",
      },
    }
  );
});

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
  startTextChangeAnimation(); // Start the word change animation
});

// Wait for the entire page to load (including images and other resources)
window.addEventListener("load", () => {
  stopTextChangeAnimation(); // Stop the word change animation once the entire page is loaded
  loadingText.textContent = "Sparklin"; // Ensure "Sparklin" is displayed as the final word
  startSlideUpAnimation(); // Start the slide-up animation once the entire page is loaded
});

const myDiv = document.querySelector(".casestudy-card");
gsap.registerPlugin(ScrollTrigger);

gsap.fromTo(
  ".check-svg",
  {
    y: 0,
    opacity: 0,
  },
  {
    y: 0,
    opacity: 1,
    duration: 0.5,
    scrollTrigger: {
      trigger: ".splt",
      start: "top 20%",
      end: "top 20%",
      // scrub: true,
      // markers: true,
      toggleActions: "play  reverse",
    },
  }
);

let sections = gsap.utils.toArray(".client-card");
gsap.registerPlugin(ScrollTrigger);

// Define the scrollTween
const scrollTween = gsap.timeline({
  defaults: {
    // Setting default values for your scrollTween
    // ease: 'linear',
    scrollTrigger: {
      trigger: ".case-section .container-fluid",
      start: "top 0%",
      end: "bottom 20%",
      scrub: 1,
      pin: true,
      pinSpacing: true,
      invalidateOnRefresh: true,
    },
  },
});

// Loop through each container
const $containers = $(".case-section .container-fluid");
$containers.each(function (index, item) {
  const $container = $(item);
  const $items = $container.find(".casestudy-card");

  const getMaxWidthHeight = function () {
    maxWidth = $items.width();
    maxHeight = $items.height();
  };
  getMaxWidthHeight();

  ScrollTrigger.addEventListener("refreshInit", getMaxWidthHeight);

  $items.each(function () {
    gsap.fromTo(
      $(this),
      { x: "30%" }, // Start position (30% to the right)
      {
        x: "-50%", // End position (original position)
        scrollTrigger: {
          trigger: $container,
          start: "top 0%",
          end: function () {
            return "+=" + maxWidth;
          },
          scrub: 1,
          invalidateOnRefresh: true,
          pin: true,
        },
      }
    );
  });
});

// Animate background color of .case-section
gsap.to(".case-section", {
  backgroundColor: "#09090B",
  scrollTrigger: {
    trigger: ".casestudy-card",
    start: "top 0%",
    end: "center 1%",
    animation: scrollTween,
    scrub: true,
    // markers: true,
    toggleActions: "play play reverse reverse",

    // horizontal: true,
    // toggleActions: "play none none reset",
    // id: "1",
  },
});

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

gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

gsap.set(".null", { opacity: 1 });

const carouselContainer = document.querySelector(".casestudy-carousel");
const casestudyDivs = Array.from(
  carouselContainer.querySelectorAll(".casestudy-div")
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
gsap.config({
  nullTargetWarn: false,
  trialWarn: false,
});

gsap.set(".null", { opacity: 1 });
const mainSection = document.querySelector(".main");

gsap.to("body", {
  backgroundColor: "#E8E8E9",
  scrollTrigger: {
    trigger: mainSection,
    start: "center center",
    end: "center center",
    scrub: true,
  },
});

var prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("header").style.top = "-3.4765625vw";
  } else {
    document.getElementById("header").style.top = "-8.984375vw";
  }
  prevScrollpos = currentScrollPos;
};

document.body.classList.add("no-scroll");

window.addEventListener("load", () => {
  var tl = gsap.timeline();

  tl.to(".page-transition h1", {
    opacity: 1,
  });

  tl.to(".page-transition h1", {
    top: "calc(0% - -6.2vw)",
    scale: 0.125,
    duration: 0.4,
    //  delay: 0.5,
  });
  tl.fromTo(
    "header",
    {
      y: "-100%",
    },
    {
      y: 0,
      zIndex: 99999999,
      duration: 0.4,
    },
    "-=1"
  );

  tl.to(".page-transition h1", {
    // x:'-50vw',
    left: "calc(0% - -13vw)",
    duration: 1,
    opacity: 0,
    zIndex: 999999999,
    // delay: 0.2,
  });
  tl.fromTo(
    ".logo",
    {
      opacity: 0,
    },
    {
      opacity: 1,
    },
    "-=0.5"
  );
  tl.fromTo(
    ".casestudy-section",
    {
      x: "-100%",
    },
    {
      x: 0,
      duration: 0.8,
      delay: 2,
      onComplete: function () {
        // Re-enable scrolling by removing 'no-scroll' class
        document.body.classList.remove("no-scroll");
      },
    },
    "-=3"
  );
});

// Get the container and the div with class "defiy-div"
var container = document.getElementById("lang-div");
var defiyDiv = container.querySelector(".lang-slide");

// Clone the content and append it to the container
for (var i = 0; i < 5; i++) {
  var newDiv = defiyDiv.cloneNode(true);
  container.appendChild(newDiv);
}

function AnotherInfiniteSlider(animTime, selector, container) {
  this.slider = document.querySelector(selector);
  this.container = document.querySelector(container);
  this.duration = parseInt(animTime);
  this.start = 0;
  this._stop = false;
  this._oldTimestamp = 0;
  this.translateX = 0; // Track the translation amount
  this.slideWidth = this.slider.querySelector(".slide").offsetWidth;
  this.numSlides = this.slider.querySelectorAll(".slide").length;
  this.containerWidth = this.slideWidth * this.numSlides; // Total width of slider content
  this.slider.style.width = this.containerWidth + "px";

  // Initialize the slider
  this.anotherAnimate();
}

AnotherInfiniteSlider.prototype.anotherAnimate = function () {
  /* loop animation endlessly */
  window.requestAnimationFrame(this.anotherControlAnimation.bind(this));
};

AnotherInfiniteSlider.prototype.anotherHalt = function () {
  this._stop = true;
};

AnotherInfiniteSlider.prototype.anotherGo = function () {
  this._stop = false;
};

AnotherInfiniteSlider.prototype.anotherStagnate = function () {
  this.container.style.overflowX = "hidden"; // Hide horizontal scrollbar
};

AnotherInfiniteSlider.prototype.anotherControlAnimation = function (timestamp) {
  if (this._stop) {
    this._oldTimestamp = timestamp;
    return;
  }

  if (!this._oldTimestamp) {
    this._oldTimestamp = timestamp;
  }

  const elapsedTime = timestamp - this._oldTimestamp;
  this.translateX -= (elapsedTime / this.duration) * this.slideWidth;

  // Check if we need to reset the translation position
  if (Math.abs(this.translateX) >= this.containerWidth) {
    this.translateX += this.containerWidth;
  }

  // Apply the translation using CSS transform
  this.slider.style.transform = `translateX(${this.translateX}px)`;

  // Loop the animation smoothly
  if (this.translateX <= -this.slideWidth) {
    this.translateX += this.slideWidth;
    this.slider.style.transition = "none";
    this.slider.style.transform = `translateX(${this.translateX}px)`;
    void this.slider.offsetWidth; // Force reflow to apply 'none' transition
    this.slider.style.transition = "";
  }

  this._oldTimestamp = timestamp;
  window.requestAnimationFrame(this.anotherControlAnimation.bind(this));
};

document.addEventListener("DOMContentLoaded", function () {
  var anotherSlider = new AnotherInfiniteSlider(
    "100000",
    ".another-slider",
    "#another-slider-container"
  );
});

// for hamburger icon click

// const hamburgerMenu = document.querySelector(".hamburger-menu");
// const navExpand = document.querySelectorAll(".nav-links-expand");
// const navLinks = document.querySelectorAll(".nav-links");
// hamburgerMenu.addEventListener("click", function () {
//     hamburgerMenu.classList.toggle("cross");

//     const time1 = navLinks[0].classList.contains("bottom") ? 600 : 0;
//     const time2 = navLinks[0].classList.contains("bottom") ? 300 : 300;
//     const time3 = navLinks[0].classList.contains("bottom") ? 0 : 600;
//     navLinks.forEach(nav => {
//         setTimeout(() => {
//             nav.classList.toggle("expand");
//         }, time1);
//         setTimeout(() => {
//             nav.classList.toggle("full-width")
//         }, time2);
//         setTimeout(() => {
//             // nav.classList.toggle("full-width")
//             nav.classList.toggle("bottom");
//         } , time3)
//     })
// });
// const hamburgerMenu = document.querySelector(".hamburger-menu");
// const navExpand = document.querySelectorAll(".nav-links-expand");
// const navLinks = document.querySelector(".nav-links");
// const head = document.querySelector(".head");

// let isExpanded = false;

// hamburgerMenu.addEventListener("click", function () {
//     hamburgerMenu.classList.toggle("cross");
//     if (!isExpanded) {
//         expandNav();
//     } else {
//         collapseNav();
//     }
// });

// function expandNav() {
//     gsap.to(navExpand, { width: "178px", duration: 0.3 });
//     // gsap.to(navLinks, { height: "234px", duration: 0.3, ease: "Elastic.easeOut(1)"  });
//     gsap.to(navExpand, { opacity: 1, duration: 0.3, delay: 0.7 }); // Fade in after the height animation
//     setTimeout(() => {
//         head.classList.add("expand");
//     head.classList.remove("collapse");
//     } , 500)
//     isExpanded = true;
// }

// function collapseNav() {
//     gsap.to(navExpand, { opacity: 0, duration: 0.1 });
//     // gsap.to(navLinks, { height: "16px", duration: 0.3, ease: "Elastic.easeOut(1)"  });
//     gsap.to(navExpand, { width: "0", duration: 0.3, delay: 0.5 }); // Shrink width after the height animation
//     setTimeout(() => {
//         head.classList.remove("expand");
//     head.classList.add("collapse");
//     }, 200);
//     isExpanded = false;
// }

gsap.fromTo(
  "footer",
  {
    height: "91vh",
  },
  {
    height: "100vh",

    scrollTrigger: {
      trigger: main,
      start: "bottom 100%",
      end: "bottom 20%",
      scrub: true,
    },
  }
);
