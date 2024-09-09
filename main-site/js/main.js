var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

// remap jQuery to $
(function($){

	function isTouchDevice() {
		//console.log('yes');
	   var el = document.createElement('div');
	   el.setAttribute('ontouchstart', 'return;'); // or try "ontouchstart"
	   return typeof el.ontouchstart === "function";
	}

	if(isTouchDevice()) {
		$('ul.nav > li').click(function(event) {

			// check for sub nav
			if($(this).find('.submenu-cont').length > 0) {

				// check if sub nav is open
				if ($(this).hasClass('sub-nav-open')) {
					// do nothing = go to link
				} else {
					$(this).addClass('sub-nav-open');
					event.preventDefault();
				}
			}
		});
	}


	// send screen width to php
	$.post(window.subFolder + '/ajax/screenWidth.php', {width : $(window).width()}, function(data, textStatus, xhr) {
		if(data == 'reload') {
			document.location.reload(true);
		}
	});

	if( $(window).width() > 767){
		window.sr = new scrollReveal();
	}

	////////////////////////////////////////////////////////////
	$(document).ready(function (){

		// reg form
		$('form.register-form').validate({
			rules : {
				name : 'required',
				lastname : 'required',
				telephone : 'required',
				email : {
					required : true,
					email : true
				},
				postcode : 'required'
			},
			submitHandler : function(form) {
				jQuery.magnificPopup.open({
					items: {src: '#thankyou-popup'},
					type: 'inline'
				});
				$.post(window.subFolder + '/ajax/submit.php', $('form.register-form').serialize(), function(data, textStatus, xhr) { 
					//ga('send', 'event', { eventCategory: 'register', eventAction: 'click', eventLabel: 'submit'});
					gtag('event', 'click', {'event_category':'register', 'event_label':'submit'});
				});
			}
		});

		resize_elements();

		// CSS
		$('ul li:first-child').addClass('first');
		$('ul li:last-child').addClass('last');
		$.jStyling.createSelect($('.form select'));


		// Mobile Menu
		$("#menu").mmenu({
			"slidingSubmenus": false,
		   "offCanvas": {
			 "position": "right",

		   }
		 }, {
			 classNames: {
				fixedElements: {
				   fixed: "Fixed"
				}
			 }
		  });

		// Scroll to Top
		$('.btn-top').click(function () {
			$("html, body").animate({
				scrollTop: 0
			}, 600);
			return false;
		});

		// Sticky Header
		$(window).scroll(function() {
			var scroll = $(window).scrollTop();
			if (scroll >=100) {
				$("body").addClass("fixed-header");
			} else {
				$("body").removeClass("fixed-header");
			}
		});

		// Video popup
		$('a.open-video').click(function (e) {
			e.preventDefault();
			$('#video-popup iframe').attr('src', 'https://player.vimeo.com/video/128558171?color=ddab78&title=0&byline=0&portrait=0&autoplay=1');

			$('#video-popup').fadeIn();
		});

		$('#video-popup').click(function(event) {
			$('#video-popup').fadeOut('fast', function() {
				$('#video-popup iframe').attr('src', '');
			});
		});


		// Popup
		$('.open-register-popup, .register-btn > a, .register-btn2 > a').magnificPopup({
			type:'inline',
			mainClass: 'mfp-fade'
		});
		$(".close-popup").click(function(e) {
			e.preventDefault();
			$.magnificPopup.close();
		});

		$('.open-fullscreen').click(function(event) {
			var url = $(this).attr('rel');
			$('.fullscreen-zoom').css('background-image', 'url(' + url + ')');
			$('.fullscreen-zoom').fadeIn();
		});

		$('.fullscreen-zoom .zoom-close').click(function(event) {
			$(this).parent().fadeOut();
		});

		// var $elem = $('.has-fullscreen .banner-slider');
		// $('body').append( '<div id="fullscreen-gallery"><div id="fullscreen-gallery-slider" class="sync">'+$elem.html()+'</div></div>');
		// $("#fullscreen-gallery-slider .slide").each(function(i, elem) {
		// 	var img = $(elem).find('img');
		// 	var image_url = img.attr("src")
		// 	image_url = image_url.replace('Zoom_Out', 'Zoom_In');
		// 	console.log(image_url);

		// 	$(elem).css({
		// 		background: "url(" + image_url + ") no-repeat",
		// 	});

		// 	img.hide();
		// });
		// $('#fullscreen-gallery-slider').cycle({
		// 	slides:"> div.slide",
		// 	swipe:"true",
		// 	fx:"fadeout",
		// 	timeout:0,
		// 	swipeFx:"scrollHorz",
		// 	next: '.cycle-next',
		// 	prev: '.cycle-prev'
		// });

		$('.has-fullscreen .zoom-toggle').click(function () {

			// sync position of slide show
			// var current_index = $('.banner-slider.cycle-slideshow').data("cycle.opts").currSlide + 1;
			// $('#fullscreen-gallery-slider').cycle('goto', current_index);

			$('#fullscreen-gallery').fadeIn();
			return false;
		});
		$('#fullscreen-gallery .zoom-toggle').click(function () {
			$('#fullscreen-gallery').fadeOut();
			return false;
		});



		// PLaceholder
		if(!Modernizr.input.placeholder){
			$('[placeholder]').focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
				}
			}).blur();
			$('[placeholder]').parents('form').submit(function() {
				$(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
				}
				})
			});
		}
	});
	////////////////////////////////////////////////////////////
	$(window).load(function() {


	});
	////////////////////////////////////////////////////////////
	$(window).resize(function() {
		resize_elements();
	});
	////////////////////////////////////////////////////////////
	$(window).bind('orientationchange', function(event) {
		resize_elements();
	});
	////////////////////////////////////////////////////////////
	function resize_elements() {
		var h = $('#header').outerHeight();
		$('#page').css('padding-top', h+'px');
		$('#fullscreen-gallery .slide').css('height', $(window).height()+'px');
	}
	////////////////////////////////////////////////////////////
})(window.jQuery);



}
