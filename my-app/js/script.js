


var pg;
var tex;
var planeTextArray = [];
var planeVidArray = [];
var planeImgArray = [];

var ypos = 25;


function setup(){

	// var canvas = createCanvas(window.width,window.height, WEBGL);
	// canvas.parent("result");
	$("#arrayprint").on("click",function(){
		console.log(planeTextArray);


	});


	pg = createGraphics(300,300);
	tex = createGraphics(300,300);

  	createCanvas(windowWidth, windowHeight, WEBGL);
 	 var fov = 60 / 180 * PI;
  	var cameraZ = height / 2.0 / tan(fov / 2.0);
  	perspective(60 / 180 * PI, width / height, cameraZ * 0.1, cameraZ * 10);


	console.log("yes");

	var xhr = new XMLHttpRequest();


	

	xhr.open("GET", "get_tweets.php",true);

	xhr.send(null);


	xhr.onload = function(){

		if(xhr.status == 200){
			// console.log(xhr.responseText);
			var tweets = JSON.parse(xhr.responseText);
			console.log(tweets);

			var counter = 0;
			// var arrayTest = ["cat","butt","toot","dog"];
			// arrayTest = jQuery.grep(arrayTest, function(n){
			// 	//this will search the array and delete the ones that aren't toot

			// 	return(n == "toot");

			// });


			// console.log("arraytest " + arrayTest);

			//if you're looking for hashtags might have to put in statuses before the foreach
			// run a for loop to check if it has the media property
			tweets.forEach(function(index){
				
				if(index.extended_entities == null){
					// if it's equal to null means it doesn't have an image
					//still make the text and write it to the dom anyways

				var imgtext = index.text;
				
				planeTextArray.push(new planeText(imgtext));
				// var $h1 = $("<h1>");
				// $h1.text(imgtext);
				// $("#result").append($h1);

				}

				else{
					//else means that it does
				console.log(index.extended_entities);
				//run another for loop to check and see if there are multiple images


				//make the text regardless if it is a text or video


				var imgtext = index.text;
				planeTextArray.push(new planeText(imgtext));
				// var $h1 = $("<h1>");
				// $h1.text(imgtext);
				// $("#result").append($h1);

				

				index.extended_entities.media.forEach(function(imgsrc){
					//the variable vidcheck will check and see if the media type is a video
					var mediacheck = imgsrc.type;
					console.log(mediacheck);
					if(mediacheck == "video"){

						// console.log("cat");
						// we just access variants[0] because the other indexes in the array are bitrate types
						var vidsrc = imgsrc.video_info.variants[0].url;
						planeVidArray.push(new planeVid(vidsrc));



						// var vidtype = imgsrc.video_info.variants[0].content_type;

						// var $vid = $("<video />", {
						// 		src: vidsrc,
						// 		type: vidtype,

						// 		controls: true


						// });
						// $vid.addClass("wide");

						// $("#result").append($vid);


					}
					// console.log(imgsrc);
					// the else will make an image an write it to the DOM

					else if (mediacheck == "photo"){
					var imagesrc  = imgsrc.media_url;
					
					planeImgArray.push(new planeImg(imagesrc));



				// var $img = $("<img>");
				
				

				// $img.attr("src", imagesrc);
				// $img.addClass("wide");

				// $("#result").append($img);
				// counter += 1;
			}
					else if(mediacheck == "animated_gif"){
						var vidsrc = imgsrc.video_info.variants[0].url;
						planeVidArray.push(new planeVid(vidsrc));
						// var vidtype = imgsrc.video_info.variants[0].content_type;

						// var $vid = $("<video />", {
						// 		src: vidsrc,
						// 		type: vidtype,
						// 		controls: true


						// });

						// $vid.addClass("wide");


						// $("#result").append($vid);



				}

				// console.log(imgtext);

				});

			
				// var imagesrc  = index.extended_entities.media[0].media_url;

				// var $img = $("<img>");

				// $img.attr("src", imagesrc);
				// $img.addClass("wide");

				// $("#result").append($img);


			}

					// index = jQuery.grep(index, function(i){
					// 	return(i == "extended_entities");
					// });

					// console.log(index);



			// 	tweets[index] = jQuery.grep(tweets, function(n){

			// 	return(n.prop() == "extended_entities");

			// });

				
				



			});

			
			console.log(counter);
			

			// var imagesrc  = tweets[0].extended_entities.media[0].media_url;

			// var $img = $("<img>");
			// $img.attr("src", imagesrc);

			// $("#result").append($img);



			// console.log(imagesrc);


			
			// console.log("JEMIMA");




		



	}





}



}
// end of setup

function draw(){

	orbitControl();
	background(200);
	translate(0,ypos * -1,0);

	// pg.background(255);
	// pg.text("yes please!", 100,100);
	// tex.text("no way!",100,20);
	// //pass graphics texture
	// texture(tex);

	// plane(200,300);
	// translate(300,300,-400);

	// plane(400,400);

	
	for(var j = 0; j < planeVidArray.length; j++){
		planeVidArray[j].display();


	}
	for(var l = 0; l < planeImgArray.length; l++){
		planeImgArray[l].display();


	}
	for(var i = 0; i < planeTextArray.length; i++){
		planeTextArray[i].display();


	}
	
	


}


function planeText(textureText){

	this.textext = textureText;
	var text_texture = createGraphics(400,200);
	text_texture.text(this.textext,10,30);

	// push();
	// 	texture(text_texture);
	// 	plane(200,300);
	// pop();
	// translate(440,0,0);

	this.display = function(){
		texture(text_texture);
		plane(700,200);
		translate(0,300,0);



	}


}

function planeVid(videoSrc){
	this.vidvid = videoSrc;
	var vid_texture = createVideo([this.vidvid]);
	vid_texture.loop();
	vid_texture.hide();
	this.display = function(){

		texture(vid_texture);
		plane(500,900);
		translate(0,900,0);

	}


}

function planeImg(sourceImg){
	this.srcimg = sourceImg;
	var img_texture = loadImage(this.srcimg);

	this.display = function(){

		texture(img_texture);
		plane(700,900);
		translate(0,900,0);


	}
	this.move = function(){

		if(pos == -100){
			accelerationY = -1;


		}
		else{

			accelerationY = 1;
		}



	}


}

function mouseWheel(event){
	console.log(event.delta);

	ypos += event.delta;


}