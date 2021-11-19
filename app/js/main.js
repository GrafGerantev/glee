$(function () {
	$('.top-slider__inner').slick({
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000,
		fade: true,
	});

	var mixer = mixitup('.products__items', {
		selectors: {
			target: '.filter1',
		}
	});
	var mixer2 = mixitup('.design__items', {
		selectors: {
			target: '.filter2',
		}
	});

	$('.design__video-link').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		mainClass: 'mfp-fade',
		removalDelay: 160,
		preloader: false,

		fixedContentPos: false
	});

	var containerEl1 = document.querySelector('[data-ref="container-1"]');
	var containerEl2 = document.querySelector('[data-ref="container-2"]');

	var config = {
		controls: {
			scope: 'local'
		}
	};

	var mixer1 = mixitup(containerEl1, config);
	var mixer2 = mixitup(containerEl2, config);

});