import gsap from "gsap";

let clone = null;
let anim = null;

export function animModeChange(toDark, browserWidth) {
  const body = document.body;

  if (!clone) {
    clone = body.cloneNode(true);
    clone.style.position = "fixed";
    clone.style.top = 0;
    clone.style.right = 0;
    clone.style.width = "100%";
    clone.style.height = "100%";
    clone.style.zIndex = 9999;
    clone.style.pointerEvents = "none";
    document.body.parentNode.appendChild(clone);
  }

  if (browserWidth >= 768) {
    if (toDark) {
      clone.querySelector(".c-handler").style.transform =
        "translateX(20px) scale(0.6)";
      clone.classList.add("dark");
    } else {
      clone.querySelector(".c-handler").style.transform =
        "translateX(0) scale(0.6)";
      clone.classList.remove("dark");
    }
  } else {
    if (toDark) {
      clone.querySelector(".c-handler").style.transform =
        "translateX(12px) scale(0.6)";
      clone.classList.add("dark");
    } else {
      clone.querySelector(".c-handler").style.transform =
        "translateX(0) scale(0.6)";
      clone.classList.remove("dark");
    }
  }

  if (anim) anim.kill();

  anim = gsap.fromTo(
    clone,
    { clipPath: "circle(0% at 100% 0%)" },
    {
      clipPath: "circle(150% at 100% 0%)",
      duration: 1,
      ease: "power2.out",
      onComplete: () => {
        if (toDark) body.classList.add("dark");
        else body.classList.remove("dark");

        anim = null;
        clone.remove();
        clone = null;
      },
    }
  );
}
