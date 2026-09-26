$(document).ready(function () {
		

	// mob nav
	$(document).on('click','.mob-nav-icon',function(e){
		e.preventDefault();
		if($(this).hasClass('active')){
			$('.header-nav').removeClass('vis');
			$('.mob-nav-icon').removeClass('active');
		}else{
			$('.header-nav').addClass('vis');
			$('.mob-nav-icon').addClass('active');
		}
	});


	// scroll to anchor
	$(document).on('click', 'a.anchor[href^="#"]', function (event) {
		event.preventDefault();
		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top - 20
		}, 500);
	});

	// slider
	$('.banner-slider').slick({
		dots: false,
		arrows: true,
		autoplay: true,
		fade: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
	});
	$('.banner-slider').slick('slickPause');


	$('.myDiv').click(function(){
		disable_scroll();
		$('html, body').stop().animate({ scrollTop: 0 }, 700,function() {
			enable_scroll();
		});
	});


	// loader animations
	if($('body').hasClass('is-loader')){

	}else{
		$('.banner-block').addClass('vis');
		$('.banner-slider').slick('slickPlay');
	}
	setTimeout(function() { 
       $('.loader').addClass('animate');
	   setTimeout(function() { 
			$('body').removeClass('is-loader');
			$('.loader').addClass('hide');
			$('.banner-slider').slick('slickPlay');
			$('.banner-block').addClass('vis');
		}, 2000);
    }, 2000);
		
	// scroll animations
	// img float
	gsap.registerPlugin(ScrollTrigger);
	$(".img-float").each(function(){
		var img = $(this).find('img');
		gsap.set(img, {yPercent:0});
		gsap.to(img, {
			yPercent: -20,
			ease: "none",
			scrollTrigger: {
			  trigger: img,
			  // start: "top bottom", // the default values
			  // end: "bottom top",
			  scrub: true
			}, 
		});
	});
	$(".banner-float").each(function(){
		var img = $(this).find('img');
		gsap.set(img, {yPercent:0});
		gsap.to(img, {
			yPercent: -10,
			ease: "none",
			scrollTrigger: {
			  trigger: img,
			  start: "top top",
			  // end: "bottom top",
			  scrub: true
			}, 
		});
	});
	// slogan animation
	if($('.slogan').length > 0 && $('.slogan-text .slogan-line').length === 0){
		$('.slogan-text').splitLines({
			tag:'<div class="slogan-line">'
		});
	}
	$(".slogan-line").each(function(){
		if($(this).find('.slogan-cover').length === 0){
			var text = $(this).text();
			$(this).append('<div class="slogan-cover">'+text+'</div>');
		}
	});
	// slogan scroll trigger
	$(".slogan-line").each(function(){
		var text = $(this).find('.slogan-cover');
		gsap.set(text, {width:0});
		gsap.to(text, {
			width: '100%',
			ease: "none",
			scrollTrigger: {
			  trigger: text,
			  //markers: true,
			  start: "top 90%",
			  end: "top 40%",
			  scrub: true
			}, 
		});
	});
	// reveal scroll trigger
	$(".reveal").each(function(){
		var text = $(this);
		gsap.from(text, {
			scrollTrigger: {
			  trigger: text,
			  start: "top 80%",
			  onEnter: () => {$(text).addClass('animate');},
			  //toggleClass: 'active'
			}
		});
	});
	// line scroll trigger
	$(".line-reveal").each(function(){
		var line = $(this).find('.line-dash');
		var line_trigger = $(this);
		//gsap.set(line, {height:0});
		gsap.to(line, {
			//height: '100%',
			ease: "none",
			scrollTrigger: {
			  trigger: line_trigger,
			  //markers: true,
			  start: "top 40%",
			  end: "bottom 40%",
			  onEnter: () => {$(line).addClass('animate');},
			}, 
		});
	});

	// forse page always to top on reload
	window.onbeforeunload = function () {
		window.scrollTo(0, 0);
	}

	// Projects dropdown — click to open, no navigation
	$(document).on('click', '.projects-dropdown-toggle', function (e) {
		e.preventDefault();
		var $parent = $(this).closest('.menu-item-has-children');
		var isActive = $parent.hasClass('active');
		$('.menu-item-has-children').removeClass('active');
		if (!isActive) {
			$parent.addClass('active');
		}
	});

	$(document).on('click', function (e) {
		if (!$(e.target).closest('.menu-item-has-children').length) {
			$('.menu-item-has-children').removeClass('active');
		}
	});

});