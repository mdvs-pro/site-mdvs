// IIFE - Immediately Invoked Function Expression
(function($, window, document) {

	// on ready
	$(function() {
		showLettersAnimation();
		PageLoad();
	});

	// local scope code

	function showLettersAnimation() {
		var tl = new TimelineMax();

			tl
				.from('.js-m', 1.6, {scale: 0, opacity: 0})
				.from('.js-d', 1, {scale: 0},'-=1')
				.from('.js-v', 1.6, {rotation: 130, transformOrigin: "140% 50%"},'-=0.8')
				.from('.js-s', 1, {y: -400},'-=0.5')
				.from('.logo__bi', 1, {opacity:0});
	}

	function PageLoad() {
		setTimeout(function() {
			$("body").removeClass("is-pagetransition");
		}, 100);

		setTimeout(function() {
			$("body").addClass("is-pagetransitionend");
			$('.loader-overlay').hide();
		}, 1400);
	}

}(window.jQuery, window, document));