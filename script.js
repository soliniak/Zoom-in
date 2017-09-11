var photo = document.querySelector('.photo'),
	main = document.querySelector('.main'),
	mag = null,
	zoom = null;

var createMagnifier = function() {
	var magEl = document.createElement('div');
	magEl.classList.add('magnifier');
	mag = magEl;
	photo.appendChild(magEl);
};

var removeMagnifier = function() {
	if(mag){
		photo.removeChild(mag);
	}
};


var createZoomedPhoto = function () {
	zoom = document.createElement('div');
	zoom.classList.add('zoom');
	main.appendChild(zoom);
};

var removeZoomedPhoto = function () {
	if(zoom){
		main.removeChild(zoom);
		zoom = null;
	}
};

var onMouseMove = function (ev) {
	var photoBounding = photo.getBoundingClientRect(),
		x = ev.clientX - photoBounding.left,
		y = ev.clientY - photoBounding.top,
		photoSizeW = parseInt(window.getComputedStyle(photo).width),
		photoSizeY = parseInt(window.getComputedStyle(photo).height),
		magSize = parseInt(window.getComputedStyle(mag).height);

	x -= magSize /2;
	y -= magSize /2;

	if(x + magSize > photoSizeW){
		x = photoSizeW - magSize;
	}
	if(x <= 0){
		x = 0;
	}
	if(y + magSize > photoSizeY){
		y = photoSizeY - magSize;
	}
	if(y <= 0){
		y = 0;
	}

	var transformCSSValues = "translateX(" + x + "px) translateY(" + y + "px)";
	mag.style.transform = transformCSSValues;

	zoom.style.backgroundPosition = - x * 2 + "px " + - y * 2 + "px";
};

var onMouseEnter = function () {
	createMagnifier();
	createZoomedPhoto();
};

var onMouseLeave = function () {
	removeMagnifier();
	removeZoomedPhoto();
};

photo.addEventListener('mouseenter', onMouseEnter);
photo.addEventListener('mouseleave', onMouseLeave);
photo.addEventListener('mousemove', onMouseMove);