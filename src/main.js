import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// GSAP Timeline for Entrance Zoom Out Effect
// We pin the entrance scene, scale up the arch container massively so we "zoom through" it
// and fade out the text.

const tlEntrance = gsap.timeline({
  scrollTrigger: {
    trigger: "#entrance-scene",
    start: "top top",
    end: "+=200%", // Increased scroll distance for smoother effect
    scrub: true,
    pin: true,
    anticipatePin: 1
  }
});

// Scale the arch massively to simulate walking through it
tlEntrance.to(".arch-container", {
  scale: 15,
  transformOrigin: "50% 50%",
  ease: "power1.inOut"
}, 0);

// Fade out the text as we zoom in
tlEntrance.to(".entrance-text", {
  opacity: 0,
  scale: 1.5,
  ease: "power1.inOut"
}, 0);

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

// Japan Scene Animations
// We trigger the animation based on the whole scene entering the viewport
const tlJapan = gsap.timeline({
  scrollTrigger: {
    trigger: "#japan-scene",
    start: "top 80%", // Start sliding up when scene is 20% into the screen
    end: "top 20%",   // Finish sliding up when it reaches near the top
    scrub: true
  }
});

// Select all components and slide them up together
gsap.utils.toArray(".j-comp").forEach((comp) => {
  // Randomize initial Y offset slightly for a parallax feel (sliding up from below)
  const yOffset = 150 + (Math.random() * 200); 
  
  tlJapan.from(comp, {
    y: yOffset,
    opacity: 0,
    ease: "power1.out"
  }, 0); // The '0' ensures all components animate at the exact same time on the timeline
});


