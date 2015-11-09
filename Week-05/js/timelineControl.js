
function controlTimeline( timeline ) {

	var mx = 0;
	var windowWidth = window.innerWidth;
	var progress = 0;
	var shiftKeyPressed = false;
	var totalAnimationTime = timeline.duration();
	console.log( "timeline: totalAnimationTime -> " + totalAnimationTime );

	var labels = timeline.getLabelsArray();
	showLabels();


	window.onmousedown = function (event) {
		if (shiftKeyPressed) {
			timeline.paused(!timeline.paused());
		}
	}
	
	window.onmousemove = function (event) {
		mx = event.clientX;
		progress = mx / windowWidth;
		if (shiftKeyPressed) {
			//timeline.seek( totalAnimationTime * ( event.clientX / window.innerWidth ) ).pause();
			timeline.totalProgress( progress ).pause();
			//getCurrentLabel();
		}
		$("div.display").text("totalProgress(): " + progress.toFixed(2) + " currentLabel(): " + getCurrentLabel());
	}
	
	window.onkeydown = function (event) {
		if (event.keyCode == 16) { 
			shiftKeyPressed = true; 
			timeline.totalProgress( progress ).pause();
			createDisplay();
		}
		$("div.display").text("shiftKeyPressed: " + shiftKeyPressed );
	}

	window.onkeyup = function (event) {
		if (event.keyCode == 16) { 
			shiftKeyPressed = false; 
			timeline.paused(!timeline.paused());
			destroyDisplay();
		}
		$("div.display").text("shiftKeyPressed: " + shiftKeyPressed );
	}

	function createDisplay(){
		$("<div class='display'></div>")
			.appendTo("body")
			.css({
				position: ("absolute"),
				backgroundColor: ("yellow"),
				fontFamily: ("sans-serif"),
				color: ("black"),
				padding: ("5px"),
				left: ("0px"),
				top: ("0px"),
				width: ("480px"),
				height: ("20px")
			})
			.text("shiftKeyPressed: " + shiftKeyPressed)
		;		
	}
	
	function destroyDisplay(){
		$("div.display").remove();
	}
	
	function showLabels(){
		for (var i = 0; i < labels.length; i++) { 
			console.log("label #" + i + ": " + labels[i].name + ", time: " + labels[i].time);
		}		
	}
	function getCurrentLabel(){
		return timeline.currentLabel();
	}


};