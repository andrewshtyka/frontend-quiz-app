import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText, DrawSVGPlugin);

// animate start screen buttons
export function animStartButtons(event) {
  const btn = event.currentTarget;
  const rect = btn.querySelector(".c-button_border rect");
  const icon = btn.querySelector(".c-icon_btn");

  if (!btn.animation) {
    btn.animation = gsap.timeline({ paused: true });

    btn.animation.set(rect, { drawSVG: `0 0` });

    btn.animation
      .fromTo(
        rect,
        { drawSVG: `0 0` },
        {
          duration: 0.51,
          drawSVG: `0 110%`,
          ease: "power1.inOut",
        }
      )
      .to(icon, { x: "+=50", duration: 0.25, ease: "sine.in" }, 0)
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

  if (event.type === "mouseenter" || event.type === "focus") {
    btn.animation.play();
  } else if (event.type === "mouseleave" || event.type === "blur") {
    btn.animation.reverse();
  }
}

// show error under button
export function animErrorMessage(el) {
  el.classList.remove("is-hidden");

  gsap.fromTo(
    el,
    {
      y: 20,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.3,
    }
  );
}

// hide error under button
export function animErrorMessageHide(el) {
  gsap.fromTo(
    el,
    {
      y: 0,
      opacity: 1,
    },
    {
      y: 20,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        el.classList.add("is-hidden");
      },
    }
  );
}

// change text in button
export function animateButtonText(button, newText) {
  const textEl = button.querySelector(".c-btn_primary-text");

  const tl = gsap.timeline();

  tl.to(textEl, {
    opacity: 0,
    duration: 0.2,
    ease: "power1.in",
    onComplete: () => {
      textEl.textContent = newText;
    },
  }).to(textEl, {
    opacity: 1,
    duration: 0.2,
    ease: "power1.out",
  });
}
