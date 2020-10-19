
let scene, camera, camGroup, renderer; // our main essential items
let geometry, material, cube; // some stuff to put our scene
let colour, intensity, light, ambientLight; // lighting


let orbit; // our orbit controls so that we can using the mouse to change the camera position

let listener, sound, audioLoader; // some basic audio: a listener; a source; a file loader

let clock, delta, interval; // an interval generator so that we can clamp our frame rate or do other timed operations

let startButton = document.getElementById( 'startButton' ); // our start screen - this is mainly to ensure our audio gets started at the right time
startButton.addEventListener( 'click', init );

let particleSystem;

let composer, afterimagePass;

let iCount,dummy,g,m,o;
let maxRotation;
let maxScale;


function init() {

	let overlay = document.getElementById( 'overlay' ); // removing the overlay play button at the beginning after pressing play
	overlay.remove();

	// clock generator to ensure we can clamp some operations at different timed rates if needed

	clock = new THREE.Clock();
	delta = 0;
	interval = 1 / 10; // 10 fps

	// create the renderer

	renderer = new THREE.WebGLRenderer({  preserveDrawingBuffer: true,
  alpha: true } );
    renderer.autoClearColor = false;
    console.log(renderer);
    renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//make the scene

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xDFDFDF);
	scene.add( new THREE.AxesHelper( 100 ) );
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    //camera.position.set(0, 10, 15);

	// set the camera position

	camera.position.z = 50;

	// Make highly-transparent plane
	var fadeMaterial = new THREE.MeshBasicMaterial({
	    color: 0x000000,
	    transparent: true,
	    opacity: 0.1
	});
	var fadePlane = new THREE.PlaneBufferGeometry(1, 1);
	var fadeMesh = new THREE.Mesh(fadePlane, fadeMaterial);

	// Create Object3D to hold camera and transparent plane
	//camGroup = new THREE.Object3D();
	//camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	//camGroup.add(camera);
	///camGroup.add(fadeMesh);

	// Put plane in front of camera
	fadeMesh.position.z = -0.1;

	// Make plane render before particles
	fadeMesh.renderOrder = -1;

	// Add camGroup to scene
	scene.add(camGroup);

	//create the orbit controls

	orbit = new THREE.OrbitControls( camera, renderer.domElement );
	            orbit.enableZoom = true;

	



	// lighting
	colour = 0xFFFFFF;
	intensity = 1;
	light = new THREE.DirectionalLight(colour, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);
	ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.5 );
	scene.add( ambientLight );

	particleSystem = new ParticleSystem(THREE.Vector3(0,0,0));
	//scene.add(particle);

	// postprocessing

	composer = new POSTPROCESSING.EffectComposer( renderer );
	composer.addPass( new POSTPROCESSING.RenderPass( scene, camera ) );

	composer.addPass(new POSTPROCESSING.EffectPass(camera, new POSTPROCESSING.BloomEffect()));

	

	// call our play function
	play();
}

 
// stop animating (not currently used)
function stop() {

	renderer.setAnimationLoop( null );

}

// simple render function


function render() {
	composer.render();
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
	delta += clock.getDelta();
	if (delta  > interval) {
       // The draw or time dependent code are here
       		
       particleSystem.addParticle(scene);
       delta = delta % interval;

   }



	orbit.update();
	particleSystem.update(scene);
	
	

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
}

//listening for window resize events

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    //camera.aspect = window.innerWidth / window.innerHeight;
   // camera.updateProjectionMatrix();

    //renderer.setSize( window.innerWidth, window.innerHeight );

}

