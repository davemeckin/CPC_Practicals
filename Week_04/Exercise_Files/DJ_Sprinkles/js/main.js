
let scene, camera, renderer; // our main essential items
let geometry, material, cube, entities, numEntities, oscillators, synths; // some stuff to put our scene
let colour, intensity, light, ambientLight; // lighting
let planeGeometry,planeMaterial,plane;

let period, amplitude, frameCounter;
let angle, aVelocity;


let orbit; // our orbit controls so that we can using the mouse to change the camera position

let listener, sound, audioLoader; // some basic audio: a listener; a source; a file loader

let clock, delta, interval; // an interval generator so that we can clamp our frame rate or do other timed operations

let startButton = document.getElementById( 'startButton' ); // our start screen - this is mainly to ensure our audio gets started at the right time
startButton.addEventListener( 'click', init );

let player1, player2, crossFade;

let turntable1, turntable2, mixer;
let clicked = false;
let mouseOverDeck = false;

let targetRotation = 0;
let	targetRotationOnMouseDown = 0;

let mouseX = 0;
let mouseY = 0;
let mouseYOnMouseDown = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

let raycaster, mouse = { x : 0, y : 0 };

let ray;

function init() {

	let overlay = document.getElementById( 'overlay' ); // removing the overlay play button at the beginning after pressing play
	overlay.remove();
	
	
	// clock generator to ensure we can clamp some operations at different timed rates if needed

	clock = new THREE.Clock();
	delta = 0;
	interval = 1 / 60; // 60 fps
	frameCounter = 0;

	// create the renderer

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//make the scene

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xDFDFDF);
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// set the camera position
	camera.position.x = 0;
	camera.position.y = 0;
	camera.position.z = 100;

	crossFade = new Tone.CrossFade().toDestination();

	player1 = new Tone.Player("./sounds/Warrpy.mp3").connect(crossFade.a);
	//play as soon as the buffer is loaded
	player1.loop = true;
	player1.autostart = true;

	player2 = new Tone.Player("./sounds/Warrpy.mp3").connect(crossFade.b);
	//play as soon as the buffer is loaded
	player2.loop = true;
	player2.autostart = true;

	
	ray = new THREE.Raycaster();

	//create the orbit controls

	orbit = new THREE.OrbitControls( camera, renderer.domElement );
	orbit.enabled = false;
	orbit.enableZoom = true;

	

	

	// lighting
	colour = 0xFFFFFF;
	intensity = 1;
	light = new THREE.DirectionalLight(colour, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);
	//ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.5 );
	//scene.add( ambientLight );

 	planeGeometry = new THREE.PlaneGeometry( 100, 100);
    planeMaterial = new THREE.MeshPhongMaterial( 0x00DF00);
    plane = new THREE.Mesh( planeGeometry, planeMaterial );
      plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    //scene.add( plane );
	
	turntable1 = new Turntable( new THREE.Vector3( -60, 0, 0 ) , "platter1");
	scene.add(turntable1);
	turntable2 = new Turntable( new THREE.Vector3( 60, 0, 0 ) , "platter2");
	scene.add(turntable2);

	mixer = new Mixer(new THREE.Vector3( 0, -10, 0 ));
	scene.add(mixer);

	//Events

	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	document.addEventListener( 'touchmove', onDocumentTouchMove, false );
	document.addEventListener( 'touchend', onDocumentTouchEnd, false);
	document.addEventListener( 'keydown', onDocumentKeyDown, false );
	
	//Raycast

	raycaster = new THREE.Raycaster();
   // renderer.domElement.addEventListener( 'mouseover', raycast, false );
    // initialize object to perform world/screen calculations
  	//projector = new THREE.Projector();

  	// when the mouse moves, call the given function
  	document.addEventListener('mousemove', onDocumentMouseMove, false);
	
	// call our play function
	play();
}


 
// stop animating (not currently used)
function stop() {

	renderer.setAnimationLoop( null );

}

// simple render function


function render() {
	
	renderer.render( scene, camera );

}

// start animating

function play() {
		//using the new setAnimationLoop method which means we are WebXR ready if need be
	renderer.setAnimationLoop( () => {

		update();
		render();

	} );
}

//our update function

