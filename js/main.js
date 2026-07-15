/*=========================================
        MOBILE MENU TOGGLE
=========================================*/

const headerActions = document.querySelector(".header-actions");

const menuToggle = document.querySelector(".menu-toggle");

const navMenu = document.querySelector(".nav-menu");

const themeToggle = document.querySelector("[data-theme-toggle]");

const rtlToggle = document.querySelector("[data-rtl-toggle]");

const loginButton = document.querySelector(".header-actions .primary-btn");

const mobileActions = document.createElement("div");

mobileActions.className = "mobile-header-actions";

let mobileActionsInserted = false;

function syncMobileHeaderActions() {

    if (window.innerWidth <= 1023) {

        if (!mobileActionsInserted) {

            mobileActions.appendChild(themeToggle);
            mobileActions.appendChild(rtlToggle);
            mobileActions.appendChild(loginButton);

            navMenu.appendChild(mobileActions);;

            mobileActionsInserted = true;

        }

    } else if (mobileActionsInserted) {

        headerActions.insertBefore(themeToggle, menuToggle);
        headerActions.insertBefore(rtlToggle, menuToggle);
        headerActions.insertBefore(loginButton, menuToggle);

        mobileActions.remove();

        mobileActionsInserted = false;

    }

}

if (headerActions && menuToggle && navMenu && themeToggle && rtlToggle && loginButton) {

    syncMobileHeaderActions();

    window.addEventListener("resize", syncMobileHeaderActions);

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

        menuToggle.querySelector("i").classList.toggle("fa-bars");

        menuToggle.querySelector("i").classList.toggle("fa-xmark");

    });

}

/*=========================================
        MOBILE DROPDOWN
=========================================*/

const dropdownButtons = document.querySelectorAll(".dropdown-toggle");

dropdownButtons.forEach(button => {

    button.addEventListener("click", function (e) {

        if (window.innerWidth <= 1023) {

            e.preventDefault();

            this.parentElement.classList.toggle("active");

        }

    });

});

/*=========================================
        CLOSE MENU AFTER CLICK
=========================================*/

if (navMenu && menuToggle) {

    const navLinks = document.querySelectorAll(".nav-menu a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (window.innerWidth <= 1023) {

                navMenu.classList.remove("active");

                menuToggle.querySelector("i").classList.remove("fa-xmark");

                menuToggle.querySelector("i").classList.add("fa-bars");

            }

        });

    });

}
/*=========================================
        WINDOW RESIZE
=========================================*/

window.addEventListener("resize", () => {

    if (navMenu && menuToggle && window.innerWidth > 1023) {

        navMenu.classList.remove("active");

        menuToggle.querySelector("i").classList.remove("fa-xmark");

        menuToggle.querySelector("i").classList.add("fa-bars");

    }

});

/*=========================================
        THEME + RTL (ALL PAGES)
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const themeButtons = document.querySelectorAll("[data-theme-toggle]");
    const rtlButtons = document.querySelectorAll("[data-rtl-toggle]");

    /*==============================
            APPLY SAVED THEME
    ==============================*/

    const savedTheme = localStorage.getItem("theme") || "light";

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }

    themeButtons.forEach(btn => {

        btn.innerHTML = savedTheme === "dark"
            ? '<i class="fa-solid fa-sun"></i>'
            : '<i class="fa-solid fa-moon"></i>';

        btn.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const dark = document.body.classList.contains("dark-mode");

            localStorage.setItem("theme", dark ? "dark" : "light");

            themeButtons.forEach(button => {

                button.innerHTML = dark
                    ? '<i class="fa-solid fa-sun"></i>'
                    : '<i class="fa-solid fa-moon"></i>';

            });

        });

    });

    /*==============================
            APPLY SAVED RTL
    ==============================*/

    const savedDir = localStorage.getItem("direction") || "ltr";

    document.documentElement.setAttribute("dir", savedDir);

    rtlButtons.forEach(btn => {

        btn.addEventListener("click", () => {

            const current =
                document.documentElement.getAttribute("dir");

            const next = current === "rtl" ? "ltr" : "rtl";

            document.documentElement.setAttribute("dir", next);

            localStorage.setItem("direction", next);

        });

    });

});

/*=========================================
        COUNTER
=========================================*/

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            const counter = entry.target;

            const target = parseInt(counter.dataset.target);

            const suffix = counter.dataset.suffix || "+";

            let count = 0;

            const increment = target / 100;

            const updateCounter = () => {

                count += increment;

                if (count < target) {

                    if (suffix === "%") {

                        counter.innerText = Math.ceil(count) + "%";

                    } else if (target >= 1000) {

                        counter.innerText = Math.ceil(count / 1000) + "K+";

                    } else {

                        counter.innerText = Math.ceil(count) + "+";

                    }

                    requestAnimationFrame(updateCounter);

                } else {

                    if (suffix === "%") {

                        counter.innerText = target + "%";

                    } else if (target >= 1000) {

                        counter.innerText = (target / 1000) + "K+";

                    } else {

                        counter.innerText = target + "+";

                    }

                }

            };

            updateCounter();

            counterObserver.unobserve(counter);

        }

    });

});

counters.forEach(counter => counterObserver.observe(counter));

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {

    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {

        const isActive = item.classList.contains("active");

        faqItems.forEach(faq => {

            faq.classList.remove("active");

        });

        if (!isActive) {

            item.classList.add("active");

        }

    });

});

/*=========================================
        REVEAL ANIMATION
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    const revealElements = document.querySelectorAll(`

        .page-hero,
        .hero,
        .home2-hero,

        .section-title,

        .why-choose,
        .shop-category,
        .featured-products,
        .school-partners,
        .testimonials,
        .faq-section,
        .cta-section,

        .school-collections,
        .fabric-showcase,
        .why-eduthreads,
        .best-sellers,
        .home2-cta,

        .our-story,
        .about-choose,
        .our-values,
        .team-section,
        .about-cta,

        .uniform-category,
        .featured-uniforms,
        .uniform-fabric,
        .size-guide-preview,
        .uniform-trust,
        .uniform-cta,

        .measure-guide,
        .boys-size-chart,
        .girls-size-guide,
        .measurement-tips,
        .size-help,
        .size-guide-cta,

        .partner-section,
        .bulk-benefits,
        .bulk-process,
        .school-enquiry,
        .bulk-faq,
        .bulk-cta,

        .contact-info-section,
        .contact-form-section,

        .footer

    `);

    revealElements.forEach(el => {

        el.classList.add("reveal");

    });

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("active-reveal");

                observer.unobserve(entry.target);

            }

        });

    }, {

        threshold: 0.15

    });

    revealElements.forEach(el => observer.observe(el));

});

/*=========================================
        CARD REVEAL
=========================================*/

const cards = document.querySelectorAll(`

    .feature-item,
    .category-item,
    .product-card,
    .partner-card,
    .testimonial-card,

    .school-card,
    .fabric-item,
    .why-card,
    .seller-card,

    .about-choose-card,
    .value-card,
    .team-card,

    .uniform-category-card,
    .featured-uniform-card,
    .trust-item,

    .measure-item,
    .tip-card,
    .help-card,

    .partner-feature,
    .benefit-card,
    .process-step,

    .contact-info-card

`);

cards.forEach(card => {

    card.classList.add("reveal-card");

});

const cardObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active-card");

            cardObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

cards.forEach(card => cardObserver.observe(card));

/*=========================================
        SCROLL TO TOP
=========================================*/

const scrollTopBtn = document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollTopBtn.classList.add("show");

    } else {

        scrollTopBtn.classList.remove("show");

    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});