gsap.registerPlugin(ScrollTrigger);

// 1. Анимация появления Hero
const tl = gsap.timeline();

tl.from(".header", { y: -50, opacity: 0, duration: 1, ease: "expo.out" })
    .from(".hero__title", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.5")
    .from(".hero__subtitle", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
    .from(".hero__actions", { y: 30, opacity: 0, duration: 1 }, "-=0.8")
    .from(".card-3d", { scale: 0.8, opacity: 0, rotationY: 45, duration: 1.5, ease: "back.out(1.2)" }, "-=1");

// 2. Левитация карты (постоянная анимация)
gsap.to(".card-3d", {
    y: -20,
    rotationX: 10,
    rotationY: -5,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut"
});

// 3. Параллакс для секции Showcase
gsap.to(".showcase__wrapper", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: ".showcase",
        start: "top bottom",
        end: "bottom top",
        scrub: true
    }
});

// 4. Появление элементов Bento Grid
gsap.from(".bento__item", {
    scrollTrigger: {
        trigger: ".bento",
        start: "top 80%"
    },
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// 5. Анимация счетчиков
const counters = document.querySelectorAll(".counter");
counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    const isDecimal = target % 1 !== 0;

    gsap.to(counter, {
        scrollTrigger: {
            trigger: ".stats",
            start: "top 85%"
        },
        innerHTML: target,
        duration: 2,
        ease: "power2.out",
        onUpdate: function () {
            let val = Number(this.targets()[0].innerHTML);
            counter.innerHTML = isDecimal ? val.toFixed(1) : Math.round(val);
        }
    });
});

// 6. Плавный скролл для навигации
document.querySelectorAll('.header__nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        gsap.to(window, { duration: 1, scrollTo: targetId, ease: "power3.inOut" });
    });
});