import gsap from "gsap";

let isAnimating = false;

export function animModeChange(toDark) {
  if (isAnimating) return; // block multiple clicks on switcher
  isAnimating = true;

  const body = document.body;

  // create clone
  const clone = body.cloneNode(true);

  // clone shows new mode
  if (toDark) clone.classList.add("dark");
  else clone.classList.remove("dark");

  clone.style.position = "fixed";
  clone.style.top = 0;
  clone.style.right = 0;
  clone.style.width = "100%";
  clone.style.height = "100%";
  clone.style.zIndex = 9999;
  clone.style.pointerEvents = "none";
  document.body.parentNode.appendChild(clone);

  // animation
  gsap.fromTo(
    clone,
    { clipPath: "circle(0% at 100% 0%)" },
    {
      clipPath: "circle(150% at 100% 0%)",
      duration: 0.7,
      ease: "power2.out",
      onComplete: () => {
        if (toDark) body.classList.add("dark");
        else body.classList.remove("dark");
        clone.remove();
        isAnimating = false; // unlock after animation finish
      },
    }
  );
}
