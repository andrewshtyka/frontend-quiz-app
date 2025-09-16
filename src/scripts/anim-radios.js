import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

// animate quiz radios
export function animRadios(event) {
  const btn = event.target;
  const rect = btn.querySelector("rect");
  const icon = btn.querySelector(".c-icon_area span");

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

// animate icon for selected radio
export function animRadioCheckIcon(el) {
  const icon = el.querySelector("[data-correct]");
  icon.classList.remove("is-hidden");

  gsap.fromTo(
    icon,
    {
      opacity: 0,
      x: 10,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.3,
      ease: "power1.out",
    }
  );
}

// animation for correct radio
export function animRadioStyleCorrect(label) {
  const rect = label.querySelector(".c-radio_border-correct rect");
  const square = label.querySelector(".c-icon_area");

  const animation = gsap.timeline();

  animation.set(rect, {
    drawSVG: `0 0`,
  });

  animation
    .fromTo(
      rect,
      { drawSVG: `0 0` },
      {
        duration: 0.5,
        drawSVG: `0 100%`,
        ease: "power1.inOut",
      }
    )
    .to(
      square,
      {
        backgroundColor: "var(--color-green-500)",
        color: "var(--color-white)",
        duration: 0.3,
      },
      "<"
    );
}

// animation for incorrect radio
export function animRadioStyleIncorrect(label) {
  const rect = label.querySelector(".c-radio_border-incorrect rect");
  const square = label.querySelector(".c-icon_area");

  const animation = gsap.timeline();

  animation.set(rect, {
    drawSVG: `0 0`,
  });

  animation
    .fromTo(
      rect,
      { drawSVG: `0 0` },
      {
        duration: 0.5,
        drawSVG: `0 100%`,
        ease: "power1.inOut",
      }
    )
    .to(
      square,
      {
        backgroundColor: "var(--color-orange-500)",
        color: "var(--color-white)",
        duration: 0.3,
      },
      "<"
    );
}

// reset correct radio styles
export function resetRadioStyleCorrect(label) {
  const rect = label.querySelector(".c-radio_border-correct rect");
  const square = label.querySelector(".c-icon_area");

  gsap.set(rect, { drawSVG: "0 0" });

  gsap.set(square, {
    backgroundColor: "var(--color-grey-50)",
    color: "var(--color-grey-500)",
  });
}

// reset incorrect radio styles
export function resetRadioStyleIncorrect(label) {
  const rect = label.querySelector(".c-radio_border-incorrect rect");
  const square = label.querySelector(".c-icon_area");

  gsap.set(rect, { drawSVG: "0 0" });

  gsap.set(square, {
    backgroundColor: "var(--color-grey-50)",
    color: "var(--color-grey-500)",
  });
}
