(function () {
    var lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
    var ticking = false;

    function updateNavbar() {
        var currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        var header = document.querySelector('.header');

        if (!header) {
            ticking = false;
            return;
        }

        // TOP OF PAGE check: <= 5px -> always visible
        if (currentScrollY <= 5) {
            header.classList.remove('header--hidden');
            header.style.transform = 'translateY(0)';
        } else if (currentScrollY > lastScrollY) {
            // Scroll DOWN -> HIDE (slide UP & disappear)
            header.classList.add('header--hidden');
            header.style.transform = 'translateY(-110%)';
        } else if (currentScrollY < lastScrollY) {
            // Scroll UP -> SHOW (slide DOWN & appear)
            header.classList.remove('header--hidden');
            header.style.transform = 'translateY(0)';
        }

        lastScrollY = currentScrollY;
        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('touchmove', onScroll, { passive: true });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
            updateNavbar();
        });
    } else {
        lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        updateNavbar();
    }
})();
