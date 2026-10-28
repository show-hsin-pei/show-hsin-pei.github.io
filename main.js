(function () {
  var header = document.querySelector(".top");
  var onScroll = function () {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 8);
  };
  onScroll();
  document.addEventListener("scroll", onScroll, { passive: true });

  var nodes = document.querySelectorAll(".reveal");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) {
    nodes.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    nodes.forEach(function (el) { io.observe(el); });
  }

  var fab = document.querySelector(".line-fab");
  var contact = document.querySelector("#contact");
  var cta = document.querySelector(".cta");
  if (fab && "IntersectionObserver" in window) {
    var ctaIn = true;
    var contactIn = false;
    var syncFab = function () {
      fab.classList.toggle("is-hidden", ctaIn || contactIn);
    };
    var watch = function (el, set) {
      if (!el) return;
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { set(entry.isIntersecting); });
        syncFab();
      }, { threshold: 0.35 }).observe(el);
    };
    watch(cta, function (v) { ctaIn = v; });
    watch(contact, function (v) { contactIn = v; });
    syncFab();
  }
})();
