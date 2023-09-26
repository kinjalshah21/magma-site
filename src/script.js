function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
loco();

var clutter = "";

document
  .querySelector(".page-2>h1")
  .textContent.split(" ")
  .forEach(function (dets) {
    clutter += `<span> ${dets} </span>`;

    document.querySelector(".page-2>h1").innerHTML = clutter;
  });

gsap.to(".page-2>h1>span", {
  color: "white",
  duration: 1,
  scrollTrigger: {
    scroller: ".main",
    trigger: ".page-2>h1>span",
    start: "top bottom",
    end: "bottom 40%",
    scrub: 0.5,
  },
  stagger: 0.2,
});
function canvas() {
  const canvas = document.querySelector(".page-3>canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = ` 
  assets/frames/frames00007.png
  assets/frames/frames00010.png
  assets/frames/frames00013.png
  assets/frames/frames00016.png
  assets/frames/frames00019.png
  assets/frames/frames00022.png
  assets/frames/frames00025.png
  assets/frames/frames00028.png
  assets/frames/frames00031.png
  assets/frames/frames00034.png
  assets/frames/frames00037.png
  assets/frames/frames00040.png
  assets/frames/frames00043.png
  assets/frames/frames00046.png
  assets/frames/frames00049.png
  assets/frames/frames00052.png
  assets/frames/frames00055.png
  assets/frames/frames00058.png
  assets/frames/frames00061.png
  assets/frames/frames00064.png
  assets/frames/frames00067.png
  assets/frames/frames00070.png
  assets/frames/frames00073.png
  assets/frames/frames00076.png
  assets/frames/frames00079.png
  assets/frames/frames00082.png
  assets/frames/frames00085.png
  assets/frames/frames00088.png
  assets/frames/frames00091.png
  assets/frames/frames00094.png
  assets/frames/frames00097.png
  assets/frames/frames00100.png
  assets/frames/frames00103.png
  assets/frames/frames00106.png
  assets/frames/frames00109.png
  assets/frames/frames00112.png
  assets/frames/frames00115.png
  assets/frames/frames00118.png
  assets/frames/frames00121.png
  assets/frames/frames00124.png
  assets/frames/frames00127.png
  assets/frames/frames00130.png
  assets/frames/frames00133.png
  assets/frames/frames00136.png
  assets/frames/frames00139.png
  assets/frames/frames00142.png
  assets/frames/frames00145.png
  assets/frames/frames00148.png
  assets/frames/frames00151.png
  assets/frames/frames00154.png
  assets/frames/frames00157.png
  assets/frames/frames00160.png
  assets/frames/frames00163.png
  assets/frames/frames00166.png
  assets/frames/frames00169.png
  assets/frames/frames00172.png
  assets/frames/frames00175.png
  assets/frames/frames00178.png
  assets/frames/frames00181.png
  assets/frames/frames00184.png
  assets/frames/frames00187.png
  assets/frames/frames00190.png
  assets/frames/frames00193.png
  assets/frames/frames00196.png
  assets/frames/frames00199.png
  assets/frames/frames00202.png
 `;
    return data.split("\n")[index];
  }

  const frameCount = 67;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.5,
      trigger: `.page-3`,
      start: `top top`,
      end: `250% top`,
      scroller: `.main`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: ".page-3",
    pin: true,
    scroller: `.main`,
    start: `top top`,
    end: `250% top`,
  });
}
canvas();
