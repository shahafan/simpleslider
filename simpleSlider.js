/**** simple slider plugin by Shahaf Antwarg ****/

// settings
var $slider = $('.simpleSlider'); // class or id of slider wrapper
var $slide = 'img'; // could also use 'li' if you're using a ul
var $transition_time = 1000; // 1 second
var $time_between_slides = 4000; // 4 seconds
var $showArrows = true;


$(function(){

	// first initialize
	initSlide();

	// auto scroll
	$interval = startInterval();

});


function initSlide(){
	slides().fadeOut();

	// set active classes
	slides().first().addClass('active');
	slides().first().fadeIn($transition_time);

	// arrows
	if($showArrows){
		var arrows = '<div class="arrows"><a class="previous" onclick="previous()"><</a><a class="next" onclick="next()">></a></div>';
		$slider.append(arrows);
	}

	fixWrapperHeight();
}

function startInterval(){
	$interval = setInterval(function(){
		slideLeft();
	}, $transition_time +  $time_between_slides);
	return $interval;
}

function next(){
	clearInterval($interval)
	slideLeft();
	$interval = startInterval();
}

function previous(){
	clearInterval($interval)
	slideRight();
	$interval = startInterval();
}

function slideLeft(){
	var $i = $slider.find($slide + '.active').index();

	slides().eq($i).removeClass('active');
	slides().eq($i).toggle("slide", { direction: "left" }, $transition_time);

	if (slides().length == $i + 1){
		$i = -1; // loop to start
	}

	slides().eq($i + 1).toggle("slide", { direction: "right" }, $transition_time);
	slides().eq($i + 1).addClass('active');

	fixWrapperHeight();
}

function slideRight(){
	var $i = $slider.find($slide + '.active').index();
	
	slides().eq($i).removeClass('active');
	slides().eq($i).toggle("slide", { direction: "right" }, $transition_time);

	if ($i == 0){
		$i = slides().length; // loop to end
	}

	slides().eq($i - 1).toggle("slide", { direction: "left" }, $transition_time);
	slides().eq($i - 1).addClass('active');

	fixWrapperHeight();
}

// helpers

function slides(){
	return $slider.find($slide);
}

function fixWrapperHeight(){
	$slider.css('height',$slider.find($slide + '.active').height()); // banner wrapper height
	if($showArrows){
		var $arrows = $slider.find('.arrows');
		var margin_top = 0.5*($slider.height()-$arrows.height());
		$arrows.css('margin-top',margin_top+'px'); // arrows wrapper margin top
	}
}

/***** end of plugin *****/