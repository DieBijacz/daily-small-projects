document.querySelector("#cta").addEventListener("click", function () {
  TweenMax.to(".panel", 2, {
    scaleY: 1,
    height: "100vh",
    // https://greensock.com/docs/v3/Eases
    ease: "bounce.out",
  });

  let tl = new TimelineMax();
  tl.to(".box", 5, {
    opacity: 1,
    scale: 1,
  });
  tl.to(".box", 5, {
    opacity: 0.2,
    scale: 0.2,
  });
});
