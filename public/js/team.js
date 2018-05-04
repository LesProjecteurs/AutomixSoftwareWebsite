$(document).ready(function(){
	$('.team').slick({
		dots: true,
		infinite: true,
		centerMode: true,
		centerPadding: '0px',
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
	responsive: [
    {
		breakpoint: 1080,
		settings: {
			slidesToShow: 3
		}
    },
    {
		breakpoint: 780,
		settings: {
			arrows: false,
			slidesToShow: 3
		}
    },
    {
		breakpoint: 480,
		settings: {
			arrows: false,
			slidesToShow: 1
		}
    }
	]
	});
});