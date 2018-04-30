/*jslint browser, for*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var heroSlider = document.getElementById('heroslider');
    var slides = Array.from(heroSlider.getElementsByTagName('li'));
    var sliderDots = document.getElementById('sliderDots');
    var slideDirection = document.getElementById('slideDirection');
    var slideIndex = 0;

    slides.forEach(function (slide, index) {
        var element = '<input type="radio" name="changedots" value="' + index + '">';
        sliderDots.insertAdjacentHTML('beforeend', element);
    });

    function showSlide(n) {
        slides.forEach(function (slide) {
            slide.style.display = 'none'; 
        });

        slides[n].style.display = 'block';
        sliderDots.getElementsByTagName('input')[n].checked = true;
    }
    function changeByDot (event){
    	if(event.target !== event.currentTarget){
    		slideIndex = parseInt(event.target.getAttribute('value'));
    		showSlide(slideIndex);
    	}
    }
function changeByKey(event) {
	if (event.target !== event.currentTarget){
		var key = event.keyCode;

		var direction = null;

		if (key === 37) {
			direction = 'prev';
		} else if (key === 39) {
			direction = 'next';
		}

		if (direction !== null) {
			changeByDirection(direction);
		}
	}

}
function changeByArrow(event){
	if (event.target !== event.currentTarget){
    var direction = event.target.getAttribute('data-direction')
    changeByDirection(direction);
}
      event.stopPropagation()
}
function changeByDirection(direction ='next'){
    if(direction === 'prev' && slideIndex === 0){
    slideIndex = slides.length -1;
        }else if(direction === 'prev'){
        	slideIndex -= 1;
        }
        else if (direction === 'next' && slideIndex === slides.length -1 ){
        	
        	slideIndex = 0;
        }else{
        	slideIndex += 1;
        }
         showSlide(slideIndex);
	}
	setInterval (function(){
	changeByDirection('next');
}, 1000);

	

    showSlide(slideIndex);
    sliderDots.addEventListener('click', changeByDot);
    slideDirection.addEventListener('click', changeByArrow);
    document.addEventListener('keydown', changeByKey)
    

});

