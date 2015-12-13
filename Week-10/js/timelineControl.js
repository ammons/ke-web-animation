
// <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
// <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/dark-hive/jquery-ui.css" rel="stylesheet">

function controlTimeline(timeline) {

	$.getScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js', function () {
		console.log("jQuery loaded...");
		$('<link/>', { rel: 'stylesheet', type: 'text/css', href: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/dark-hive/jquery-ui.min.css' }).appendTo('head');


		var mx = 0;
		var windowWidth = window.innerWidth;
		var progress = 0;
		shiftKeyPressed = false;
		//var totalAnimationTime = timeline.duration();
		//var $slider = $(".slider");
		//var controls = $(".controls");
		//var $display = $("div.display");

		var labels = timeline.getLabelsArray();

		showLabels();
		createDisplay();

		//timeline.eventCallback("onUpdate", updateSlider);
		//timelineCount = timeline.getChildren(false, true, true, 0).length;
		//console.log(timelineCount.length);

	
		window.onmousedown = function (event) {
			if (shiftKeyPressed) {
			//	timeline.paused(!timeline.paused());
			}
		}

		window.onmousemove = function (event) {

			mx = event.clientX;
			progress = mx / windowWidth;
			if (shiftKeyPressed) {
				timeline.totalProgress(progress).pause();
			}
			$("div.display").multiline(				
				"time(): " + timeline.time() + "\n" + 
				"startTime(): " + timeline.startTime() + "\n" + 
				"endTime(): " + timeline.endTime() + "\n" + 
				"isActive(): " + timeline.isActive() + "\n" + 
				"totalTime(): " + timeline.totalTime().toFixed(2) + "\n" + 
				"totalProgress(): " + timeline.totalProgress().toFixed(2) + "\n" + 
				"progress(): " + timeline.progress().toFixed(2) + "\n" + 
				"totalDuration(): " + timeline.totalDuration().toFixed(2) + " > all iterations including repeatDelays" + "\n" +
				"duration(): " + timeline.duration().toFixed(2) + "\n\n" +
				"getActive(): " + '"'+timeline.getActive() + '"'+ "\n\n" +
				"currentLabel(): " + '"'+timeline.currentLabel() + '"'+ "\n" +
				"labelBefore(): " + '"'+timeline.getLabelBefore() + '"'+ "\n" +
				"labelAfter(): " + '"'+timeline.getLabelAfter() + '"'+ "\n" +
				"labelsArray(): " + '"'+timeline.getLabelsArray() + '"'+ "\n\n" +
				"getTweensOf(): " + timeline.getTweensOf() + "\n\n" +
				"getChildren(): " + timeline.getChildren(false, true, true, 0) + "\n" +
				"getChildrenCount(): " + timeline.getChildren(false, true, true, 0).length + "\n" +
				"repeat(): " + timeline.repeat() + "\n" 
			);
		}

		window.onkeydown = function (event) {
			if (event.keyCode == 16) {
				shiftKeyPressed = true;
				timeline.totalProgress(progress).pause();
				$(".display").show();
				$(".controls").show();
			}
			//$("div.display").text("shiftKeyPressed: " + shiftKeyPressed);
		}

		window.onkeyup = function (event) {
			if (event.keyCode == 16) {
				shiftKeyPressed = false;
				timeline.paused(!timeline.paused());
				$(".display").hide();
				$(".controls").hide();
			}
			//$("div.display").text("shiftKeyPressed: " + shiftKeyPressed);
		}

		//--------------------------------------------------------------------------------			

		function createDisplay() {

			$("<div class='display'></div>")
				.appendTo("body")
				.css({
					position: ("absolute"),
					backgroundColor: ("yellow"),
					fontFamily: ("sans-serif"),
					fontSize: (".8em"),
					color: ("black"),
					padding: ("5px"),
					left: ("0px"),
					top: ("0px"),
					width: ("480px"),
					// height: ("20px"),
					opacity: ("0.9")
				})
				.text("shiftKeyPressed: " + shiftKeyPressed)
				.hide();
			;
			// $("<div class='controls'><div class='slider'></div></div>")
			// 	.appendTo("body")
			// 	.css({
			// 		position: ("absolute"),
			// 		backgroundColor: ("#444"),
			// 		fontFamily: ("sans-serif"),
			// 		top: ("90%"),
			// 		left: ("50%"),
			// 		width: ("90%"),
			// 		transform: ("translate(-50%, 0px)"),
			// 		opacity: ("0.65")
			// 	}).hide();
			// $(".slider").css({
			// 	backgroundColor: ("#000"),
			// 	//width: ("410px"),
			// });
		}
		
		//--------------------------------------------------------------------------------			
	
		// Create a Slider to Control Playback
		$(".slider").slider({
			range: false,
			min: 0,
			max: 100,
			step: .01,
			slide: function (event, ui) {
				timeline.pause();
				//adjust the timeline’s progress() based on slider value
				timeline.progress(ui.value / 100);
			}
		});

		// updateSlider function
		function updateSlider() {
			$(".slider").slider("value", timeline.progress() * 100.000000);
		}

		//--------------------------------------------------------------------------------			
	
		function destroyDisplay() {
			$(".display").remove();
			$(".controls").remove();
			$(".slider").remove();
		}

		function showLabels() {
			for (var i = 0; i < labels.length; i++) {
				console.log("label #" + i + ": " + labels[i].name + ", time: " + labels[i].time);
				console.log("Timeline Childen: " + timeline.getChildren() + ", time: " + labels[i].time);
			}
		}

		function getCurrentLabel() {
			return timeline.currentLabel();
		}

		// jQuery Multiline-Text Erweiterung
		$.fn.multiline = function(text){
			this.text(text);
			this.html(this.html().replace(/\n/g,'<br/>'));
			return this;
		}
	});


};