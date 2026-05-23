import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Responsive scale for Japan components to prevent cropping
function resizeJapan() {
  const container = document.querySelector('.japan-components');
  // Scale to fit the smallest dimension to ensure nothing is ever cropped
  const scale = Math.min(window.innerWidth / 1440, window.innerHeight / 900);
  container.style.transform = `translate(-50%, -50%) scale(${scale})`;
  
  // Pass scale to CSS so we can anchor elements to the true viewport edges
  document.documentElement.style.setProperty('--scale', scale);
}
window.addEventListener('resize', resizeJapan);
resizeJapan();

// Initial states for Japan components
gsap.set(".j-comp", { y: 300, opacity: 0 });

// Master Timeline pinned to the entire app container
const masterTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#app",
    start: "top top",
    end: "+=4000", // Large scroll distance for smooth transitions
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

// Add a buffer at the end so the scene holds on screen
masterTl.to({}, { duration: 1 });


