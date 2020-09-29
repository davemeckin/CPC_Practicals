
let scene, camera, renderer; // our main essential items
let geometry, material, cube; // some stuff to put our scene
let colour, intensity, light, ambientLight; // lighting


let orbit; // our orbit controls so that we can using the mouse to change the camera position

let listener, sound, audioLoader; // some basic audio: a listener; a source; a file loader

let clock, delta, interval; // an interval generator so that we can clamp our frame rate or do other timed operations

let startButton = document.getElementById( 'startButton' ); // our start screen - this is mainly to ensure our audio gets started at the right time
startButton.addEventListener( 'click', init );

function init() {

	let overlay = document.getElementById( 'overlay' ); // removing the overlay play button at the beginning after pressing play
	overlay.remove();

	// clock generator to ensure we can clamp some operations at different timed rates if needed

	clock = new THREE.Clock();
	delta = 0;
	interval = 1 / 60; // 60 fps

	// create the renderer

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//make the scene

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xDFDFDF);
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	// set the camera position

	camera.position.z = 5;

	//sound for single source and single listener

	listener = new THREE.AudioListener();
	camera.add( listener );
	sound = new THREE.PositionalAudio( listener );

	audioLoader = new THREE.AudioLoader();
	audioLoader.load( './sounds/CPC_Basic_Drone_Loop.mp3', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setRefDistance( 10 );
		sound.setDirectionalCone( 180, 230, 0.1 );
		sound.setLoop( true );
		sound.setVolume( 0.5 );
		sound.play();
		
		
		
	});

	

	//create the orbit controls

	orbit = new THREE.OrbitControls( camera, renderer.domElement );
	            orbit.enableZoom = true;

	// create a box to spin

	geometry = new THREE.BoxGeometry();
	material = new THREE.MeshNormalMaterial( ); // Change this from normal to Phong in step 5
	cube = new THREE.Mesh( geometry, material );
				
	scene.add( cube );

	// lighting
	colour = 0xFFFFFF;
	intensity = 1;
	light = new THREE.DirectionalLight(colour, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);
	ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.5 );
	scene.add( ambientLight );

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

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.04;
	cube.rotation.z -= 0.01;
	
  //update stuff in here

}


// listening for key events

document.addEventListener("keydown", onDocumentKeyDown, false);


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
};

