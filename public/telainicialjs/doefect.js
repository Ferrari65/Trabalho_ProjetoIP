const dots = document.querySelectorAll(".dot-nav-item");
const sections = document.querySelectorAll("[data-auto='flex-section']");

dots.forEach(dot => {
    dot.addEventListener("click", function(event) {
        event.preventDefault(); // Unterdrückt das Standardverhalten des Link-Klicks
        const section = document.querySelector(this.dataset.section);
        section.scrollIntoView({ behavior: "smooth" });
    });
});

window.addEventListener("scroll", function() {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight / 2)) {
            current = section.getAttribute("id");
        }
    });

    dots.forEach(dot => {
        dot.classList.remove("active");
        if (dot.getAttribute("data-section") === `#${current}`) {
            dot.classList.add("active");
        }
    });
});
(function () {
    "use strict";
  
    // Define os elementos da timeline
    var items = document.querySelectorAll(".timeline li");
  
    // Função para verificar se um elemento está visível na viewport
    function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }
  
    // Adiciona a classe quando o elemento está visível
    function callbackFunc() {
      for (var i = 0; i < items.length; i++) {
        if (isElementInViewport(items[i])) {
          items[i].classList.add("in-view");
        }
      }
    }
  
    // Escuta os eventos
    window.addEventListener("load", callbackFunc);
    window.addEventListener("resize", callbackFunc);
    window.addEventListener("scroll", callbackFunc);
  })();
  