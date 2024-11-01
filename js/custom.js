// JavaScript to handle submenu toggle on mobile
document.addEventListener("DOMContentLoaded", function() {
    const menuItems = document.querySelectorAll('.s-header__nav .has-submenu');

    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Only toggle on mobile view
            if (window.innerWidth <= 768) {
                e.preventDefault(); // Prevent link default behavior
                item.classList.toggle('show-submenu');
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const readMoreLink = document.getElementById("read-more");
    const servicesSection = document.querySelector(".s-about__process");

    readMoreLink.addEventListener("click", function() {
        if (servicesSection.style.display === "flex") {
            servicesSection.style.display = "none";
        } else {
            servicesSection.style.display = "flex";
        }
    });
    
    const translate = document.getElementById("translate");
    const translatediv = document.querySelector(".trans");

    translate.addEventListener("click", function() {
        if (translatediv.style.display === "flex") {
            translatediv.style.display = "none";
        } else {
            translatediv.style.display = "flex";
        }
    });
});
