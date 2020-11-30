(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{CDjU:function(e,t,n){"use strict";n.r(t),n.d(t,"query",(function(){return u}));var o=n("q1tI"),a=n.n(o),l=n("Wbzz"),r=(n("9eSz"),n("Bl7J")),i=n("vrFN"),s=n("RMg3"),c=n("bj0T"),d=n("jPax"),u=(n("QYuT"),n("8ypT"),"3105699768");t.default=function(e){e.data;return a.a.createElement(r.a,null,a.a.createElement(s.a,null),a.a.createElement(i.a,{title:"Workshop 06"}),a.a.createElement("p",null),a.a.createElement("h1",null,"Hello and welcome back!"),a.a.createElement("p",null,"We looked at some examples and the coursework in the fifth workshop. The sixth workshop is aimed at helping you understand how we can undertake a few different tasks to useful to us while designing our projects. So, we will:"),a.a.createElement("p",null,a.a.createElement("ul",null,a.a.createElement("li",null,"Work from starter code provided that you will fork a new codesandbox from. This is because, to demonstrate the concepts around loading models and controlling synths, we've scaffolding your learning a bit for this week's challenge. "),a.a.createElement("li",null,"Load models that have animations built in"),a.a.createElement("li",null,"Load a static model and move it around based on sound parameters"),a.a.createElement("li",null,"Create a little interactive sphere synthesiser that maps mouse parameters to sound parameters"),a.a.createElement("li",null,"Challenge you a bit more to think about what's going on in the code by describing to what ",a.a.createElement("strong",null,"should")," happen; getting you to have a go at programming it yourself; then allowing you to see our solutions."))),a.a.createElement("p",null,"It's little bit silly to have a flamingo and a dancing robot, but here's what we're going to be building in the first two tasks to show you how to load models and how to drive movements with both pre-defined animations and with real-time sound properties:"),a.a.createElement("iframe",{src:"https://codesandbox.io/embed/w06t01end-c4yi3?fontsize=14&hidenavigation=1&theme=dark&view=preview",style:{width:"100%",height:"500px",border:"0",overflow:"hidden"},title:"W06_T01_END",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),a.a.createElement("p",null),a.a.createElement("p",null,a.a.createElement("strong",null,"Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.")),a.a.createElement("h2",null,"Task 1 - Loading Models"),a.a.createElement("p",null),a.a.createElement("p",null,"Right, we're going to use a starter project again this week. ",a.a.createElement("strong",null,"So please fork the project below.")," it's basically just our normal template but we've added some models for you to work with. Take a look around the project linked below and fork it so that you can start working on it. You can see at the top of index.js that we have already imported our GLTF loader that we're going to use to load the models in our models folder."),a.a.createElement("iframe",{src:"https://codesandbox.io/embed/w06t01end-forked-8fcf2?fontsize=14&hidenavigation=1&theme=dark",style:{width:"100%",height:"500px",border:"0",overflow:"hidden"},title:"W06_T01_START",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),"OK, as usual let's get going by adding some global variables towards the top of our index.js file:",a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:"let modelLoaded;\nlet robot, flamingo;\n\nlet loader;\nlet mixers;",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"Now, in init() just below where we remove the overlay, let's start our Tone js instance and initialise our modelLoaded boolean to false. This will be set to true once our models have been loaded and we can then use them in the rest of our code."),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:"Tone.start();\n    modelLoaded = false;",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"OK let's initialise mixers to an array and make a call to loadModels function. The mixers array will be an array that will hold our model's animations. The main bulk of our code is now going to be in the loadModels function. You will be getting an error now sayin that loadModels() is not defined. So let's move onto the next step."),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:"mixers = [];\n  loadModels();",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"At the bottom of our index.js file, let's define our loadModels function and instantiate our new gltfLoader:"),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:"function loadModels() {\n    loader = new GLTFLoader();\n  }",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"Now we're going to continue working in our loadModels function and define to callbacks that will process our models once they are loaded by the GLTFLoader. There's quite a bit of code here, so comments are provided to explain what is going on:"),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:"   const onLoadAnimation = function (gltf, position) {\n    flamingo = gltf.scene.children[0]; // assign the first child of the scene contained in the gltf file to a variable called flamingo\n    flamingo.scale.multiplyScalar(0.125); // scale our model to make it smaller\n    flamingo.position.copy(position); //copy the position passed from the load function call\n\n    const animation = gltf.animations[0]; // get the first animation from the gltf file and assign it to a varible call animation\n\n    const mixer = new THREE.AnimationMixer(flamingo); //create a new animation mixer and assign pass our new model to it\n\n    mixers.push(mixer); // add our animation mixer to our mixers array\n\n    const action = mixer.clipAction(animation); // pass the animation to the animation scheduler in the animation mixer\n    action.play(); // start the animation scheduling\n\n    scene.add(flamingo); // add our model to our scene\n  };\n\n  const onLoadStatic = function (gltf, position) {\n    robot = gltf.scene.children[0]; // assign the first child of the scene contained in the gltf file to a variable called robot\n    robot.scale.multiplyScalar(1.125);\n    robot.position.copy(position); //copy the position passed from the load function call\n\n    modelLoaded = true; // once our model has loaded, set our modelLoaded boolean flag to true\n    scene.add(robot); // add our model to the scene\n  };",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null),a.a.createElement("p",null,"Still in the loadModels function, let's add a couple more callback functions that will help tell us that the models are loading and if there are any errors:"),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:'// the loader will report the loading progress to this function\n  const onProgress = function () {\n    console.log("progress");\n  };\n\n  // the loader will send any error messages to this function, and we\'ll log\n  // them to to console\n  const onError = function (errorMessage) {\n    console.log(errorMessage);\n  };',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null),a.a.createElement("p",null,"And now beneath our callback functions, but still in the loadModels function, let's create some initial positions for our models, then actually load them. The load function will call our corresponding callback functions once the model is loaded:"),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:'  const flamingoPosition = new THREE.Vector3(-7.5, 0, -10); // create new vector for the position of our flamingo\n  loader.load(\n    // call the loader\'s load function\n    "models/Flamingo.glb", // specify our file path\n    function (gltf) {\n      // specify the callback function to call once the model has loaded\n      onLoadAnimation(gltf, flamingoPosition);\n    },\n    onProgress, // specify progress callback\n    onError // specify error callback\n  );\n\n  const robotPos = new THREE.Vector3(0, 0, 0);\n  loader.load(\n    // call the loader\'s load function\n    "models/robot.gltf", // specify our file path\n    function (gltf) {\n      // specify the callback function to call once the model has loaded\n      onLoadStatic(gltf, robotPos);\n    },\n    onProgress, // specify progress callback\n    onError // specify error callback\n  );',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"You may notice that our flamingo is a .glb file and the robot is .gltf. They're essentially just different ways of formatting model data. Take a look ",a.a.createElement("a",{href:"https://discourse.threejs.org/t/file-and-loading-differences-for-glb-vs-gltf/5390",target:"_blank"},"here")," to see the difference."),a.a.createElement("p",null),a.a.createElement("p",null),a.a.createElement(d.a,{allowZeroExpanded:"true"},a.a.createElement(d.b,null,a.a.createElement(d.d,null,a.a.createElement(d.c,null,"So, this is what our final loadModels function ends up looking like:")),a.a.createElement(d.e,null,a.a.createElement("p",null,a.a.createElement("code",null,a.a.createElement(c.a,{text:'function loadModels() {\n  loader = new GLTFLoader();\n\n  // A reusable function to set up the models. We\'re passing in a position parameter\n  // so that they can be individually placed around the scene\n  const onLoadAnimation = function (gltf, position) {\n    flamingo = gltf.scene.children[0]; // assign the first child of the scene contained in the gltf file to a variable called flamingo\n    flamingo.scale.multiplyScalar(0.125); // scale our model to make it smaller\n    flamingo.position.copy(position); //copy the position passed from the load function call\n\n    const animation = gltf.animations[0]; // get the animation\n\n    const mixer = new THREE.AnimationMixer(flamingo); //create a new animation mixer and assign pass our new model to it\n\n    mixers.push(mixer); // add our animation mixer to our mixers array\n\n    const action = mixer.clipAction(animation); // pass the animation to the animation scheduler in the animation mixer\n    action.play(); // start the animation scheduling\n\n    scene.add(flamingo); // add our model to our scene\n  };\n\n  const onLoadStatic = function (gltf, position) {\n    robot = gltf.scene.children[0]; // assign the first child of the scene contained in the gltf file to a variable called robot\n    robot.scale.multiplyScalar(1.125);\n    robot.position.copy(position); //copy the position passed from the load function call\n\n    modelLoaded = true; // once our model has loaded, set our modelLoaded boolean flag to true\n    scene.add(robot); // add our model to the scene\n  };\n\n  // the loader will report the loading progress to this function\n  const onProgress = function () {\n    console.log("progress");\n  };\n\n  // the loader will send any error messages to this function, and we\'ll log\n  // them to to console\n  const onError = function (errorMessage) {\n    console.log(errorMessage);\n  };\n\n  const flamingoPosition = new THREE.Vector3(-7.5, 0, -10); // create new vector for the position of our flamingo\n  loader.load(\n    // call the loader\'s load function\n    "models/Flamingo.glb", // specify our file path\n    function (gltf) {\n      // specify the callback function to call once the model has loaded\n      onLoadAnimation(gltf, flamingoPosition);\n    },\n    onProgress, // specify progress callback\n    onError // specify error callback\n  );\n\n  const robotPos = new THREE.Vector3(0, 0, 0);\n  loader.load(\n    // call the loader\'s load function\n    "models/robot.gltf", // specify our file path\n    function (gltf) {\n      // specify the callback function to call once the model has loaded\n      onLoadStatic(gltf, robotPos);\n    },\n    onProgress, // specify progress callback\n    onError // specify error callback\n  );\n}',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})))))),a.a.createElement("p",null),a.a.createElement("p",null,"Right, hopefully you can now see some models in your scene! But please do ask a tutor for some assistance if you can't see anything."),a.a.createElement("p",null),a.a.createElement("p",null,"The only thing is, our flamingo doesn't seem to be doing anything. So now we need to actually animate it."),a.a.createElement("p",null,'Now we just need to actually make a call to update our animation driving it with our delta variable. Add the following lines INSIDE the time dependent "if statement" in our update function:'),a.a.createElement("p",null),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:"for (let i = 0; i < mixers.length; i++) {\n      mixers[i].update(delta);\n    }",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement(d.a,{allowZeroExpanded:"true"},a.a.createElement(d.b,null,a.a.createElement(d.d,null,a.a.createElement(d.c,null,"So, the update function should now look like this:")),a.a.createElement(d.e,null,a.a.createElement("p",null,a.a.createElement("code",null,a.a.createElement(c.a,{text:"function update() {\n  orbit.update();\n  //update stuff in here\n  delta += clock.getDelta();\n\n  if (delta > interval) {\n    // The draw or time dependent code are here\n    //iterate through animation mixers\n    for (let i = 0; i < mixers.length; i++) {\n      mixers[i].update(delta);\n    }\n    delta = delta % interval;\n  }\n}",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})))))),a.a.createElement("p",null,"Now you should be able to see your flamingo flapping in a nice smooth animation!"),a.a.createElement("h2",null,"Task 2 - Making the Robot Dance"),a.a.createElement("p",null,a.a.createElement("p",null),a.a.createElement("p",null,"Right, we're not going to show you exactly how to do this bit. We're starting to take the training wheels off. But here is what needs to happen to make the robot dance back and forth to the beat. But don't worry, you can always check the code in the example at the very top of this page to see what's going on!",a.a.createElement("p",null),a.a.createElement("p",null,"So what's going on? Well, we're just going to take the level of our audio signal coming from a Tone.Player and apply it to the z position of our robot model."),a.a.createElement("p",null,"In our init() function, we will need to do the following:"),a.a.createElement("ul",null,a.a.createElement("li",null,"First we need to make a Tone.player - so let's create a global player variable at the top of index.js so we can assign it to that. Remember how we did this in the fourth week? Check back on that workshop if you can't remember. We've provided you with a couple of sound files in the project, but you can obviously use your own if they are small .mp3s."),a.a.createElement("li",null,"Instead of connecting the player to a crossfading mixer like last time, this time we'll just connect it directly to the master out using the .toDestination method."),a.a.createElement("li",null,"We will also create a new ",a.a.createElement("a",{href:"https://tonejs.github.io/docs/14.7.58/Meter.html",target:"_blank"},"Tone.Meter")," object. This will allow us to the get RMS level of our audio signal so that we can apply it our robot's position."),a.a.createElement("li",null,"We will then set the smoothing property of our meter to 0.8. Remember, we access the meter's properties by using the dot (.) operator."),a.a.createElement("li",null,"Finally, we need to connect the player to the meter using the .connect() method, the syntax for this can be found in the first example on the webpage linked above from Tone.js documentation. ")),a.a.createElement("p",null,"Now, in our time controlled code inside our update() function i.e inside ",a.a.createElement("code",null," if (delta > interval) "," "),", we will need to do the following:"),a.a.createElement("ul",null,a.a.createElement("li",null,"Create an if statement to check whether our robot model has loaded. Remember, we already made this boolean variable and it gets set to true once the robot has loaded."),a.a.createElement("li",null,"Inside that if statement, we're going to constantly update robot.position.z to be a scaled version of the meter's value, by using the ",a.a.createElement("a",{href:"https://threejs.org/docs/#api/en/math/MathUtils",target:"_blank"},"THREE.MathUtils.mapLinear")," function. See the next points for an explanation"),a.a.createElement("li",null,"As the input value to THREE.MathUtils.mapLinear we will call the meter.getValue() method belonging to meter."),a.a.createElement("li",null,"Then we will set the lower and upper input ranges to -60 and -12 respectively."),a.a.createElement("li",null,"Finally, we will set the lower and upper output ranges to 0.0 and 4.0 respectively.")),a.a.createElement("p",null,"Now you should be able to see your robot move back and forth in relation to the sound level."),a.a.createElement("h2",null,"Task 3 - Sphere Synth"),a.a.createElement("p",null,"Now we're going to try a new little project project, it's a sphere synthesiser that plays a note and moves the sphere with the mouse. The note changes when the mouse is moved on the x axis and the volume of the synth is mapped to the y position of the mouse.",a.a.createElement("p",null),a.a.createElement("iframe",{src:"https://codesandbox.io/embed/w06t03end-hwn54?fontsize=14&hidenavigation=1&theme=dark&view=preview",style:{width:"100%",height:"500px",border:"0",overflow:"hidden"},title:"W06_T03_END",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),a.a.createElement("p",null),a.a.createElement("p",null,a.a.createElement("strong",null,"For this task, start by this version forking our normal base template linked just below:")),a.a.createElement("iframe",{src:"https://codesandbox.io/embed/w06t03end-forked-q8jdc?fontsize=14&hidenavigation=1&theme=dark",style:{width:"100%",height:"500px",border:"0",overflow:"hidden"},title:"W06_T03_START",allow:"accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking",sandbox:"allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"}),"OK, once again, let's get going by adding some global variables towards the top of our index.js file:",a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:"let geometry, material;\nlet planeGeometry, planeMaterial;\nlet planet, plane;\nlet mouseDown;\nlet raycaster, mouse, intersects;\nlet synth, synthNotes;\nlet effect, reverb;",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"Just below where we remove the overlay in our init() function, let's initialise some of those variable. First we'll start tone; then initialise our mouseDown boolean flag to false, then we'll may a delay effect and a reverb effect."),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:"Tone.start(); // ensure Tone starts and that audio will be processed\n  mouseDown = false; // initialise mouse down to be false\n  effect = new Tone.FeedbackDelay().toDestination(); // create a delay effect and connect it to the master output\n  reverb = new Tone.Reverb({\n    // connect a reverb effect and connect it to the master output\n    decay: 2, // decay time of 2 seconds.\n    wet: 1.0, // fully wet signal\n    preDelay: 0.25 // pre-delay time of 0.25 seconds\n  }).toDestination();",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"The rest of our main audio stuff can now be added directly below. We're going to create an array with some musical note data; then we'll make a synth that has a bit of glide. Finally we'll connect the synth to the effects."),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:' synthNotes = [\n    // create an array with some choice notes in it\n    "C2",\n    "E2",\n    "G2",\n    "A2",\n    "C3",\n    "D3",\n    "E3",\n    "G3",\n    "A3",\n    "B3",\n    "C4",\n    "D4",\n    "E4",\n    "G4",\n    "A4",\n    "B4",\n    "C5"\n  ];\n\n  synth = new Tone.MonoSynth().toDestination(); // create an instance of a monosynth and connect it to the master output\n  synth.set({\n    // set some default settings\n    portamento: 0.1, // a bit of glide\n    volume: -10, // reduce the level by 10dB\n\n    oscillator: {\n      // set the oscillator type to sawtooth\n      type: "sawtooth"\n    },\n\n    envelope: {\n      // set the envelope settings\n      attack: 0.005,\n      release: 2.0,\n      sustain: 0.5\n    }\n  });\n\n  synth.connect(effect); //connect the synth to the delay\n  synth.connect(reverb); //connect the synth to the reverb',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"OK great, now, just below where we add the lights to our scene in init() let's initialise the stuff we need for our mouse interactions. They are a Raycaster, the intersects array and a mouse position vector."),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:"raycaster = new THREE.Raycaster();\n  mouse = new THREE.Vector2();\n  intersects = [];",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"OK our visual aids in this scene are going to be quite simple. We're going to add a ground plane and a planet that we will use as our synthesiser controller."),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:"planeGeometry = new THREE.PlaneGeometry(7, 7); \n  planeMaterial = new THREE.MeshPhongMaterial({\n    color: 0x919191,\n    side: THREE.DoubleSide\n  });\n  plane = new THREE.Mesh(planeGeometry, planeMaterial);\n\n  plane.position.set(0, -0.5001, 0);\n  plane.receiveShadow = true;\n  plane.rotation.set(Math.PI / 2, 0, 0); // rotate around the x axis to become flat\n  plane.shadowColor = 0xffffff;\n  scene.add(plane);\n  geometry = new THREE.SphereGeometry(1.5, 32, 32);\n  material = new THREE.MeshPhongMaterial({\n    color: 0xffffff,\n    wireframe: false\n  });\n  planet = new THREE.Mesh(geometry, material);\n  scene.add(planet);\n  planet.castShadow = true;",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"Now, towards the bottom of the init() function, just above where we added our onWindowResize event listener, let's add some new event listeners. These will listen for mouse events. We're using the \"pointer\" terminology here just to avoid any possible conflicts with our OrbitControls object."),a.a.createElement("p",null),a.a.createElement("code",null,a.a.createElement(c.a,{text:' // add our event listeners for pointer as opposed to mouse as this stops conflicts with OrbitControls\n  window.addEventListener("pointermove", move, false);\n  window.addEventListener("pointerdown", triggerAttack, false);\n  window.addEventListener("pointerup", triggerRelease, false);',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null),a.a.createElement("p",null,"OK, you should now be seeing an error that the event handler functions don't exit. Let's start to define them at at the bottom of our index.js file, below the onWindowResize function. "),a.a.createElement("p",null,"First of all, let's handle when the mouse point is down. Just to test, let's just define the functions with console.log statements in to make sure they're working:"),a.a.createElement("code",null,a.a.createElement(c.a,{text:'function triggerAttack(event) {\n\n  console.log("down");\n \n}\n\nfunction move(event) {\n\n  \n \n}\n\nfunction triggerRelease() {\n\n  console.log("up");\n \n}\n\n',language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"OK now that's working, let's put the rest of the code in. For triggerAttack. Again, there's a fair bit going on so please read the comments for explanations"),a.a.createElement("code",null,a.a.createElement(c.a,{text:"function triggerAttack(event) {\n  console.log(\"down\");\n  raycaster.setFromCamera(mouse, camera); // create our ray\n  intersects = raycaster.intersectObject(planet); // test whether our ray is intersecting with our planet object\n\n  if (intersects.length > 0) {\n    //if there is something in our array\n    mouseDown = true; // set mouseDown boolean flag to true\n  }\n\n  \n  const note =\n    synthNotes[\n      Math.round((event.clientX / sceneWidth) * (synthNotes.length - 1)) // constrain our mouseX position using Math.round to create an integer index that can be used to pick a note from our note array\n    ];\n\n  if (mouseDown) {\n    // Make the sphere follow the mouse\n    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5); // create a new 3D vector using our mouse position\n    vector.unproject(camera); // project mouse vector into world space using camera's normalised device coordinate space\n    let dir = vector.sub(camera.position).normalize(); // Create a direction vector based on subtracting our camera's position from our mouse position\n    let distance = -camera.position.z / dir.z; // derive distance from the negative z position of the camera divided by our direction's z position\n    let pos = camera.position.clone().add(dir.multiplyScalar(distance)); //create a new position based on adding the direction vector scaled by the distance vector, to the camera's position vector\n    planet.position.copy(pos); // copy our new position into the planet's position vector\n    synth.triggerAttack(note); // trigger the envelope on the synthesiser\n    planet.material.color.setHex(0xff00ff); // change the colour of our planet to purpley pink\n  }\n}",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"Our move function is pretty similar to the triggerAttack one. The main difference now being that instead of trigger the envelope on the synth, we're just updating the note and the volume based on the mouse position if the mouse is down."),a.a.createElement("code",null,a.a.createElement(c.a,{text:"function move(event) {\n  mouse.x = (event.clientX / sceneWidth) * 2 - 1; // convert our mouse x position to be a value between -1.0 and 1.0\n  mouse.y = -(event.clientY / sceneHeight) * 2 + 1; // convert our mouse y position to be a value between -1.0 and 1.0\n  const note =\n    synthNotes[\n      Math.round((event.clientX / sceneWidth) * (synthNotes.length - 1))\n    ]; // constrain our mouseX position using Math.round to create an integer index that can be used to pick a note from our note array\n\n  if (mouseDown) {\n    // Make the sphere follow the mouse\n    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5); // create a new 3D vector using our mouse position\n    vector.unproject(camera); // project mouse vector into world space using camera's normalised device coordinate space\n    let dir = vector.sub(camera.position).normalize(); // Create a direction vector based on subtracting our camera's position from our mouse position\n    let distance = -camera.position.z / dir.z; // derive distance from the negative z position of the camera divided by our direction's z position\n    let pos = camera.position.clone().add(dir.multiplyScalar(distance)); //create a new position based on adding the direction vector scaled by the distance vector, to the camera's position vector\n    planet.position.copy(pos); // copy our new position into the planet's position vector\n    synth.setNote(note); // update our synthesiser's note\n    let volume = THREE.MathUtils.mapLinear(\n      // map the y position to volume of the synth. Output range is in decibels\n      mouse.y, //input value\n      -1.0, // lower input range\n      1.0, // upper input range\n      -60, // lower output range\n      -3 // upper output range\n    );\n    synth.volume.linearRampTo(volume, 0.01); // set new volume level with a ramp of 0.01 seconds\n  }\n}",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"Our final function at the very bottom of index.js now simply releases the envelope and returns our sphere to it's grey colour."),a.a.createElement("code",null,a.a.createElement(c.a,{text:"function triggerRelease() {\n  mouseDown = false; // set mouseDown flag to false\n  console.log(\"up\");\n  synth.triggerRelease(Tone.now()); // trigger the release phase of our synth's envelope\n  planet.material.color.setHex(0x919191); // return planet's colour to it grey\n}",language:"javascript",theme:c.b,showLineNumbers:!1,class:"codeBlocks"})),a.a.createElement("p",null),a.a.createElement("p",null,"OK so hopefully now you have made a couple of little fun projects this week! Here are some stretch goals:",a.a.createElement("ul",null,a.a.createElement("li",null,"For the first project in tasks 1 and 2, try and find another low poly model, perhaps from ",a.a.createElement("a",{href:"https://sketchfab.com/",target:"_blank"},"Sketchfab"),", where you'll have to create an account. Or you can download the ",a.a.createElement("a",{href:"https://github.com/mrdoob/three.js/",target:"_blank"},"Three js"),"  three js development files from github, and these contain loads of models in the examples folder"),a.a.createElement("li",null,"For sphere synth project (task 3), can you add some instructions to the overlay at the start so that it makes it easier to use?"),a.a.createElement("li",null,"Again, for the sphere synth project (task 3), can you package the sphere and sound functionality up into classes in a separate javascript file? Then you could make multiple sphere synths with different kinds of sound properties to make an instrument. Take a look at the ",a.a.createElement("a",{href:"https://tonejs.github.io/examples/",target:"_blank"},"Instruments Section")," on the Tone.js examples site for some inspiration."),a.a.createElement("li",null,"Also for the sphere synth project. Could you adapt it to make it respond to keyboard key presses rather than mouse interaction? "))),a.a.createElement("p",null,"Right we're at the final task for this workshop hooray! Nice one for making our two little projects! "),a.a.createElement("p",null,"Super important final task: go to file->export to .zip in your codesandbox and download your project!"),a.a.createElement("p",null,'Remember how critical it is to keep a good folder structure? Make sure you start as you mean to go on and make a folder for this module, then another folder inside that one called "week 6".'),a.a.createElement(l.Link,{to:"/"},"Go back to the homepage")))))}},QYuT:function(e,t,n){}}]);
//# sourceMappingURL=component---src-pages-workshop-06-js-c14fdf79b559886f5f0e.js.map