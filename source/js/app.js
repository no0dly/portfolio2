var app = (function() {
    function _init() {
        console.log('started');

        $('#fullpage').fullpage({
            menu: '#menu',
            anchors:[ '' ,'firstPage', 'secondPage', 'thirdPage'],
            css3: true,
            scrollingSpeed: 1000,
            controlArrows: false,
            // afterRender: _addBackBtn(),
            onLeave: _hoverMenu
        });

    }

    function _setUplisteners() {
        var sandwitch = $('.header-nav-mob__btn'),
            navItem   = $('.header-nav__link'),
            beeLink   = $('.bee-grid__link'),
            form      = $('.touch-form');

        sandwitch.on('click', _openMobMenu);
        navItem.on('click', _closeMobMenu);
        form.on('submit', _sendEmail);
        // beeLink.on('click', _ajaxPortfolio);
    }

    // function  _addBackBtn() {
    //     var
    //         slide       = $('.slide'),
    //         lastSlide   = slide.last(),
    //         btn         = lastSlide.find('.portfolio-back');

    //     btn.addClass('portfolio-back--last');
    // }

    function _openMobMenu(e) {
        var
            $this   = $(this),
            nav     = $('.header-nav'),
            items   = $('.header-nav__item');
            
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
            items   = $('.mobile .header-nav__item');

        items.fadeOut(500, function() {
            nav.removeClass('mobile');
        });
    }

    function _hoverMenu(index, nextIndex) {
        var
            menuList = $('.header-nav__list');
        if( nextIndex === 1 ) {
            menuList.addClass('first-page');
        } else if ( nextIndex === 4 ){
            menuList.addClass('touch-page');
        } else {
            menuList.removeClass('touch-page');
            menuList.removeClass('first-page');
        }
    }

    function _ajaxPortfolio(e) {
        // e.preventDefault();
        var
            portfolio = $('#section1');

        $.ajax({
            url: "portfolio1.html",
            success: function(data) {
                portfolio.append(data);
                $.fn.fullpage.reBuild();
            }
        });
    }

    function _sendEmail(e) {
        e.preventDefault();
        var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        xmlhttp.open('POST', 'https://mandrillapp.com/api/1.0/messages/send.json');
        xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    alert('Mail sended!');
                }
                else if(xmlhttp.status == 500) {
                    alert('Check apikey');
                }
                else {
                    alert('Request error');
                }
            }
        };

        xmlhttp.send(JSON.stringify({'key': '42008d3a50539a166fa30d20201705db-us13',
           'message': {
               'from_email': 'prishlaRabota@write.here',
               'to': [{'email': 'thenoodly@gmail.com', 'type': 'to'}],
               'autotext': 'true',
               'subject': 'Yeah!',
               'html': '<h1>Its work!</h1>'
            }}));
    }

    return {
        init: _init,
        events: _setUplisteners
    };
}());

app.init();
app.events();