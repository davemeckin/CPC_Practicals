
let scene, camera, renderer; // our main essential items
let geometry, material, cube; // some stuff to put our scene
let colour, intensity, light, ambientLight; // lighting


let orbit; // our orbit controls so that we can using the mouse to change the camera position

let listener, sound, audioLoader; // some basic audio: a listener; a source; a file loader

let clock, delta, interval; // an interval generator so that we can clamp our frame rate or do other timed operations

let startButton = document.getElementById( 'startButton' ); // our start screen - this is mainly to ensure our audio gets started at the right time
startButton.addEventListener( 'click', init );

let sceneWidth;
let sceneHeight;
let dom;
let hero, heroRadius;
let sun;
let ground;
let orbitControl;
let avatar;

let obstacles;
const numObstacles = 25;
let now = Tone.now();

function init() {

	let overlay = document.getElementById( 'overlay' ); // removing the overlay play button at the beginning after pressing play
	overlay.remove();
	Tone.Transport.start();

	// clock generator to ensure we can clamp some operations at different timed rates if needed
	clock = new THREE.Clock();
	delta = 0;
	interval = 1 / 4; // 60 fps

	sceneWidth=window.innerWidth;
    sceneHeight=window.innerHeight;
    scene = new THREE.Scene();//the 3d scene
    scene.fog = new THREE.FogExp2( 0xf0fff0, 0.006 );
    scene.updateMatrixWorld(true);
    camera = new THREE.PerspectiveCamera( 75, sceneWidth / sceneHeight, 0.1, 10000 );//perspective camera
    renderer = new THREE.WebGLRenderer({alpha:true});//renderer with transparent backdrop
    renderer.shadowMap.enabled = true;//enable shadow
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize( sceneWidth, sceneHeight );
    dom = document.getElementById('TutContainer');
	dom.appendChild(renderer.domElement);
	
	avatar = new Avatar(scene);
	// var planeGeometry = new THREE.PlaneGeometry( 5, 5, 4, 4 );
	// var planeMaterial = new THREE.MeshStandardMaterial( { color: 0x393939 } )
	// ground = new THREE.Mesh( planeGeometry, planeMaterial );
	// ground.receiveShadow = true;
	// ground.castShadow=false;
	// ground.rotation.x=-Math.PI/2;
	// ground.position.y=0.24;
	ground = new Environment(scene);
	/// scene.add( ground );

	camera.position.z = 30;
	camera.position.y = 25;

	//camera.lookAt(hero);
	
	sun = new THREE.DirectionalLight( 0xffffff, 1.0);
	sun.position.set( 6,2,1 );
	sun.castShadow = true;
	scene.add(sun);
	//Set up shadow properties for the sun light
	sun.shadow.mapSize.width = 512;
	sun.shadow.mapSize.height = 512;
	sun.shadow.camera.near = 0.5;
	sun.shadow.camera.far = 30 ;
	
	orbitControl = new THREE.OrbitControls( camera, renderer.domElement );//helper to rotate around in scene
	orbitControl.addEventListener( 'change', render );
	//orbitControl.enableDamping = true;
	//orbitControl.dampingFactor = 0.8;
	//orbitControl.enableZoom = false;

	
	

	
	var hemisphereLight = new THREE.HemisphereLight(0xfffafa,0x000000, .9)
	scene.add(hemisphereLight);
	sun = new THREE.DirectionalLight( 0xcdc1c5, 0.9);
	sun.position.set( 12,6,-7 );
	sun.castShadow = true;
	scene.add(sun);
		//var helper = new THREE.CameraHelper( sun.shadow.camera );
	//scene.add( helper );// enable to see the light cone
	
	window.addEventListener('resize', onWindowResize, false);//resize callback
	let entity = new Entity(scene);

	 obstacles = [];
	// for(let i = 0; i < numObstacles; i++){
	// 	obstacles.push(new TreeObstacle(randomRange(-2,2),0.0,randomRange(-2,2),scene));
	// }
	//let tree = new TreeObstacle(0.0,0.0,0.0,scene);
	// call our play function
	play();
}

function createTree(avatar,ground) {
	let randPosX = randomRange(-200,200);
	let randPosZ = randomRange(-300,-50);
	let position = new THREE.Vector3();
	
	
	
	obstacles.push(new TreeObstacle(avatar.hero.position.x + randomRange(-200,200),-1,avatar.hero.position.z + randomRange(-300,-50),ground,scene));
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
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
	 // for (let obs of obstacles) {
  //        	obs.update();
  //    }
	// hero.rotation.x += 0.01;
 //    hero.rotation.y += 0.01;
    //hero.position.z -= 0.05;
    camera.position.z -= 0.5;
    avatar.update(ground, obstacles,now);
   // camera.lookAt(avatar.hero.position);
	
  //update stuff in here

  delta += clock.getDelta();

   	if (delta  > interval) {
       // The draw or time dependent code are here
       createTree(avatar,ground,now);

       delta = delta % interval;
       for(let i = 0; i < obstacles.length; i++) {
       	if(obstacles[i].meshgroup.position.z > camera.position.z) {
       		obstacles.splice(i,1);	
       	}
       }
   	}

}


// listening for key events

document.addEventListener("keydown", onDocumentKeyDown, false);


function onDocumentKeyDown(event) {
    var keyCode = event.keyCode;
    // up
    if (keyCode == 87) {
       console.log("up");
       avatar.hero.position.y += 0.5;
        // down
    } else if (keyCode == 83) {
        console.log("down");
        //hero.position.y -= 0.25;
        // left
    } else if (keyCode == 65) {
        console.log("left");
      avatar.hero.position.x -= 0.5;
        // right
    } else if (keyCode == 68) {
        console.log("right");
       avatar.hero.position.x += 0.5;
        // space
    } else if (keyCode == 32) {
    	console.log("space");
       
    }
};

function onWindowResize() {
	//resize & align
	sceneHeight = window.innerHeight;
	sceneWidth = window.innerWidth;
	renderer.setSize(sceneWidth, sceneHeight);
	camera.aspect = sceneWidth/sceneHeight;
	camera.updateProjectionMatrix();
}


