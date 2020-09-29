// global constants and variables for your app go here
    let camera, scene, renderer, pointer, stats
    let tick = 0
    let clock = new THREE.Clock()
    let particleSystem, options, spawnerOptions
    let startButton = document.getElementById( 'startButton' ); // our start screen - this is mainly to ensure our audio gets started at the right time
    startButton.addEventListener( 'click', initContent );

    //called on setup. Customize this
    function initContent(scene,camera,renderer) {

         let overlay = document.getElementById( 'overlay' ); // removing the overlay play button at the beginning after pressing play
         overlay.remove();
        //set the background color of the scene
        scene.background = new THREE.Color(0x333333);

        //a standard light
        const light = new THREE.AmbientLight(0xffffff,0.8);
        scene.add(light);

        const pointLight = new THREE.PointLight(0xffffff,1.0,1.0,2.0)

        //an invisible sphere for calculating a spawn point
        const mesh = new THREE.Mesh(
            new THREE.SphereGeometry(1.6),
            new THREE.MeshLambertMaterial({side:THREE.DoubleSide, visible:false}))
        mesh.position.y = 1.0
        mesh.position.x = 0.3
        mesh.userData.clickable = true
        scene.add(mesh)

        //class which handles mouse and VR controller
        // pointer = new Pointer(scene, renderer, camera, {
        //     //Pointer searches everything in the scene by default
        //     //override this to match just certain things
        //     intersectionFilter: ((o) => o.userData.clickable),
        //     //make the camera pan when moving the mouse. good for simulating head turning on desktop
        //     //mouseSimulatesController:true,
        //     cameraFollowMouse: false,
        //     enableLaser:false,
        // })


        // const gltfLoader = new THREE.GLTFLoader()
        // gltfLoader.load("./wand/scene.gltf",
        //     (model)=>{
        //         model.scene.traverse((ch)=>{
        //             if(ch.isMesh) {
        //                 ch.position.z = -0.7
        //                 const sc = 0.6
        //                 ch.scale.x = sc
        //                 ch.scale.y = sc
        //                 ch.scale.z = sc
        //                 pointer.controller1.add(ch)
        //                 pointLight.position.set(0,0,-1.5)
        //                 pointer.controller1.add(pointLight)
        //             }
        //         })
        //     }
        // )



        //options for the particle effect
        const textureLoader = new THREE.TextureLoader()
        options = {
            maxParticles: 10000,
            position: new THREE.Vector3(0,1.5,-5),
            positionRandomness: 0.0,
            baseVelocity: new THREE.Vector3(0.0, 0.0, -1),
            velocity: new THREE.Vector3(0.0, 0.0, 0.0),
            velocityRandomness: 1.0,
            acceleration: new THREE.Vector3(0,0.0,0),
            baseColor: new THREE.Color(1.0,1.0,0.5),
            color: new THREE.Color(1.0,0,0),
            colorRandomness: 0.5,
            lifetime: 3,
            size: 10,
            sizeRandomness: 1.0,
            particleSpriteTex: textureLoader.load('./tex/particle2.png'),
            blending: THREE.AdditiveBlending,
        }
        spawnerOptions = {
            spawnRate: 500, // create at the rate of 500 particles/sec
            timeScale: 1.0
        };
        // on(mesh,POINTER_PRESS,(e)=>{
        //     spawnerOptions.spawnRate = 5000
        //     pointLight.intensity = 2.0
        //     if(e.point) options.position.copy(e.point)
        // })
        // on(mesh,POINTER_RELEASE,(e)=>{
        //     spawnerOptions.spawnRate = 0
        //     pointLight.intensity = 0.0
        //     if(e.point) options.position.copy(e.point)
        // })
        // on(mesh,POINTER_MOVE,(e)=>{
        //     options.position.copy(e.point)
        // })
        particleSystem = new GPUParticleSystem(options)
        scene.add(particleSystem)

        
    }

    //called on every frame. customize this
    function render(time) {
        const t = time/1000
        //update the pointer and stats, if configured
        if(pointer) pointer.tick(time)
        if(stats) stats.update(time)


        const delta = clock.getDelta() * spawnerOptions.timeScale;
        tick += delta;
        if ( tick < 0 ) tick = 0;
        if ( delta > 0 ) {
            //spawn the correct number of particles for this frame based on the spawn rate
            for ( let x = 0; x < spawnerOptions.spawnRate * delta; x++ ) {
                options.velocity.x = options.baseVelocity.x + particleSystem.random() * options.velocityRandomness
                options.velocity.y = options.baseVelocity.y + particleSystem.random() * options.velocityRandomness
                options.velocity.z = options.baseVelocity.z + particleSystem.random() * options.velocityRandomness
                options.color.setRGB(
                    THREE.Math.clamp(options.baseColor.r+particleSystem.random()*options.colorRandomness,0,1),
                    THREE.Math.clamp(options.baseColor.g+particleSystem.random()*options.colorRandomness,0,1),
                    THREE.Math.clamp(options.baseColor.b+particleSystem.random()*options.colorRandomness,0,1),
                )
                particleSystem.spawnParticle( options );
            }
        }

        particleSystem.update( time );

        renderer.render( scene, camera );
    }


    // you shouldn't need to modify much below here
    function initScene() {
        //create DIV for the canvas
        const container = document.createElement( 'div' );
        document.body.appendChild( container );
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 50 );
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.vr.enabled = true;
        container.appendChild( renderer.domElement );
        //document.body.appendChild( WEBVR.createButton( renderer ) );

        initContent(scene,camera,renderer)

        window.addEventListener( 'resize', ()=>{
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }, false );
    }

    // initPage()
    initScene()
    renderer.setAnimationLoop(render)