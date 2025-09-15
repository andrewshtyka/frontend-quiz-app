import gsap from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
gsap.registerPlugin(DrawSVGPlugin);

// animate start screen buttons
export function animStartButtons(event) {
  const btn = event.target;
  const rect = btn.querySelector("rect");
  const icon = btn.querySelector(".c-icon_btn");
  const length = rect.getTotalLength();

  if (!btn.animation) {
    btn.animation = gsap.timeline({ paused: true });

    btn.animation.set(rect, { drawSVG: `0 0` });

    btn.animation
      .fromTo(
        rect,
        { drawSVG: `0 0` },
        { duration: 0.51, drawSVG: `0 ${length + length * 0.1}`, ease: "power1.inOut" }
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
