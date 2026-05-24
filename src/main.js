import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Responsive scale for scenes to prevent cropping
function resizeScenes() {
  const scale = Math.min(window.innerWidth / 1440, window.innerHeight / 1000);
  
  const japanContainer = document.querySelector('.japan-components');
  if (japanContainer) {
    japanContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
  
  const europeContainer = document.querySelector('.europe-components');
  if (europeContainer) {
    europeContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }
  
  const vietnamContainer = document.querySelector('.vietnam-components');
  if (vietnamContainer) {
    vietnamContainer.style.transform = `translate(-50%, -50%) scale(${scale})`;
  }

  // Pass scale to CSS so we can anchor elements to the true viewport edges
  document.documentElement.style.setProperty('--scale', scale);
}
window.addEventListener('resize', resizeScenes);
resizeScenes();

// Initial states for Japan, Europe and Vietnam components
gsap.set(".j-comp", { y: 300, opacity: 0 });
gsap.set(".e-comp", { y: 300, opacity: 0 });
gsap.set(".v-comp", { y: 300, opacity: 0 });

// Master Timeline pinned to the entire app container
const masterTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#app",
    start: "top top",
    end: "+=9000", // Increased scroll distance for smooth transitions across multiple scenes
    scrub: 1, // Add smoothing
    pin: true,
    anticipatePin: 1
  }
});

// Part 1: Entrance Arch zooms out and text fades (0 to 2 seconds on timeline)
masterTl.to(".arch-container", {
  scale: 15,
  transformOrigin: "50% 50%",
  ease: "power1.inOut",
  duration: 2
}, 0);

masterTl.to(".entrance-text", {
  opacity: 0,
  scale: 1.5,
  ease: "power1.inOut",
  duration: 2
}, 0);

// Part 2: Entrance Arch fades out completely (2 to 2.5 seconds)
masterTl.to(".entrance-wrapper", {
  opacity: 0,
  duration: 0.5
}, 2);

// Part 3: Japan scene components slide up (2.5 to 4.5 seconds)
masterTl.to(".j-comp", {
  y: 0,
  opacity: 1,
  duration: 2,
  stagger: 0.05, // Slight stagger for a beautiful cascading assembly
  ease: "power2.out"
}, 2.5);

// Part 4: Transition Japan out (4.5 to 5.5 seconds)
masterTl.to(".j-comp", {
  y: -300,
  opacity: 0,
  duration: 1,
  stagger: 0.02,
  ease: "power2.in"
}, 4.5);

// Part 5: Europe scene components slide up (5.5 to 7.5 seconds)
masterTl.to(".e-comp", {
  y: 0,
  opacity: 1,
  duration: 2,
  stagger: 0.05,
  ease: "power2.out"
}, 5.5);

// Part 6: Transition Europe out (7.5 to 8.5 seconds)
masterTl.to(".e-comp", {
  y: -300,
  opacity: 0,
  duration: 1,
  stagger: 0.02,
  ease: "power2.in"
}, 7.5);

// Part 7: Vietnam scene components slide up (8.5 to 10.5 seconds)
masterTl.to(".v-comp", {
  y: 0,
  opacity: 1,
  duration: 2,
  stagger: 0.05,
  ease: "power2.out"
}, 8.5);

// Add a buffer at the end so the scene holds on screen
masterTl.to({}, { duration: 1 });
