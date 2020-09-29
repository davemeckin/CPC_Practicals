const rand = (min,max) => min + Math.random()*(max-min);

let particles, mesh;
const MAX = 10000;


let scene, camera, renderer; // our main essential items
let geometry, material, cube; // some stuff to put our scene
let colour, intensity, light, ambientLight; // lighting


let orbit; // our orbit controls so that we can using the mouse to change the camera position

let listener, sound, audioLoader; // some basic audio: a listener; a source; a file loader

let clock, delta, interval; // an interval generator so that we can clamp our frame rate or do other timed operations

let startButton = document.getElementById( 'startButton' ); // our start screen - this is mainly to ensure our audio gets started at the right time
startButton.addEventListener( 'click', init );

let particle;

function init() {

    let overlay = document.getElementById( 'overlay' ); // removing the overlay play button at the beginning after pressing play
    overlay.remove();

    // clock generator to ensure we can clamp some operations at different timed rates if needed

    clock = new THREE.Clock();
    clock.start();
    delta = 0;
    interval = 1 / 60; // 60 fps

    // create the renderer

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    //make the scene

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060606);
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    // set the camera position

    camera.position.z = 5;



    //create the orbit controls

    orbit = new THREE.OrbitControls( camera, renderer.domElement );
                orbit.enableZoom = true;

    // create a box to spin

    // geometry = new THREE.BoxGeometry();
    // material = new THREE.MeshNormalMaterial( ); // Change this from normal to Phong in step 5
    // cube = new THREE.Mesh( geometry, material );
                
    //scene.add( cube );

    // lighting
    colour = 0xFFFFFF;
    intensity = 1;
    light = new THREE.DirectionalLight(colour, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
    ambientLight = new THREE.AmbientLight( 0xFFFFFF, 0.5 );
    scene.add( ambientLight );

    particles = [];
    const initialPositions = [];
    const velocities = [];
    const accelerations = [];
    const geo = new THREE.BufferGeometry();
    for(let i=0; i<MAX; i++) {
        initialPositions.push(rand(-0.5, 0.5));
        initialPositions.push(rand(-4, -3));
        initialPositions.push(rand(-1, 1));
        velocities.push(rand(-0.5,0.5));
        velocities.push(10.0);
        velocities.push(rand(-1,1));
        accelerations.push(0);
        accelerations.push(-9.8);
        accelerations.push(0);
    }
    console.log(initialPositions);
    geo.setAttribute('position',new THREE.Float32BufferAttribute(initialPositions,3));
    geo.setAttribute('velocity',new THREE.Float32BufferAttribute(velocities,3));
    geo.setAttribute('acceleration',new THREE.Float32BufferAttribute(accelerations,3));
    const mat = new THREE.ShaderMaterial( {
       uniforms: {
           time: { value: 12.0}
       },
       vertexShader: document.getElementById( 'vertexShader' ).textContent,
       fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
       blending: THREE.AdditiveBlending,
       depthTest: true,
       transparent: true,
       vertexColors: true
    });
    mesh = new THREE.Points(geo,mat);
    mesh.position.z = -4;
    scene.add(mesh);


    // call our play function
    play();
}


 
// stop animating (not currently used)
function stop() {

    renderer.setAnimationLoop( null );

}

// simple render function


function render() {
    //console.log();
    mesh.material.uniforms.time.value = clock.getElapsedTime();
    mesh.geometry.verticesNeedUpdate = true;

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
    // particles.forEach(p => {
    //     const t = time/1000;
    //     const acc = p.acceleration.clone().multiplyScalar(0.5*t*t);
    //     const vel = p.velocity.clone().multiplyScalar(t);
    //     acc.add(vel);
    //     acc.add(p.initialPosition);
    //     p.position.copy(acc);
    // });
    //mesh.geometry.verticesNeedUpdate = true
    
    
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

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

