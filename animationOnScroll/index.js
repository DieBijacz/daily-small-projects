// TIMELINE 1
let tl = new TimelineMax({ onUpdate: updateProcentage });

// starting point for elements
// order of those elements here matters!
tl.from("#forest", 0.5, { y: -200, opacity: 0 }, "-.7");
tl.from("blockquote", 1, { x: 200, opacity: 0 });
tl.from("span", 1, { width: 0 }, "=-.5");
tl.from("#camera", 1, { x: -400, opacity: 0 }, "=-1");
// sets scroll function to be controller
const controller = new ScrollMagic.Controller();

// TIMELINE 2
let tl2 = new TimelineMax();
// few step animation
tl2.from("#box", 1, { x: -200, opacity: 0, sclae: 0 });
tl2.to("#box", 0.5, {
  left: "-20%",
  top: "-20%",
  scale: 1.3,
  border: "7px solid orange",
  boxShadow: "1px 1px 0px 0px rgba(0, 0, 0, 0.09)",
});
tl2.to("#box", 0.5, {
  left: "50%",
  top: "50%",
  scale: 0.3,
  border: "1px solid orange",
  boxShadow: "1px 1px 0px 0px rgba(0, 0, 0, 0.09)",
});

// SCENE 1
const scene = new ScrollMagic.Scene({
  // .sticky is a trigger element
  triggerElement: ".sticky",
  triggerHook: "onLeave",
  duration: "100%",
})
  // this will position fixed sticky container so animation can pin to it
  .setPin(".sticky")
  .setTween(tl)
  .addTo(controller);

// SCENE 2
const scene2 = new ScrollMagic.Scene({
  // when triggerElement comes into center of screen, scene starts
  triggerElement: "blockquote",
})
  .setTween(tl2)
  .addTo(controller);

function updateProcentage() {
  tl.progress();
  console.log(tl.progress());
}
