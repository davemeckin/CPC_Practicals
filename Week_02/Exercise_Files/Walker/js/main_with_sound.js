//Step 1

let scene, camera, renderer;
let geometry, material, cube;
let colour, intensity, light;
let ambientLight;

let orbit;

let walker;

let listener, sound, audioLoader;

let clock, delta, interval;

let startButton = document.getElementById( 'startButton' );
startButton.addEventListener( 'click', init );

function init() {

	let overlay = document.getElementById( 'overlay' );
	overlay.remove();

	clock = new THREE.Clock();
	delta = 0;
// 30 fps
	interval = 1 / 2;

	scene = new THREE.Scene();
	scene.background = new THREE.Color(0xDFDFDF);
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	//sound

	listener = new THREE.AudioListener();
	camera.add( listener );
	sound = new THREE.PositionalAudio( listener );

	audioLoader = new THREE.AudioLoader();
	audioLoader.load( './sounds/Gabriele100_Keyboard_Various-Keys_02.mp3', function( buffer ) {
		sound.setBuffer( buffer );
		sound.setRefDistance( 10 );
		sound.setRolloffFactor( 0.9 );

		sound.playbackRate = (4.6);
		sound.offset = 0.1;
		sound.setDirectionalCone( 180, 230, 0.1 );
		sound.setLoop( false );
		sound.setVolume( 0.5 );
		
		
		
	});

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	orbit = new THREE.OrbitControls( camera, renderer.domElement );
	            orbit.enableZoom = true;

	// geometry = new THREE.BoxGeometry();
	// material = new THREE.MeshNormalMaterial( ); // Change this from normal to Phong in step 5
	// cube = new THREE.Mesh( geometry, material );
				
	// scene.add( cube );

	camera.position.z = 5;



	colour = 0xFFFFFF;
	intensity = 1;
	light = new THREE.DirectionalLight(colour, intensity);
	light.position.set(-1, 2, 4);
	scene.add(light);

	let gridHelper = new THREE.GridHelper(1000,100);
	scene.add(gridHelper);

	ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.5 );
	scene.add( ambientLight );

	walker = new Walker(0,0,0);

	

	play();
}

 
class Walker {
	constructor(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.dotGeometry = new THREE.Geometry();
		this.dotsArray = [];
	}

	step() {
		let choice = THREE.MathUtils.randInt(0,5);//this.getRandomInteger(6);
		 if (choice == 0) {
		      this.x += 0.5;
		    } else if (choice == 1) {
		      this.x -= 0.5;
		      //sound.setVolume( 0.3+(Math.random()*0.1) );
		     // sound.offset = 0.05+(Math.random()*0.05);
		     // sound.play();
		    } else if (choice == 2) {
		      this.y += 0.5;
		    } else if (choice == 3) {
		      this.y -= 0.5;
		    } else if (choice == 4) {
		      this.z += 0.5;
		    } else {
		      this.z -= 0.5;
		      
		    }

			   sound.offset = 0.05+(Math.random()*0.1);
			   sound.setVolume( 0.3+(Math.random()*0.1) );
			   sound.play();

		
	}

	// getRandomInteger(max){ 

	// 	return Math.floor(Math.random() * Math.floor(max));

	// }

	display() {
		this.dotGeometry = new THREE.Geometry();
		this.dotGeometry.vertices.push(new THREE.Vector3( this.x, this.y, this.z));
		this.dotMaterial = new THREE.PointsMaterial( { size: 5, sizeAttenuation: false,color: 0x111111 } );
		this.dot = new THREE.Points( this.dotGeometry, this.dotMaterial );
		 this.dot.translateX(this.x);
		 this.dot.translateY(this.y);
		 this.dot.translateZ(this.z);
		this.dotsArray.push(this.dot.getWorldPosition(new THREE.Vector3()));
		//console.log(this.dot.position);
		scene.add(this.dot);
		

		// this.geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
		// this.material = new THREE.MeshPhongMaterial( ); // Change this from normal to Phong in step 5
		// this.cube = new THREE.Mesh( this.geometry, this.material );
		// this.cube.position.set(this.x, this.y, this.z);
		// scene.add(this.cube);
	}
}



function stop() {

	renderer.setAnimationLoop( null );

}




function render() {
	walker.display();
	renderer.render( scene, camera );
}

function play() {
	
	renderer.setAnimationLoop( () => {

		update();
		render();

	} );
}

function update() {

	orbit.update();


	 delta += clock.getDelta();

	   	if (delta  > interval) {
	       // The draw or time dependent code are here
	       walker.step();

	       delta = delta % interval;
	       console.log(delta, interval);
	   	}

	
	

	
	/*cube.rotation.x += 0.01;
	cube.rotation.y += 0.04;
	cube.rotation.z -= 0.01;*/
	
  //update stuff in here

}
document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.keyCode;
    // up
    if (keyCode == 87) {
   	
 //    var geom = new THREE.BufferGeometry().setFromPoints(walker.dotsArray);
	// var cloud = new THREE.Points(
	//   geom,
	//   new THREE.PointsMaterial({ color: 0x00FF00, size: 0.025 })
	// );
	// scene.add(cloud);

	// // triangulate x, z
	// var indexDelaunay = Delaunator.from(
	//   walker.dotsArray.map(v => {
	//   	console.log(v.x,v.z);
	//     return [v.x, v.y, v.z];
	//   })
	// );

	// var meshIndex = []; // delaunay index => three.js index
	// for (let i = 0; i < indexDelaunay.triangles.length; i++){
	//   meshIndex.push(indexDelaunay.triangles[i]);
	// }

	// geom.setIndex(meshIndex); // add three.js index to the existing geometry
	// //geom.computeVertexNormals();
	// var mesh = new THREE.Mesh(
	//   geom, // re-use the existing geometry
	//   new THREE.MeshLambertMaterial({ color: "purple", wireframe: true })
	// );
	// console.log(geom);
	// scene.add(mesh);

	for(let i = 0; i < walker.dotsArray.length-1; i++) {
		let material = new THREE.LineBasicMaterial({
		    color: 0x0000ff
		});

		let geometry = new THREE.Geometry();
		geometry.vertices.push(
		    walker.dotsArray[i],
		    walker.dotsArray[i+1]
		);

		let line = new THREE.Line( geometry, material );
		console.log(geometry);
		scene.add( line );
	}

	
       
        // down
    } else if (keyCode == 83) {
        
        // left
    } else if (keyCode == 65) {
        
        // right
    } else if (keyCode == 68) {
        
        // space
    } else if (keyCode == 32) {
    	console.log("hello");
       
    }
};

//init();
//play();		
			/*****/