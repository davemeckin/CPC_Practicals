//Step 1

let scene, camera, renderer;
let geometry, material, cube;
let colour, intensity, light;
let ambientLight;

let orbit;

let walker;

function init() {

scene = new THREE.Scene();
scene.background = new THREE.Color(0xDFDFDF);
camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );



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



ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.5 );
scene.add( ambientLight );

walker = new Walker(0,0,0);

}

 
class Walker {
	constructor(x,y,z) {
		this.x = x;
		this.y = y;
		this.z = z;
	}

	step() {
		let choice = this.getRandomInteger(6);
		 if (choice == 0) {
		      this.x += 0.1;
		    } else if (choice == 1) {
		      this.x -= 0.1;
		    } else if (choice == 2) {
		      this.y += 0.1;
		    } else if (choice == 3) {
		      this.y -= 0.1;
		    } else if (choice == 4) {
		      this.z += 0.1;
		    } else {
		      this.z -= 0.1;
		    }
	}

	getRandomInteger(max){ 

		return Math.floor(Math.random() * Math.floor(max));

	}

	display() {
		this.dotGeometry = new THREE.Geometry();
		this.dotGeometry.vertices.push(new THREE.Vector3( this.x, this.y, this.z));
		this.dotMaterial = new THREE.PointsMaterial( { size: 5, sizeAttenuation: false,color: 0x111111 } );
		this.dot = new THREE.Points( this.dotGeometry, this.dotMaterial );
		scene.add( this.dot );

		// this.geometry = new THREE.BoxGeometry(0.5,0.5,0.5);
		// this.material = new THREE.MeshNormalMaterial( ); // Change this from normal to Phong in step 5
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
	walker.step();

	
	/*cube.rotation.x += 0.01;
	cube.rotation.y += 0.04;
	cube.rotation.z -= 0.01;*/
	
  //update stuff in here

}


init();
play();		
			/*****/