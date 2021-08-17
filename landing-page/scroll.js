const faders = document.querySelectorAll(".fade-in");
const sliders = document.querySelectorAll(".slide-in");
const sliders2 = document.querySelectorAll(".slide-in2");

const appearOptions = {
    threshold: 0.5,
};

const appearOptions2 = {
    threshold: 1,
    rootMargin: "0px 0px -100px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            entry.target.classList.remove("appear");
            // return;
        }
        else {
            entry.target.classList.add("appear");
            // appearOnScroll.unobserve(entry.target);
        }
    })
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});

const appearOnScroll2 = new IntersectionObserver(function(entries, appearOnScroll2) {
    entries.forEach(entry => {
        if(!entry.isIntersecting) {
            entry.target.classList.remove("appear");
            // return;
        }
        else {
            entry.target.classList.add("appear");
            // appearOnScroll.unobserve(entry.target);
        }
    })
}, appearOptions2);

sliders2.forEach(slider => {
    appearOnScroll2.observe(slider);
});