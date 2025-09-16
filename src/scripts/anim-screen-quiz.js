import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

// transition between screens
export function animHideShowScreen(hideEl, showEl) {
  const animation = gsap.timeline();

  animation
    .to(hideEl, {
      opacity: 0,
      y: 30,
      duration: 0.3,
      onComplete: () => {
        hideEl.classList.add("is-removed");
        showEl.classList.remove("is-removed");
      },
    })
    .fromTo(
      showEl,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
      }
    );
}

// show header
export function animShowHeader() {
  const headerEl = document.getElementById("header");
  const icon = headerEl.querySelector(".c-icon_btn");

  gsap.set(headerEl, {
    opacity: 0,
  });

  const animation = gsap.timeline();

  animation
    .to(headerEl, {
      opacity: 1,
      delay: 0.3,
      duration: 0.5,
      onStart: () => {
        headerEl.classList.remove("is-hidden");
      },
    })
    .to(icon, { x: "+=50", duration: 0.25, ease: "sine.in" })
    .to(
      icon,
      {
        x: -50,
        duration: 0,
        immediateRender: false,
      },
      ">"
    )
    .to(icon, { x: 0, duration: 0.25, ease: "sine.out" }, ">");
}

// hide header
export function animHideHeader() {
  const headerEl = document.getElementById("header");
  const animation = gsap.timeline();

  gsap.set(headerEl, {
    opacity: 1,
  });

  animation.to(headerEl, {
    opacity: 0,
    duration: 0.3,
    onComplete: () => {
      headerEl.classList.add("is-hidden");
    },
  });
}
