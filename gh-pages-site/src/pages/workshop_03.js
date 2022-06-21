import React from "react"
import { Link } from "gatsby"

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
import "../components/layout.css"

//var thisIsMyCopy = "function myTimer() \n { \n let d = new Date();document.getElementById(\"demo\").innerHTML = d.toLocaleTimeString();}";

const Workshop03 = () => (
  <Layout>
  <Navbar/>
    <SEO title="Workshop 03" />
    <p></p>
    <h1>Hello and welcome back!</h1>
    <p>This third workshop will demonstrate the beginnings of how we can create generative systems in 3D to create simple structural forms. So, we will:</p>
	<p>
     <ul>
		  <li>Work from the template we made from the second workshop  </li>
		  <li>Create our first generative system called a "Random walker" which is going to plot shapes in 3D space with a mind of its own</li>
		  <li>Attach a sound to our random walker</li>
		  <li>Have some space to play around with customising our system - it is important that you try all the things in Task 6 as this is where you will learn the most</li>
	</ul>
	</p>

	<p>Here's what we're going to be building:</p>

	<iframe src="https://codesandbox.io/embed/cpcw02end-xgto0?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="CPC_W02_END"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

	<p><strong>Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.</strong>
	</p>
    

    <h2>Task 1 - Picking up from where we left off</h2>
    <p>
      It is better to just work from the sandbox you created last week. You can just go to file and fork sandbox. If, for some reason, you did not manage to complete last week's worksheet. You can for the template below:
	</p>
   
  <iframe src="https://codesandbox.io/embed/happy-https-1jk7g?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W02_T02"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

   <p></p>
  
   <p>If you didn't quite get there last time, go ahead and add a <a href="https://threejs.org/docs/#api/en/helpers/GridHelper" target="_blank">grid helper</a> to your scene.</p>
    <h2>Task 2 - Timing Events</h2>

    <p>The eagle eyed amongst you may have noticed that in our starter template we defined a clock but we never actually used it. Well, that's because we didn't really need it when spinning a simple cube, but when we want to do more complex things, we may not want to lock them into 
    the frame rate of our project. Three.js by default runs at 60 frames per second. And although we can change that, sometimes it's good to be able to time operations slower than the framerate. </p>

  

   <p>With that in mind, let's create our clock object and initialise our delta and interval variables. We're going to do this at the top on the init() function just after we remove the overlay:</p>
   <p></p>

    <code>
    <CodeBlock text = {`// clock generator to ensure we can clamp some operations at different timed rates if needed

	clock = new THREE.Clock();
	delta = 0;
	interval = 1 / 12; // 12 fps
  `} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

	<p></p>
    <p>So, let's change our update such that we get the delta from our clock object (the amount of time elapsed since we last checked, see <a href= "https://threejs.org/docs/#api/en/core/Clock" target="_blank">here</a> for more info). Then we create an if statement to check whether that delta is higher that our interval.
    Within that is where we can perform our timed operations, and finally we just reset delta to being the modulus of our interval variable:</p>

    <p></p>

  <code>
  <CodeBlock text = {`function update() {
  orbit.update();
  //update stuff in here
  delta += clock.getDelta();

  if (delta  > interval) {
    // The draw or time dependent code are here
    delta = delta % interval;
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

	<p></p>

	<p>Try adding a line within the if statement that says: <code> {"console.log(\"Hi\", delta);"} </code>. Can you open the console in codesandbox to see the result? What happens if you change interval to 1/2 instead?</p>

	<p></p>

    <h2>Task 3 - Our JavaScript Walker Class</h2>

    <p>
    What we're building is a kind of random plotter. It's going to create a point in our 3D world, then make a decision to randomly move to the next location and draw a point there. And so on and so forth, there's a 2D version developed by Dan Shiffman over <a href= "https://natureofcode.com/book/introduction/" target="_blank">here</a>. Now, we could potentially do this using a simple function, but we're 
    intermediate level creative coders/technologists now so let's just go right ahead and create a class. Once you've had a go and this, if you're unsure about the stuff we talked about in the lecture, please digitally raise your hand during the workshop session and we can come and talk it over with you.
    </p>

    <p>The sandbox below is the solution from the last task. You do not need to fork this sandbox.</p>

    <iframe src="https://codesandbox.io/embed/w02t03-g44ob?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W02_T03"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
    <p></p>
    <p>Like we said in the lecture, and as we've repeatedly said on Digital Media BSc, a class is like a blueprint.	Then we can use the "new" keyword to create in instance of that class, assign to a variable and use it later in our code. So, first we need to define the class, and in JavaScript, we add a constructor function which is called when we use the "new" keyword.
    Then we're going to define a one other function that our class is going to do once we've made it: step(). So add the following code beneath your init() function:</p>
    <p></p>
    <code>
    <CodeBlock text = {`class Walker {
	constructor() {
		
	}

	step() {
	
		
	}
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

    <p></p>
    <p>OK cool, so we have the shell of our class but if we made a new walker right now, it wouldn't do anything. So let's populate it with some functionality. First of all, we want to be able to supply a starting position, and because we're working in 3 dimensions, that position will consist of three coordidates (x,y,z). Then we need to assign these to variables within our class, to do that, we use the "this" keyword. Finally, we just going to
    use a single CubeGeometry for now, so let's go ahead and make that. We will reuse this geometry every time we draw a new "thing" in 3D space. (I'm using the word "thing" as it doesn't have to be a cube, could be another shape, or even a custom 3D model):</p>
     <p></p>
    <code>
    <CodeBlock text = {`constructor(x,y,z) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.dotGeometry = new THREE.CubeGeometry();
	}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

    <p></p>
	<p>Next, we want to create a "roll of the dice" type scenario to decide which way we are going to move in 3D space before drawing our next dot. We can use the inbuilt Three js functionlity for creating random numbers (similar to p5 in this way) from the MathUtils object. Then we just have 
	a series of "if else" statements to make our movement decision, as follows:</p>
       <p></p>
    <code>
    <CodeBlock text = {`step() {
	let choice = THREE.MathUtils.randInt(0,5);
	 if (choice == 0) {
	      this.x += 0.5;
	    } else if (choice === 1) {
	      this.x -= 0.5;
	    } else if (choice === 2) {
	      this.y += 0.5;
	    } else if (choice === 3) {
	      this.y -= 0.5;
	    } else if (choice === 4) {
	      this.z += 0.5;
	    } else {
	      this.z -= 0.5;
	    }
	}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>
  <p></p>

   <Accordion allowZeroExpanded = "true">
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        If you want to see a slightly more shorthand way of achieving a similar output, this could also work (there are plenty of ways to skin a cat in creative coding)
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        <code>
    <CodeBlock text = {`  step() {
 // generate a position relative to the current one
 let axis = THREE.MathUtils.randInt(1, 3);
 let amnt = THREE.MathUtils.randInt(-1, 1);
 if (axis === 1) this.x += amnt;
 if (axis === 2) this.y += amnt;
 if (axis === 3) this.z += amnt;
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>
        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            
      </Accordion>

    <p></p>
	<p>Then, finally, still in our step() function, we actually want to draw a dot. Now, as we saw last time with drawing a cube, we do actually need quite a few lines of code to draw something because our "thing" is always made up of separate component parts: Geometry+Material are used to create a Mesh.
	What we're doing below is: 
	<ul>
    	<li>Creating a new material (which do this because we might want to change the colour for each "thing" later so we need an individual instance of the material).</li>
		<li>Changing the colour of the material.</li>
		<li>Creating a new mesh based on our geometry and the new material we just made.</li>
		<li>Updating that mesh's position property to the new location.</li>
		<li>Adding our new dot to our scene.</li>
	</ul>

	</p>
 <p></p>
	<code>
    <CodeBlock text = {`  this.dotMaterial = new THREE.MeshLambertMaterial({});
    this.dotMaterial.color = new THREE.Color(0.1,0.5,0.3);

    this.dot = new THREE.Mesh(this.dotGeometry, this.dotMaterial);
    this.dot.translateX(this.x);
    this.dot.translateY(this.y);
    this.dot.translateZ(this.z);
    scene.add(this.dot);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>
       

    <p></p>

    <h2>Task 4 - Instantiating and Updating the Walker</h2>
    <p></p>

    <p>So we have our blueprint, now we need to instantiate our walker by declaring a global variable at the top of our index.js file:</p>
    <code>
    <CodeBlock text = {`let walker;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>
	<p></p>
	<p>Then, at the bottom of our init() function just above where we call play() let's actually assign a new instance of Walker to our variable:</p>
	<p></p>
    <code>
    <CodeBlock text = {`walker = new Walker(0,0,0);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

	<p></p>

	<p>Next, let's call our step() function in our slower timed section of update():</p>

	<p></p>

    <code>
    <CodeBlock text = {`function update() {
  orbit.update();
  //update stuff in here
  delta += clock.getDelta();

  if (delta  > interval) {
    // The draw or time dependent code are here
    walker.step();
    delta = delta % interval;
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

	<p></p>
	<p></p>
	<p></p>

 
	<p></p>

    <p></p>

    <h2>Task 5 - Playing Sound</h2>

    <p>OK, the sound bit. We're going to trigger a single sound every time we make a new step, to really drive home the feel that this is like an infinite drawing machine. We chose this key tap sound which we're then going to pitch up. You can download your own sound or get the Gabriele100_Keyboard_Various-Keys_02.mp3 file from <a href="https://uweacuk-my.sharepoint.com/:f:/g/personal/dave_meckin_uwe_ac_uk/Enjdizr--AhKhGku2oxVW9QB2kmkvOr7sn98KoDl2Rlqhg?e=kGB8hN" target="_blank">here</a>. Or you are more than welcome to create your own sound
    but make sure it's a very short, percussive type sound. In your "sounds" folder, add the new audio file by updloading and then add the following code to replace your previous sound player code: </p>
    <code>
    <CodeBlock text = {`//sound

  listener = new THREE.AudioListener();
  camera.add(listener);
  sound = new THREE.PositionalAudio(listener);

  audioLoader = new THREE.AudioLoader();
  audioLoader.load(
    "./sounds/Gabriele100_Keyboard_Various-Keys_02.mp3",
    function (buffer) {
      sound.setBuffer(buffer);
      sound.setRefDistance(10);
      sound.setRolloffFactor(0.9);
      sound.playbackRate = 10;
      sound.offset = 0.1;
      sound.setDirectionalCone(180, 230, 0.1);
      sound.setLoop(false);
      sound.setVolume(0.5);
    }
  );`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

	<p></p>

	<p>You can check out what all the parameters we're setting on the THREE.PositionalAudio object <a href="https://threejs.org/docs/#api/en/audio/PositionalAudio" target="_blank">here</a>. </p>

	<p>Now, in the step() function, just below your series of if else statements where the choice of where the next step is made, let's trigger our sound with a bit of randomness in the start position of the audio file and volume, and ensure our sound only lasts for a short period of time - if you're using your own sound you will probably need to tweak these values:</p>
	<code>
    <CodeBlock text = {`  sound.isPlaying = false;
    sound.offset = 0.0 + Math.random() * 0.05;
    sound.setVolume(0.8 + Math.random() * 0.1);
    sound.duration = 0.1;
    sound.play();`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

	<p></p>
  <p>In the above code, we first manually set the <code>isPlaying</code> flag to false, which will let us retrigger the sound at higher rates (it throws an error otherwise). Then we randomise the place in the audio file where we start playing from and the volume. Finally we just tell it that the duration is only 0.1 seconds.</p>

    <h2>Task 6 - Stretch Task</h2>

    <p>OK so hopefully now you have made your random audio-visual walker, well done! Leave it running for a while to see how the structure grows over time. Here are a couple of stretch goals for you to work to really extend the knowledge you've developed so far:
    <ul>
    	<li>Change the geometry type to a different shape. Use <a href="https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html" target="_blank">this list</a> to try and implement something a bit more interesting than a cube... </li>
    	<li>Change the size and/or colours of the new object created depending on the step decision. So this would mean that you would have to update each "if else" statement to add code which would custimise the size and colour... HINT (if you look at the third slide of the lecture there's an interesting way of modulating colour based on the position hiding in plain site!</li>
    	<li>Change the sound that is played depending on the choice of which step direction is taken. This could mean separate PositionalAudio objects or dynamically setting the buffer of a single PositionalAudio object perhaps?</li>
      <li>Make another instance of walker and start it off at different 3D coordinates? And another? Can you build multiple structures?</li>
    </ul>
    </p>
   

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Workshop03
