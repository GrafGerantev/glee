$(function () {

	/* ======================== Селект ========================= */

	$('.product-filter__num').styler();

	/* ====================== Появление кнопки добавления в корзину в блоке productsline ========== */

	$('.product-line .products-hover__img-cart').mouseover(function () {
		$(this).closest('.products-hover').find('.products-hover__btn').addClass('products-hover__btn--active');
		$(this).closest('.products-hover').find('.products-hover__img-cart').css({
			"border-bottom-left-radius": "5px",
			"border-top-left-radius": "5px",
		});
	});
	$('.products-hover__btn').mouseout(function () {
		$('.products-hover__btn').removeClass('products-hover__btn--active')
		$('.products-hover__img-cart').css({
			"border-bottom-left-radius": "0px",
			"border-top-left-radius": "0px",
		})
	});

	/* ==================== Рейтинг ======================= */

	$('.filter-recents__star').rateYo({
		starWidth: "11px",
		normalFill: "#d6d6d6",
		ratedFill: "#ffcc00",
		readOnly: true
	});

	$('.products-star').rateYo({
		starWidth: "16px",
		normalFill: "#d6d6d6",
		ratedFill: "#ffcc00",
		spacing: "13px",
		readOnly: true
	});

	/* ===============Filter range */

	$(".filter-price__input").ionRangeSlider({
		type: "double",
		prefix: "$",
		step: 0.01,

		onStart: function (data) {
			$('.filter-price__from').text(data.from + '.00');
			$('.filter-price__to').text(data.to + '.00');
		},

		onChange: function (data) {
			// Called every time handle position is changed
			$('.filter-price__from').text(data.from);
			$('.filter-price__to').text(data.to);
		},
	});

	/* ============== Slider ===================== */
	$('.top-slider__inner').slick({
		arrows: false,
		dots: true,
		autoplay: true,
		autoplaySpeed: 2000,
		fade: true,
	});

	$('.product-slide__thumb').slick({
		asNavFor: '.product-slide__big',
		focusOnSelect: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		vertical: true,
		draggable: false
	});

	$('.product-slide__big').slick({
		asNavFor: '.product-slide__thumb',
		arrows: false,
		draggable: false,
		fade: true
	});

	/* =============== Tabs ========================= */

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


	/* ================= Video ==================== */

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