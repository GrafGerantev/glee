$(function () {
	$('.top-slider__inner').slick({
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000,
		fade: true,
	});

	var mixer = mixitup('.products__items');
});