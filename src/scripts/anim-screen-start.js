import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

// ================================================================================
//
// ANIMATION ELEMENTS
const mainBG = document.querySelector("main");
const startHeading = document.querySelector("[data-anim-start-heading]");
const startParagraph = document.querySelector("[data-anim-start-p]");
const btnsStart = document.getElementById("btns-quiz").querySelectorAll("li");
const switcher = document.querySelector("[data-anim-switcher]");

// animate start screen
export function animStartScreen() {
  gsap.set(mainBG, {
    opacity: 0,
    pointerEvents: "none",
  });

  const animationTimeline = gsap.timeline({});

  let splitHeading = SplitText.create(startHeading, {
    type: "words",
    mask: "words",
    smartWrap: true,
  });
  let splitParagraph = SplitText.create(startParagraph, {
    type: "lines",
    mask: "lines",
    smartWrap: true,
  });

  animationTimeline
    .to(mainBG, {
      opacity: 1,
    })
    .from(
      splitHeading.words,
      {
        y: 100,
        autoAlpha: 0,
        stagger: 0.1,
        ease: "power1.out",
      },
      "<"
    )
    .from(
      splitParagraph.lines,
      {
        y: 100,
        autoAlpha: 0,
        stagger: 0.1,
        ease: "power1.out",
      },
      "< +0.4"
    )
    .from(
      btnsStart,
      {
        y: 50,
        autoAlpha: 0,
        stagger: 0.1,
      },
      "< +=0.1"
    )
    .from(
      switcher,
      {
        y: 20,
        opacity: 0,
        ease: "power1.Out",
      },
      "< +=0.5"
    )
    .add(() => {
      mainBG.style.pointerEvents = "auto";
    }, "< +=0.1");
}