function update() {
	
	orbit.update();


		// create a Ray with origin at the mouse position
	//   and direction into the scene (camera direction)
	//let vector = new THREE.Vector3( mouse.x, mouse.y, 1 );
	//projector.unprojectVector( vector, camera );
	//let ray = new THREE.Raycaster( camera.position, vector.sub( camera.position ).normalize() );
	
	//console.log(mouse);
	ray.setFromCamera( mouse, camera ); 
	// create an array containing all objects in the scene with which the ray intersects
	let intersects = ray.intersectObjects( scene.children, true );
	//console.log(intersects);
	// INTERSECTED = the object in the scene currently closest to the camera 
	//      and intersected by the Ray projected from the mouse position    

	

	mixer.update(clicked, mouseX, intersects, crossFade);
	turntable1.update(clicked, targetRotation, intersects, player1);
	turntable2.update(clicked, targetRotation, intersects, player2);
	
	

	delta += clock.getDelta();

   	if (delta  > interval) {
       // The draw or time dependent code are here
       frameCounter++;

       delta = delta % interval;
   	}

	
  //update stuff in here

}



function onDocumentKeyDown(event) {
    var keyCode = event.keyCode;
    // up
    if (keyCode == 87) {
       console.log("up");
        // down
    } else if (keyCode == 83) {
        console.log("down");
        // left
    } else if (keyCode == 65) {
        console.log("left");
        // right
    } else if (keyCode == 68) {
        console.log("right");
        // space
    } else if (keyCode == 32) {
    	console.log("space");
       
    }
}


function onDocumentMouseDown( event ) {

	event.preventDefault();

	clicked = true;

	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mouseup', onDocumentMouseUp, false );
	document.addEventListener( 'mouseout', onDocumentMouseOut, false );

	mouseYOnMouseDown = event.clientY - windowHalfY;
	//targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove( event ) {

	// the following line would stop any other event handler from firing
	// (such as the mouse's TrackballControls)
	// event.preventDefault();

	// update the mouse variable
	mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
	mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;



	//clicked = true;

	mouseX = event.clientX - windowHalfX;
	mouseY = event.clientY - windowHalfY;

	targetRotation = targetRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.02;

}

function onDocumentMouseUp() {
	clicked = false;
	//
	///document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	//document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	//document.removeEventListener( 'mouseout', onDocumentMouseOut, false );

}

function onDocumentMouseOut() {
	clicked = false;
	//document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
	//document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
	//document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
	
}

function onDocumentTouchStart( event ) {

	if ( event.touches.length == 1 ) {

		//event.preventDefault();
		clicked = true;
		mouseYOnMouseDown = event.touches[ 0 ].pageY - windowHalfY;
		targetRotationOnMouseDown = targetRotation;

	} 

}

function onDocumentTouchMove( event ) {

	if ( event.touches.length == 1 ) {

		//event.preventDefault();
		clicked = true;
		mouseY = event.touches[ 0 ].pageY - windowHalfY;
		targetRotation = targetRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.05;

	} 

}

function onDocumentTouchEnd( event ) {
	clicked = false;
}

/*
function raycast ( e ) {
// Step 1: Detect light helper
    //1. sets the mouse position with a coordinate system where the center
    //   of the screen is the origin
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    //2. set the picking ray from the camera position and mouse coordinates
    raycaster.setFromCamera( mouse, camera );    

    //3. compute intersections (note the 2nd parameter)
    var intersects = raycaster.intersectObjects( scene.children, true );

    for ( var i = 0; i < intersects.length; i++ ) {
        console.log( intersects[ i ] ); 
        /*
            An intersection has the following properties :
                - object : intersected object (THREE.Mesh)
                - distance : distance from camera to intersection (number)
                - face : intersected face (THREE.Face3)
                - faceIndex : intersected face index (number)
                - point : intersection point (THREE.Vector3)
                - uv : intersection point in the object's UV coordinates (THREE.Vector2)
        */
  /*  }
// Step 2: Detect normal objects
    //1. sets the mouse position with a coordinate system where the center
    //   of the screen is the origin
    mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

    //2. set the picking ray from the camera position and mouse coordinates
    raycaster.setFromCamera( mouse, camera );    

    //3. compute intersections (no 2nd parameter true anymore)
    var intersects = raycaster.intersectObjects( scene.children );

    for ( var i = 0; i < intersects.length; i++ ) {
        console.log( intersects[ i ] ); 
        /*
            An intersection has the following properties :
                - object : intersected object (THREE.Mesh)
                - distance : distance from camera to intersection (number)
                - face : intersected face (THREE.Face3)
                - faceIndex : intersected face index (number)
                - point : intersection point (THREE.Vector3)
                - uv : intersection point in the object's UV coordinates (THREE.Vector2)
        */
/*    }

}
*/
