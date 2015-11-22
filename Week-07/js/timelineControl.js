
// <script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"></script>
// <link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/dark-hive/jquery-ui.css" rel="stylesheet">

function controlTimeline(timeline) {

	$.getScript('http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js', function () {
		console.log("did it");

		// var linkElem = document.createElement('link');
		// document.getElementsByTagName('head')[0].appendChild(linkElem);
		// linkElem.rel = 'stylesheet';
		// linkElem.type = 'text/css';
		// linkElem.href = 'js/jquery-ui.min.css';

		
		// $.getScript('js/jquery-ui.min.css', function() {
		// 	console.log("didi");
		// });
		// $.getCSS('http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/dark-hive/jquery-ui.css', function() {
		// 	console.log("didi");
		// });

		// $("#pageCSS").attr('href', 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/dark-hive/jquery-ui.css');
	
		// $.ajax({
		//       url: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/dark-hive/jquery-ui.min.css',
		//       dataType: 'css',
		//       success: function(){                  
		//             $('<link rel="stylesheet" type="text/css" href="'+'http://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/themes/dark-hive/jquery-ui.min.css'+'" />').appendTo("head");
		//             console.log("didi kong");
		//         }
		// });
	
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

		timeline.eventCallback("onUpdate", updateSlider);
		timelineCount = timeline.getChildren(false, true, true, 0);
		//console.log(timelineCount.length);

	
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
				timeline.totalProgress(progress).pause();
				//getCurrentLabel();
			}
			$("div.display").text("totalProgress(): " + progress.toFixed(2) + " currentLabel(): " + getCurrentLabel());
		}

		window.onkeydown = function (event) {
			if (event.keyCode == 16) {
				shiftKeyPressed = true;
				timeline.totalProgress(progress).pause();
				$(".display").show();
				$(".controls").show();
			}
			$("div.display").text("shiftKeyPressed: " + shiftKeyPressed);
		}

		window.onkeyup = function (event) {
			if (event.keyCode == 16) {
				shiftKeyPressed = false;
				timeline.paused(!timeline.paused());
				$(".display").hide();
				$(".controls").hide();
			}
			$("div.display").text("shiftKeyPressed: " + shiftKeyPressed);
		}

		//--------------------------------------------------------------------------------			

		function createDisplay() {

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
				.hide();
			;
			$("<div class='controls'><div class='slider'></div></div>")
				.appendTo("body")
				.css({
					position: ("absolute"),
					backgroundColor: ("#444"),
					fontFamily: ("sans-serif"),
					top: ("90%"),
					left: ("50%"),
					width: ("90%"),
					transform: ("translate(-50%, 0px)")
				}).hide();
			$(".slider").css({
				backgroundColor: ("#000"),
				//width: ("410px"),
			});
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
			}
		}

		function getCurrentLabel() {
			return timeline.currentLabel();
		}
	});


};