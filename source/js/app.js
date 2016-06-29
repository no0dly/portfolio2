var app = (function() {
    function _init() {
        console.log('started');

        $('#fullpage').fullpage({
            menu: '#menu',
            anchors:[ '' ,'firstPage', 'secondPage', 'thirdPage'],
            css3: true,
            scrollingSpeed: 1000,
            controlArrows: false,
            onLeave: _hoverMenu
        });

        $(window).load(function() { 
            $(".loader__inner").fadeOut(); 
            $(".loader").delay(400).fadeOut("slow"); 
        });

    }

    function _setUplisteners() {
        var sandwitch = $('.header-nav-mob__btn'),
            navItem   = $('.header-nav-mob__link'),
            beeLink   = $('.bee-grid__link'),
            form      = $('.touch-form');

        sandwitch.on('click', _openMobMenu);
        navItem.on('click', _closeMobMenu);
        form.on('submit', _sendEmail);
    }


    function _openMobMenu(e) {
        var
            $this   = $(this),
            nav     = $('.header-nav'),
            items   = $('.header-nav-mob__item');
            
        if(!nav.hasClass('mobile')) {
            nav.addClass('mobile');
            items.fadeIn(700);
        } else {
            _closeMobMenu();
        }
    }

    function _closeMobMenu(e) {

        var
            nav = $('.header-nav'),
            items   = $('.header-nav-mob__item');

        items.fadeOut(500, function() {
            nav.removeClass('mobile');
        });
    }

    function _hoverMenu(index, nextIndex) {
        var
            menuList = $('.header-nav__list'),
            slideName;
        switch (nextIndex) {
            case 1:
                slideName = 'first-page';
                break;
            case 2:
                slideName = 'second-page';
                break;
            case 3:
                slideName = 'third-page';
                break;
            case 4:
                slideName = 'fourth-page';
                break;
        }

        menuList.fadeOut(300).delay(300).slideDown(600);
        menuList.attr('data-slide', slideName);

    }

    function _sendEmail(e) {
       e.preventDefault();
    }


    return {
        init: _init,
        events: _setUplisteners
    };
}());

app.init();
app.events();