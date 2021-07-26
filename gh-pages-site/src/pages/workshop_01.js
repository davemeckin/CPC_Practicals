import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navbar from "../components/navbar"
//import CodeBlock from "../components/codeblock"
import { CopyBlock } from "react-code-blocks";
import { CodeBlock, dracula, github } from "react-code-blocks";
import "../components/layout.css"

//var thisIsMyCopy = "function myTimer() \n { \n let d = new Date();document.getElementById(\"demo\").innerHTML = d.toLocaleTimeString();}";

const Workshop01 = () => (
  <Layout>
  <Navbar/>
    <SEO title="Workshop 01" />
    <p></p>
    <h1>Hello and welcome!</h1>
    <p>This first workshop will get you up to speed with making all the building blocks for a creative computing three js project. In this workshop we will:</p>
	<p>
     <ul>
		  <li>Play about with some basic HTML/CSS/JS </li>
		  <li>Create our first project in codesandbox</li>
		  <li>Make a basic Three js scene with a spinny cube and play a looping soundfile - kind of like the "hello world" of 3D Web creative computing!</li>
	</ul>
	<strong>Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.</strong>
	</p>
    

    <h2>Task 1 - Tooling Up</h2>
    <p>OK, so here goes with our first task, we're just going to get to know our development environment a bit. For the first semester, we will be using the most bleeding edge tools on the interplex to facilitate our learning and creativity. 
    No, I don't mean Dave, Phill and Tom, I mean codesandbox, Three.js and Tone.js!</p>

    <p>You will be working in two browser windows for these worksheets, generally. So when we provide a start codesandbox embedded in the workshop just click on the "Open Sandox" button in the bottom right hand corner and it will open up a new tab with that sandbox ready for you to work in. You can then click the "fork" button in the top right hand corner which will automatically create a new project with this template as a starting point.

    Take a look around the starter codesandbox we created below. You should be able to see that there are tabs across the top with various different
    file names: index.js; package.json; styles.css and index.html.</p>

    

   	<p>index.js is actually empty right now apart from a couple of <code>import</code> statements. In modern JavaScript, we are able to import modules that allow us to use other peoples' libraries with ease.
   	As you'll be aware from the lecture, we're using Three.js and this is the syntax we use to get Three into our index.js so we can start using it. More will be explained later.</p>

   	<p>Just to demonstrate how quickly we can start to develop our web project we're going to add a divider (<code> {"<div>"} </code>) and within that make a button (<code> {"<button>"} </code>) that says "play" on it, head into the index.html tab and add the following HTML elements directly below (create a new line) the first <code> {"<body>"} </code> tag:</p>
	 <p>
	 <code>
    <CodeBlock text = {`<div id="overlay">
	<button id="startButton">Play</button>
</div>`} language = {"html"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>
	</p>
    <iframe src="https://codesandbox.io/embed/silly-hellman-3w4cz?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="CPC_W01_T01"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

   <p>You should see a button appear saying "play" on it - that button won't do anything yet but you can see how quickly we can build an interface... You can also add a bunch of other HTML elements if you want to customise your page. </p>
   <p>Now, as we talked about in the lecture, codesandbox is a development environment that kind of bridges the gap between prototyping playground and pro developers sharing ideas.
   I'm not going to big it up too much but it's <strong>RUDDY GREAT.</strong></p>

   <p>It gives us a fully functional development environment with nice code editor, embedded test-browser and console all within the comfy home of our favourite web browser.
   We can also collaboratively edit code together, which in these remote-times is pretty incredible and will allow us to help you along the way. There are a whole lot of other features but let's just leave it there to stop me talking about how wonderful it is...</p>


   <p><strong>Please now go to <a href="https://codesandbox.io/" target="_blank">codesandbox</a> and create an account, we recommend using your UWE email but you can also use a personal one if you'd prefer.</strong></p>
    <h2>Task 2 - The Unholy Trinity: HTML/CSS/JavaScript</h2>

    <p> This is the basic "vanilla" starter that you get with codesandbox</p>
    <p> 
    OK now we're going to do a few more steps just to display the current time:
    <ul>
		  <li>Add another html <code> {"<div>"} </code> element in index.html with an id named "demo" <strong>HINT:</strong> try taking a look at task 1 to see how to do that, remember we need a pair of tags </li>
		  <li>You won't necessarily see anything yet but we're going to add our timer function</li>
		  <li>Now, in index.js (NOT index.html) try doing a timed operation with setInterval to display time using the following code:</li>
	</ul>

    
    
    </p>
    <code>
    <CodeBlock text = {`let timer = setInterval(myTimer, 1000); // declare a variable and assign it to the setInterval function supplying myTimer as the callback and a 1 second interval as parameters
function myTimer() {
  let d = new Date();
  document.getElementById("demo").innerHTML = d.toLocaleTimeString();
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

   

	<p></p>
		

   
    <iframe src="https://codesandbox.io/embed/cpcw01t02-1wdos?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="CPC_W01_T02"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

   <p>So you should be able to see how quickly we can <em>dynamically</em> update our index.html through the use of JavaScript and the power of codesandbox. But let's face it, that's not particularly creative, and we're here to make some shapes and noises, so let's move on to using Three.js to create a simple scene</p>

    <h2>Task 3 - Three.js</h2>
    <h5>Task 3.1</h5>
    <p></p>

     <ul>
		  <li>OK, now we've created a new vanilla codesandbox below, but you can do this by navigating to the main site (not the one embedded below) so go and give that a try using your new account. </li>
		  <li>Right, we're just going to repeat task 1 now and add our overlay and buttons in index.html</li>
		  <li>Then let's just delete everything in index.js</li>
		  <li>In the sandbox below, we've taken care of the styling for now, but try styling your play button using the id (<a href="https://www.w3schools.com/css/css3_buttons.asp" target="_blank">Here</a> is a short tut on how you do that)</li>
	</ul>

	<iframe src="https://codesandbox.io/embed/cpcw01t0301-915ht?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="CPC_W01_T03_01"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

    <h5>Task 3.2</h5>
    <p>
    From now on, we're going to have to work across two browser tabs: this workshop page and your codesandbox project. We've embedded the codesandboxes for each step below so you can see where we get to each after each step.
    </p>
    <iframe src="https://codesandbox.io/embed/cpcw01t0301-915ht?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="CPC_W01_T03_01"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
	<p> First of all we need to add the Three.js library as a dependency in our project. This is basically just telling our codesandbox "hey please include this file when building as we're going to import it into our project". To do this, navigate to the dependencies dropdown (in the explorer tab on the left or in the top left burger menu if you're using the embedded sandbox below). Then in the "add dependency" field just type "three" and click to add the dependency. Simple!</p>
    <p></p>
    
    <p>Now we're going to add some lines at the very top of our index.js that import our Three.js library and also a thing called OrbitControls which will allow us to interact with our project to scroll around using the mouse:</p>
    <code>
    <CodeBlock text = {`import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./styles.css";`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>
<p></p>
	<ul>
		<li>We're going to create a whole bunch of variables that we're going to use later (some we won't actually use in this workshop). These should all be fairly familiar from the first lecture but will become clear as we go on...</li>
		  <li>Next, we're going to assign start button to variable and add the init() function as the "click" callback by using the addEventListener() method. This means that init() will be called when the button is clicked </li>
	</ul>
    
    
	<code>
    <CodeBlock text = {`let scene, camera, renderer;
let geometry, material, cube;
let colour, intensity, light;
let ambientLight;

let orbit;

let listener, sound, audioLoader;

let clock, delta, interval;

let startButton = document.getElementById("startButton");
startButton.addEventListener("click", init);
`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>
    
	<p></p>
    <p>OK for now, we're just going to add an alert() in the our init() function to ensure that we have everything working and we can move on to the next step: </p>
    <p></p>

	<code>
    <CodeBlock text = {`function init() {
    	alert("We have initialised!");
    }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
   <p></p>
    <h5>Task 3.3</h5>
    <p> Here's where we got to, feel free to work from this one if you ran into any errors on the last task (we're going easy in these first couple of sessions :))</p>
     <iframe src="https://codesandbox.io/embed/cpcw01t0302-5y63w?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="CPC_W01_T03_02"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   <p>This is a bit of a big chunk as we're now going to set up all the various bits and pieces we talked about in the lecture in terms of the building blocks of a Three.js project.</p>
   <p>At the top of the init() function, delete the alert as we're no longer going to need that. Then, the first thing we're going to do is remove the overlay once our "play" button is pressed, so add this code <strong> inside </strong> the init() function:</p>
   <code>
   <CodeBlock text = {`// remove overlay
  let overlay = document.getElementById("overlay");
  overlay.remove();`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
   <p></p>
    <p>Right, below the section of removing the overlay but still in the the init() function, let's make our scene and set the background to a light grey:</p>

    <code>
   <CodeBlock text = {`//create our scene
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdfdfdf);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
<p></p>
    <p>Still within the init() function, we're going to add another fundamental part of our project, the camera. We initialise the camera with the folling parameters: 
    <ul>
    	<li>fov — Camera frustum vertical field of view.</li>
		<li>aspect — Camera frustum aspect ratio.</li>
		<li>near — Camera frustum near plane.</li>
		<li>far — Camera frustum far plane.</li>
	</ul>
	</p>

    <code>
   <CodeBlock text = {`//create camera
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
<p></p>
     <p>Beneath that but still in the init() function, let's just move the camera back a bit on the z axis by accessing its position propery using the got operator and assigning it to the number 5. This will ensure we can actually see the stuff we're drawing later and we're not INSIDE it looking out:</p>

     <code>
   <CodeBlock text = {`camera.position.z = 5;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
   <p></p>
   <p>Still within init(), we're going to create our renderer. This is the bit that is actually going to draw our cool stuff to the screen. We're going to enable anti aliasing (see <a href=" https://en.wikipedia.org/wiki/Spatial_anti-aliasing" target="_blank">here</a> for a bit more info about what that is. And then we're going to add our renderer to our HTML page. This creates a HTML5 canvas and enables WebGL to create our 3D world:</p>

   <code>
   <CodeBlock text = {`//specify our renderer and add it to our document
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
<p></p>
    <p>Finally, still within init() we're going to create our orbit controls which will let us interact with the scene and change the position of the camera using our mouse. Just a couple of lines, and then in the last line of init() we will call our play() function which we'll define below:</p>

    <code>
   <CodeBlock text = {`//create the orbit controls instance so we can use the mouse move around our scene
  orbit = new OrbitControls(camera, renderer.domElement);
  orbit.enableZoom = true;
  play();`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>

   <p></p>
    <p>OK below our init() function let's define our play() and stop() functions. In the play() function, we supply an anonymous function to the renderer which will loop continually and that will call our update() function and our render() function (defined below). This is essentially the basics of building a game engine structure. The stop() function will just be there to kill the game loop if need be: </p>
     <code>
   <CodeBlock text = {`// start animating

function play() {
  //using the new setAnimationLoop method which means we are WebXR ready if need be
  renderer.setAnimationLoop(() => {
    update();
    render();
  });
}
// stop animating (not currently used)
function stop() {
  renderer.setAnimationLoop(null);
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
<p></p>
    <p>Right, nearly there. Below play() and stop() let's add our update() function. As you can see, this will be called on loop by the renderer. For now, we're just going to update our orbit controls object like so:</p>
    <code>
   <CodeBlock text = {`//our update function

function update() {
  orbit.update();
  //update stuff in here
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
<p></p>
   <p>And then finally at this stage, we're going create our render function in which we will pass our scene and camera to the renderer to render!</p>

    <code>
   <CodeBlock text = {`// simple render function

function render() {
  renderer.render(scene, camera);
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
   <p></p>
   <p>But, argh! We still can't see anything apart from a blank screen as we haven't actually put anything into our scene yet! All that for a blank screen?! Well, not to worry, this whole exercise is building us a template which we can reuse again and again in later tutorials.</p>
    
    <h5>Task 3.4</h5>
    <p></p>
    <p>Here's where we got to after that last mammoth step:</p>
    <iframe src="https://codesandbox.io/embed/w01t0304-ffgjf?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W01_T03_03"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<p></p>
   <p>
   Like we said, we can't actually see anything yet so for that we need to add some light and an object. Head back into the init() function, just above the bit where we call play().
   Let's add a couple of lights to our scene, one directional and one ambient:</p>
   <code>
   <CodeBlock text = {`// lighting
  colour = 0xffffff;
  intensity = 1;
  light = new THREE.DirectionalLight(colour, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
  ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
   <p></p>
    <p>Now, remember what we were talking about in the lecture regarding the fact that meshes are made up of geometries and materials. Let's create a very simple cube with a basic materials:</p>
    <code>
   <CodeBlock text = {`// create a box to spin

  geometry = new THREE.BoxGeometry();
  material = new THREE.MeshNormalMaterial(); 
  cube = new THREE.Mesh(geometry, material);

  scene.add(cube);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
   <p></p>
   <p>Hopefully you can now see a cube?! So, this has been a long time coming but because we've worked in this way it's now very easy for us to start animating. Let's change our update function to manipulate the properties of our cube and spin it around a bit. </p>
    <code>
   <CodeBlock text = {`//our update function

function update() {
  orbit.update();
  //update stuff in here
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.04;
  cube.rotation.z -= 0.01;
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
   <p></p>
   <p>What happens if you change cube.rotation.x to cube.position.x?!</p>

    <h2>Task 4</h2>

    <p></p>
     <p>
    As we discussed in the lecture, one of the things that makes this module different from others around and about is that it is focused on audio-visual stuff, rather than just visual or just audio. With that in mind, let's add a sound to our project. Here's where we got to after task 3 </p>
    
     <iframe src="https://codesandbox.io/embed/pedantic-dew-99og2?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W01_T03_04"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
   
	<p>For now, we're just going to use Three.js's sound capabilities which allow us to play back sound files and some simple panning etc. Hopefully you're now comfortable with the interface of codesandbox. So make a new folder in the root directory (i.e a new folder outside the one called "src") in your codesandbox project 
    and call it "sounds".</p>
    <p>
    Use the upload button to upload a sound file. Ideally we will use a .mp3 as they're smaller. We made a <a href="https://uweacuk-my.sharepoint.com/:f:/g/personal/dave_meckin_uwe_ac_uk/Enjdizr--AhKhGku2oxVW9QB2kmkvOr7sn98KoDl2Rlqhg?e=kGB8hN" target="_blank">simple looping drone sound called CPC_Basic_Drone_Loop.mp3</a> that you can download if you'd prefer to use this for speed's sake. Download it then upload to your "sounds" folder on codesandbox.
    

  
    </p>
   	 <p>OK so let's head back into our init() function again. We're going to go just above that final line where we call play() and add some stuff so that we can generate and listen to sound. We're going to make a lister which we will attach to our camera, then we will create a sound generator which will play back audio and will do some panning depending on where the camera is:</p>

   	 <code>
   <CodeBlock text = {`//sound for single source and single listener

  listener = new THREE.AudioListener();
  camera.add(listener);
  sound = new THREE.PositionalAudio(listener);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
   <p></p>
   <p>Finally, we're going to load our audio file and set a bunch of parameters on our positional audio object to that it loops and plays audio in a specific direction etc: </p>
   	 <code>
   <CodeBlock text = {`audioLoader = new THREE.AudioLoader();
  audioLoader.load("./sounds/CPC_Basic_Drone_Loop.mp3", function (buffer) {
    sound.setBuffer(buffer);
    sound.setRefDistance(10);
    sound.setDirectionalCone(180, 230, 0.1);
    sound.setLoop(true);
    sound.setVolume(0.5);
    sound.play();
  });`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
<p></p>
<p>OK cool, try moving around your 3D world and experiment with how the sound changes based on the position of the camera!</p>
    <h2>Task 5</h2>
    
    <p>"Just one more thing..." as Columbo would say. Being as how we're in a web browser and those pesky users of our stuff might resize their window. We need to add some code in our main template to ensure that our scene gets resized accordingly.
    Let's define a couple of variable towards the top of index.js:</p>

    <code>
   <CodeBlock text = {`let sceneHeight, sceneWidth;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
<p></p>
<p>Then, just above where we create our new scene in the init() function, let's initialise those variables to be the window sizes:</p>
<code>
   <CodeBlock text = {`sceneWidth = window.innerWidth;
  sceneHeight = window.innerHeight;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
<p></p>
<p>Now, towards the bottom of init(), just before we call play, let's add a thing called an event listener. This is will react when it senses the window being resized and call a function called onWindowResize:</p>
<code>
   <CodeBlock text = {`window.addEventListener("resize", onWindowResize, false);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
<p></p>

  

  
    <p>Finally, right at the bottom of your index.js, let's define the onWindowResize function. This just updates our variables and sets the new size of the scene based on the window size...</p>
     <code>
   <CodeBlock text = {`function onWindowResize() {
  //resize & align
  sceneHeight = window.innerHeight;
  sceneWidth = window.innerWidth;
  renderer.setSize(sceneWidth, sceneHeight);
  camera.aspect = sceneWidth / sceneHeight;
  camera.updateProjectionMatrix();
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />

    
   </code>
<p></p>
    <h2>Task 6</h2>


    
    <p>Right we're at the final task for this workshop hooray! Nice one for making our "hello world" but also creating a template that we can work from from now on. One final thing to experiment with, try adding a <a href="https://threejs.org/docs/#api/en/helpers/GridHelper" target="_blank">grid helper</a> to your scene and see how that changes the visual landscape. This is a tiny stretch goal so we're not going to tell you exactly how to do it!</p>
    <p>Super important final task: go to file->export to .zip in your codesandbox and download your project!</p>
    <p>Remember how critical it is to keep a good folder structure? Make sure you start as you mean to go on and make a folder for this module, then another folder inside that one called "week 1".</p>
   
    <iframe src="https://codesandbox.io/embed/w01t04-djglq?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W01_T04"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>


    
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Workshop01
