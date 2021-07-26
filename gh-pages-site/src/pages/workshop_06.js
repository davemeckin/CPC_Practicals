import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Navbar from "../components/navbar"
//import CodeBlock from "../components/codeblock"
import { CopyBlock } from "react-code-blocks";
import { CodeBlock, dracula, github } from "react-code-blocks";
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
 
// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import "../components/layout.css"

//var thisIsMyCopy = "function myTimer() \n { \n let d = new Date();document.getElementById(\"demo\").innerHTML = d.toLocaleTimeString();}";

const Workshop06 = ({data}) => (
  <Layout>
  <Navbar/>
    <SEO title="Workshop 06" />
    <p></p>
    <h1>Hello and welcome back!</h1>
    <p>We looked at some examples and the coursework in the fifth workshop. The sixth workshop is aimed at helping you understand how we can undertake a few different tasks to useful to us while designing our projects. So, we will:</p>
	<p>
     <ul>
		  <li>Work from starter code provided that you will fork a new codesandbox from. This is because, to demonstrate the concepts around loading models and controlling synths, we've scaffolding your learning a bit for this week's challenge. </li>
		  <li>Load models that have animations built in</li>
		  <li>Load a static model and move it around based on sound parameters</li>
      <li>Create a little interactive sphere synthesiser that maps mouse parameters to sound parameters</li>
		  <li>Challenge you a bit more to think about what's going on in the code by describing to what <strong>should</strong> happen; getting you to have a go at programming it yourself; then allowing you to see our solutions.</li>
		  
	</ul>
	</p>

	<p>It's little bit silly to have a flamingo and a dancing robot, but here's what we're going to be building in the first two tasks to show you how to load models and how to drive movements with both pre-defined animations and with real-time sound properties:</p>
	 <iframe src="https://codesandbox.io/embed/w06t01end-c4yi3?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W06_T01_END"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
	
   <p></p>
	<p><strong>Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.</strong>
	</p>
    

    <h2>Task 1 - Loading Models</h2>
    <p></p>
   

   <p>Right, we're going to use a starter project again this week. <strong>So please fork the project below.</strong> it's basically just our normal template but we've added some models for you to work with. Take a look around the project linked below and fork it so that you can start working on it. You can see at the top of index.js that we have already imported our GLTF loader that we're going to use to load the models in our models folder.</p>

   <iframe src="https://codesandbox.io/embed/w06t01end-forked-8fcf2?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W06_T01_START"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

   OK, as usual let's get going by adding some global variables towards the top of our index.js file:

   <p></p>
   <code>
  <CodeBlock text = {`let modelLoaded;
let robot, flamingo;

let loader;
let mixers;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

  

  <p>Now, in init() just below where we remove the overlay, let's start our Tone js instance and initialise our modelLoaded boolean to false. This will be set to true once our models have been loaded and we can then use them in the rest of our code.</p>
  <p></p>
   <code>
  <CodeBlock text = {`Tone.start();
    modelLoaded = false;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

<p>OK let's initialise mixers to an array and make a call to loadModels function. The mixers array will be an array that will hold our model's animations. The main bulk of our code is now going to be in the loadModels function. You will be getting an error now sayin that loadModels() is not defined. So let's move onto the next step.</p>
  <p></p>
   <code>
  <CodeBlock text = {`mixers = [];
  loadModels();`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

<p>At the bottom of our index.js file, let's define our loadModels function and instantiate our new gltfLoader:</p>
  <p></p>
   <code>
  <CodeBlock text = {`function loadModels() {
    loader = new GLTFLoader();
  }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

<p>Now we're going to continue working in our loadModels function and define to callbacks that will process our models once they are loaded by the GLTFLoader. There's quite a bit of code here, so comments are provided to explain what is going on:</p>
  <p></p>
   <code>
  <CodeBlock text = {`   const onLoadAnimation = function (gltf, position) {
    flamingo = gltf.scene.children[0]; // assign the first child of the scene contained in the gltf file to a variable called flamingo
    flamingo.scale.multiplyScalar(0.125); // scale our model to make it smaller
    flamingo.position.copy(position); //copy the position passed from the load function call

    const animation = gltf.animations[0]; // get the first animation from the gltf file and assign it to a varible call animation

    const mixer = new THREE.AnimationMixer(flamingo); //create a new animation mixer and assign pass our new model to it

    mixers.push(mixer); // add our animation mixer to our mixers array

    const action = mixer.clipAction(animation); // pass the animation to the animation scheduler in the animation mixer
    action.play(); // start the animation scheduling

    scene.add(flamingo); // add our model to our scene
  };

  const onLoadStatic = function (gltf, position) {
    robot = gltf.scene.children[0]; // assign the first child of the scene contained in the gltf file to a variable called robot
    robot.scale.multiplyScalar(1.125);
    robot.position.copy(position); //copy the position passed from the load function call

    modelLoaded = true; // once our model has loaded, set our modelLoaded boolean flag to true
    scene.add(robot); // add our model to the scene
  };`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

<p></p>

<p>Still in the loadModels function, let's add a couple more callback functions that will help tell us that the models are loading and if there are any errors:</p>
  <p></p>
   <code>
  <CodeBlock text = {`// the loader will report the loading progress to this function
  const onProgress = function () {
    console.log("progress");
  };

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = function (errorMessage) {
    console.log(errorMessage);
  };`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

<p></p>

<p>And now beneath our callback functions, but still in the loadModels function, let's create some initial positions for our models, then actually load them. The load function will call our corresponding callback functions once the model is loaded:</p>
  <p></p>
   <code>
  <CodeBlock text = {`  const flamingoPosition = new THREE.Vector3(-7.5, 0, -10); // create new vector for the position of our flamingo
  loader.load(
    // call the loader's load function
    "models/Flamingo.glb", // specify our file path
    function (gltf) {
      // specify the callback function to call once the model has loaded
      onLoadAnimation(gltf, flamingoPosition);
    },
    onProgress, // specify progress callback
    onError // specify error callback
  );

  const robotPos = new THREE.Vector3(0, 0, 0);
  loader.load(
    // call the loader's load function
    "models/robot.gltf", // specify our file path
    function (gltf) {
      // specify the callback function to call once the model has loaded
      onLoadStatic(gltf, robotPos);
    },
    onProgress, // specify progress callback
    onError // specify error callback
  );`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>
  <p>You may notice that our flamingo is a .glb file and the robot is .gltf. They're essentially just different ways of formatting model data. Take a look <a href="https://discourse.threejs.org/t/file-and-loading-differences-for-glb-vs-gltf/5390" target="_blank">here</a> to see the difference.</p>
   <p></p>

   <p></p>


   <Accordion allowZeroExpanded = "true">
   <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        So, this is what our final loadModels function ends up looking like:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
            <CodeBlock text = {`function loadModels() {
  loader = new GLTFLoader();

  // A reusable function to set up the models. We're passing in a position parameter
  // so that they can be individually placed around the scene
  const onLoadAnimation = function (gltf, position) {
    flamingo = gltf.scene.children[0]; // assign the first child of the scene contained in the gltf file to a variable called flamingo
    flamingo.scale.multiplyScalar(0.125); // scale our model to make it smaller
    flamingo.position.copy(position); //copy the position passed from the load function call

    const animation = gltf.animations[0]; // get the animation

    const mixer = new THREE.AnimationMixer(flamingo); //create a new animation mixer and assign pass our new model to it

    mixers.push(mixer); // add our animation mixer to our mixers array

    const action = mixer.clipAction(animation); // pass the animation to the animation scheduler in the animation mixer
    action.play(); // start the animation scheduling

    scene.add(flamingo); // add our model to our scene
  };

  const onLoadStatic = function (gltf, position) {
    robot = gltf.scene.children[0]; // assign the first child of the scene contained in the gltf file to a variable called robot
    robot.scale.multiplyScalar(1.125);
    robot.position.copy(position); //copy the position passed from the load function call

    modelLoaded = true; // once our model has loaded, set our modelLoaded boolean flag to true
    scene.add(robot); // add our model to the scene
  };

  // the loader will report the loading progress to this function
  const onProgress = function () {
    console.log("progress");
  };

  // the loader will send any error messages to this function, and we'll log
  // them to to console
  const onError = function (errorMessage) {
    console.log(errorMessage);
  };

  const flamingoPosition = new THREE.Vector3(-7.5, 0, -10); // create new vector for the position of our flamingo
  loader.load(
    // call the loader's load function
    "models/Flamingo.glb", // specify our file path
    function (gltf) {
      // specify the callback function to call once the model has loaded
      onLoadAnimation(gltf, flamingoPosition);
    },
    onProgress, // specify progress callback
    onError // specify error callback
  );

  const robotPos = new THREE.Vector3(0, 0, 0);
  loader.load(
    // call the loader's load function
    "models/robot.gltf", // specify our file path
    function (gltf) {
      // specify the callback function to call once the model has loaded
      onLoadStatic(gltf, robotPos);
    },
    onProgress, // specify progress callback
    onError // specify error callback
  );
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
              </code>
        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
           
            
      </Accordion>

      <p></p>

      <p>Right, hopefully you can now see some models in your scene! But please do ask a tutor for some assistance if you can't see anything.</p>

      <p></p>

      <p>The only thing is, our flamingo doesn't seem to be doing anything. So now we need to actually animate it.</p>

      <p>Now we just need to actually make a call to update our animation driving it with our delta variable. Add the following lines INSIDE the time dependent "if statement" in our update function:</p>

      <p></p>

        <p></p>
   <code>
  <CodeBlock text = {`for (let i = 0; i < mixers.length; i++) {
      mixers[i].update(delta);
    }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

<Accordion allowZeroExpanded = "true">
   <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        So, the update function should now look like this:
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                         <code>
            <CodeBlock text = {`function update() {
  orbit.update();
  //update stuff in here
  delta += clock.getDelta();

  if (delta > interval) {
    // The draw or time dependent code are here
    //iterate through animation mixers
    for (let i = 0; i < mixers.length; i++) {
      mixers[i].update(delta);
    }
    delta = delta % interval;
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
              </code>
        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
           
            
      </Accordion>

       <p>Now you should be able to see your flamingo flapping in a nice smooth animation!</p>
  
    <h2>Task 2 - Making the Robot Dance</h2>
    <p><p/>

    <p>Right, we're not going to show you exactly how to do this bit. We're starting to take the training wheels off. But here is what needs to happen to make the robot dance back and forth to the beat. But don't worry, you can always check the code in the example at the very top of this page to see what's going on!<p/>
    <p>So what's going on? Well, we're just going to take the level of our audio signal coming from a Tone.Player and apply it to the z position of our robot model.</p>

    <p>In our init() function, we will need to do the following:</p>
    <ul>
      <li>First we need to make a Tone.player - so let's create a global player variable at the top of index.js so we can assign it to that. Remember how we did this in the fourth week? Check back on that workshop if you can't remember. We've provided you with a couple of sound files in the project, but you can obviously use your own if they are small .mp3s.</li>
       <li>Instead of connecting the player to a crossfading mixer like last time, this time we'll just connect it directly to the master out using the .toDestination method.</li>
       <li>We will also create a new <a href="https://tonejs.github.io/docs/14.7.58/Meter.html" target="_blank">Tone.Meter</a> object. This will allow us to the get RMS level of our audio signal so that we can apply it our robot's position.</li>
       <li>We will then set the smoothing property of our meter to 0.8. Remember, we access the meter's properties by using the dot (.) operator.</li>
       <li>Finally, we need to connect the player to the meter using the .connect() method, the syntax for this can be found in the first example on the webpage linked above from Tone.js documentation. </li>
      
    </ul>

     <p>Now, in our time controlled code inside our update() function i.e inside <code> if (delta > interval) {} </code>, we will need to do the following:</p>
    <ul>
       <li>Create an if statement to check whether our robot model has loaded. Remember, we already made this boolean variable and it gets set to true once the robot has loaded.</li>
       <li>Inside that if statement, we're going to constantly update robot.position.z to be a scaled version of the meter's value, by using the <a href="https://threejs.org/docs/#api/en/math/MathUtils" target="_blank">THREE.MathUtils.mapLinear</a> function. See the next points for an explanation</li>
       <li>As the input value to THREE.MathUtils.mapLinear we will call the meter.getValue() method belonging to meter.</li>
       <li>Then we will set the lower and upper input ranges to -60 and -12 respectively.</li>
       <li>Finally, we will set the lower and upper output ranges to 0.0 and 4.0 respectively.</li>
      
    </ul>

    <p>Now you should be able to see your robot move back and forth in relation to the sound level.</p>


    <h2>Task 3 - Sphere Synth</h2>

    <p>Now we're going to try a new little project project, it's a sphere synthesiser that plays a note and moves the sphere with the mouse. The note changes when the mouse is moved on the x axis and the volume of the synth is mapped to the y position of the mouse.<p/>

    <iframe src="https://codesandbox.io/embed/w06t03end-hwn54?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W06_T03_END"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

   <p></p>

   <p><strong>For this task, start by this version forking our normal base template linked just below:</strong></p>

   <iframe src="https://codesandbox.io/embed/w06t03end-forked-q8jdc?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W06_T03_START"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   

   OK, once again, let's get going by adding some global variables towards the top of our index.js file:

   <p></p>
   <code>
  <CodeBlock text = {`let geometry, material;
let planeGeometry, planeMaterial;
let planet, plane;
let mouseDown;
let raycaster, mouse, intersects;
let synth, synthNotes;
let effect, reverb;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>
<p>Just below where we remove the overlay in our init() function, let's initialise some of those variable. First we'll start tone; then initialise our mouseDown boolean flag to false, then we'll may a delay effect and a reverb effect.</p>
<p></p>
   <code>
  <CodeBlock text = {`Tone.start(); // ensure Tone starts and that audio will be processed
  mouseDown = false; // initialise mouse down to be false
  effect = new Tone.FeedbackDelay().toDestination(); // create a delay effect and connect it to the master output
  reverb = new Tone.Reverb({
    // connect a reverb effect and connect it to the master output
    decay: 2, // decay time of 2 seconds.
    wet: 1.0, // fully wet signal
    preDelay: 0.25 // pre-delay time of 0.25 seconds
  }).toDestination();`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

   <p>The rest of our main audio stuff can now be added directly below. We're going to create an array with some musical note data; then we'll make a synth that has a bit of glide. Finally we'll connect the synth to the effects.</p>

    <p></p>
   <code>
  <CodeBlock text = {` synthNotes = [
    // create an array with some choice notes in it
    "C2",
    "E2",
    "G2",
    "A2",
    "C3",
    "D3",
    "E3",
    "G3",
    "A3",
    "B3",
    "C4",
    "D4",
    "E4",
    "G4",
    "A4",
    "B4",
    "C5"
  ];

  synth = new Tone.MonoSynth().toDestination(); // create an instance of a monosynth and connect it to the master output
  synth.set({
    // set some default settings
    portamento: 0.1, // a bit of glide
    volume: -10, // reduce the level by 10dB

    oscillator: {
      // set the oscillator type to sawtooth
      type: "sawtooth"
    },

    envelope: {
      // set the envelope settings
      attack: 0.005,
      release: 2.0,
      sustain: 0.5
    }
  });

  synth.connect(effect); //connect the synth to the delay
  synth.connect(reverb); //connect the synth to the reverb`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>
   

<p>OK great, now, just below where we add the lights to our scene in init() let's initialise the stuff we need for our mouse interactions. They are a Raycaster, the intersects array and a mouse position vector.</p>

 <p></p>
   <code>
  <CodeBlock text = {`raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  intersects = [];`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

   <p>OK our visual aids in this scene are going to be quite simple. We're going to add a ground plane and a planet that we will use as our synthesiser controller.</p>

 <p></p>
   <code>
  <CodeBlock text = {`planeGeometry = new THREE.PlaneGeometry(7, 7); 
  planeMaterial = new THREE.MeshPhongMaterial({
    color: 0x919191,
    side: THREE.DoubleSide
  });
  plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.position.set(0, -0.5001, 0);
  plane.receiveShadow = true;
  plane.rotation.set(Math.PI / 2, 0, 0); // rotate around the x axis to become flat
  plane.shadowColor = 0xffffff;
  scene.add(plane);
  geometry = new THREE.SphereGeometry(1.5, 32, 32);
  material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    wireframe: false
  });
  planet = new THREE.Mesh(geometry, material);
  scene.add(planet);
  planet.castShadow = true;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>
 <p>Now, towards the bottom of the init() function, just above where we added our onWindowResize event listener, let's add some new event listeners. These will listen for mouse events. We're using the "pointer" terminology here just to avoid any possible conflicts with our OrbitControls object.</p>

   <p></p>
   <code>
  <CodeBlock text = {` // add our event listeners for pointer as opposed to mouse as this stops conflicts with OrbitControls
  window.addEventListener("pointermove", move, false);
  window.addEventListener("pointerdown", triggerAttack, false);
  window.addEventListener("pointerup", triggerRelease, false);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>
<p></p>
<p>OK, you should now be seeing an error that the event handler functions don't exit. Let's start to define them at at the bottom of our index.js file, below the onWindowResize function. </p>
<p>First of all, let's handle when the mouse point is down. Just to test, let's just define the functions with console.log statements in to make sure they're working:</p>

<code>
  <CodeBlock text = {`function triggerAttack(event) {

  console.log("down");
 
}

function move(event) {

  
 
}

function triggerRelease() {

  console.log("up");
 
}

`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

<p>OK now that's working, let's put the rest of the code in. For triggerAttack. Again, there's a fair bit going on so please read the comments for explanations</p>
   <code>
  <CodeBlock text = {`function triggerAttack(event) {
  console.log("down");
  raycaster.setFromCamera(mouse, camera); // create our ray
  intersects = raycaster.intersectObject(planet); // test whether our ray is intersecting with our planet object

  if (intersects.length > 0) {
    //if there is something in our array
    mouseDown = true; // set mouseDown boolean flag to true
  }

  
  const note =
    synthNotes[
      Math.round((event.clientX / sceneWidth) * (synthNotes.length - 1)) // constrain our mouseX position using Math.round to create an integer index that can be used to pick a note from our note array
    ];

  if (mouseDown) {
    // Make the sphere follow the mouse
    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5); // create a new 3D vector using our mouse position
    vector.unproject(camera); // project mouse vector into world space using camera's normalised device coordinate space
    let dir = vector.sub(camera.position).normalize(); // Create a direction vector based on subtracting our camera's position from our mouse position
    let distance = -camera.position.z / dir.z; // derive distance from the negative z position of the camera divided by our direction's z position
    let pos = camera.position.clone().add(dir.multiplyScalar(distance)); //create a new position based on adding the direction vector scaled by the distance vector, to the camera's position vector
    planet.position.copy(pos); // copy our new position into the planet's position vector
    synth.triggerAttack(note); // trigger the envelope on the synthesiser
    planet.material.color.setHex(0xff00ff); // change the colour of our planet to purpley pink
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>
<p>Our move function is pretty similar to the triggerAttack one. The main difference now being that instead of trigger the envelope on the synth, we're just updating the note and the volume based on the mouse position if the mouse is down.</p>
   <code>
  <CodeBlock text = {`function move(event) {
  mouse.x = (event.clientX / sceneWidth) * 2 - 1; // convert our mouse x position to be a value between -1.0 and 1.0
  mouse.y = -(event.clientY / sceneHeight) * 2 + 1; // convert our mouse y position to be a value between -1.0 and 1.0
  const note =
    synthNotes[
      Math.round((event.clientX / sceneWidth) * (synthNotes.length - 1))
    ]; // constrain our mouseX position using Math.round to create an integer index that can be used to pick a note from our note array

  if (mouseDown) {
    // Make the sphere follow the mouse
    let vector = new THREE.Vector3(mouse.x, mouse.y, 0.5); // create a new 3D vector using our mouse position
    vector.unproject(camera); // project mouse vector into world space using camera's normalised device coordinate space
    let dir = vector.sub(camera.position).normalize(); // Create a direction vector based on subtracting our camera's position from our mouse position
    let distance = -camera.position.z / dir.z; // derive distance from the negative z position of the camera divided by our direction's z position
    let pos = camera.position.clone().add(dir.multiplyScalar(distance)); //create a new position based on adding the direction vector scaled by the distance vector, to the camera's position vector
    planet.position.copy(pos); // copy our new position into the planet's position vector
    synth.setNote(note); // update our synthesiser's note
    let volume = THREE.MathUtils.mapLinear(
      // map the y position to volume of the synth. Output range is in decibels
      mouse.y, //input value
      -1.0, // lower input range
      1.0, // upper input range
      -60, // lower output range
      -3 // upper output range
    );
    synth.volume.linearRampTo(volume, 0.01); // set new volume level with a ramp of 0.01 seconds
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>

<p>Our final function at the very bottom of index.js now simply releases the envelope and returns our sphere to it's grey colour.</p>
   <code>
  <CodeBlock text = {`function triggerRelease() {
  mouseDown = false; // set mouseDown flag to false
  console.log("up");
  synth.triggerRelease(Tone.now()); // trigger the release phase of our synth's envelope
  planet.material.color.setHex(0x919191); // return planet's colour to it grey
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

  </code>
<p></p>
   

    <p>OK so hopefully now you have made a couple of little fun projects this week! Here are some stretch goals:
    <ul>
    	<li>For the first project in tasks 1 and 2, try and find another low poly model, perhaps from <a href="https://sketchfab.com/" target="_blank">Sketchfab</a>, where you'll have to create an account. Or you can download the <a href="https://github.com/mrdoob/three.js/" target="_blank">Three js</a>  three js development files from github, and these contain loads of models in the examples folder</li>
      <li>For sphere synth project (task 3), can you add some instructions to the overlay at the start so that it makes it easier to use?</li>
    	<li>Again, for the sphere synth project (task 3), can you package the sphere and sound functionality up into classes in a separate javascript file? Then you could make multiple sphere synths with different kinds of sound properties to make an instrument. Take a look at the <a href="https://tonejs.github.io/examples/" target="_blank">Instruments Section</a> on the Tone.js examples site for some inspiration.</li>
    	<li>Also for the sphere synth project. Could you adapt it to make it respond to keyboard key presses rather than mouse interaction? </li> 
    </ul>
    </p>

    <p>Right we're at the final task for this workshop hooray! Nice one for making our two little projects! </p>
    <p>Super important final task: go to file->export to .zip in your codesandbox and download your project!</p>
    <p>Remember how critical it is to keep a good folder structure? Make sure you start as you mean to go on and make a folder for this module, then another folder inside that one called "week 6".</p>
   

    <Link to="/">Go back to the homepage</Link>
    </p></p></p>
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "WS03/WS3dependencies.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
        }
      }
    }
  }`

export default Workshop06
