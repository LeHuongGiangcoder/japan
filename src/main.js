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

// Fade out the entrance background so the Japan scene behind it becomes visible
tlEntrance.to("#entrance-scene .bg-img", {
  opacity: 0,
  ease: "power1.inOut"
}, 0);

// Japan Scene Animations
// When scrolling into Japan scene, slide components up naturally
const tlJapan = gsap.timeline({
  scrollTrigger: {
    trigger: "#japan-scene",
    start: "top bottom", // Starts when Japan scene enters viewport from bottom
    end: "center center",
    scrub: true
  }
});

// Select all components and give them a staggered slide-up effect
gsap.utils.toArray(".j-comp").forEach((comp, i) => {
  // Randomize initial Y offset slightly for a parallax feel
  const yOffset = 50 + (Math.random() * 100); 
  
  gsap.from(comp, {
    y: yOffset,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
      trigger: comp,
      start: "top 90%", // When component's top hits 90% of viewport
      end: "bottom center",
      scrub: true
    }
  });
});


