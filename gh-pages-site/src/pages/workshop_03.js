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

const Workshop03 = ({data}) => (
  <Layout>
  <Navbar/>
    <SEO title="Workshop 03" />
    <p></p>
    <h1>Hello and welcome back!</h1>
    <p>The third workshop is aimed at helping you understand how we can start to apply deterministic and non-deterministic algorithms to our objects moving in space, to create emergent audio-visual experiences. So, we will:</p>
	<p>
     <ul>
		  <li>Work from the template we made from the first workshop  </li>
		  <li>Create our second generative system where we will start to apply forces to moving objects to create patterns in visuals and sound</li>
		  <li>Experiment with creating sine wave patterns</li>
		  <li>Experiment with using noise to create more non-deterministic patterns</li>
	</ul>
	</p>

	<p>Here's what we're going to be building (let it play for a bit to work out what's going on here):</p>
	<iframe src="https://codesandbox.io/embed/w03end-jil00?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W03_END"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
	

	<p><strong>Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.</strong>
	</p>
    

    <h2>Task 1 - Importing Libraries and Declaring Our Variables</h2>

     <p>
    If you have reached here without completing workshops 1 and 2, please return to those as this is where we make the template that we start from on the following workshops.
  </p>
  <p>Right, create a new codesandbox project using the final workshop 1 task as a template.</p>

    <p>First of all, we're going to use the same timing code from workshop 2, which means initialising the following variables towards the top of the init() function:</p>
   <p></p>

    <code>
    <CodeBlock text = {`// clock generator to ensure we can clamp some operations at different timed rates if needed

  clock = new THREE.Clock();
  delta = 0;
  interval = 1 / 2; // 2 fps`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>

  <p></p>
    <p>And then updating our update function as follows:</p>

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
  <p>We're actually only adding this in case we need to print some stuff to our console to debug in this task. Turns out printing at 60fps AND animating AND making sound is quite hardcore for the browser to handle...</p>
   
	
	<p>OK, in the explorer tab on the left hand, navigate to the dependencies search box. You should already be able to see that we have three as a dependency. Now we're going to add two more simply by searching for the names and selecting them. Let's add "tone" and "noisejs". So, your dependenices tab should look like this now:</p>
	
	<p></p>

	<div className="imageWrapper">
	<Img
        
        fluid={data.file.childImageSharp.fluid}
        alt=""
      />
      </div>
      <p></p>
	

	<p>At the very top of your index.js file where we import Three, let's also import Tone and Noisejs like so:</p>
	
	<p></p>
    <code>
    <CodeBlock text = {`import * as THREE from "three";
import * as Tone from "tone";
import { Noise } from "noisejs";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./styles.css";`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

    <p>And let's just go ahead and delete all the sound making stuff where we read the sound file and play it with THREE.PositionalAudio. We're moving on to using Tone.js this week so we'll be synthesising in the browser, rather than simply playing back audio files.</p>

    <p>Next up, we're going to declare some global variables near the top of our index.js, before we define the init() function. So, we've got the number of movers; a variable to hold a movers array which we'll use later, another variable for our synths array that we're going to make; and finally a variable to hold an array for our musical scale that we'll use to change the frequency of the synths:</p>
    <code>
    <CodeBlock text = {`let numMovers, movers, synths;
let musicalScale;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

    <p></p>

    <p>And in the init() function, let's move our camera back on the Z axis a bit so we can see what's going on:</p>
    <code>
    <CodeBlock text = {`camera.position.z = 25;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

    <p></p>

   <p></p>
  
   <p>If you didn't quite get there last time, go ahead and add a <a href="https://threejs.org/docs/#api/en/helpers/GridHelper" target="_blank">grid helper</a> to your scene.</p>
    
    <h2>Task 2 - Our Mover Class</h2>

    <p></p>


   <p>Just like last time with the random walker, we're going to create a class that holds all our data and encapsulates our functionality. This time we'll add an extra method called display(). Let's make this just below the init() function :</p>
   <p></p>

   <p></p>
    <code>
    <CodeBlock text = {`class Mover {
	constructor() {
		
	}

	update() {
	
		
	}

	display() {

	}
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

    <p></p>

    <p>Again, just like the walker, we'll add some parameters to pass to the constructor. And in the constructor we'll set the position and create some vectors that we will use later for moving our movers around the space.</p>
   <p></p>

   <ul>
    	<li>We're going to set the position</li>
    	<li>We're going to have an offset property too which will allow us to change the start point of our individual movers once we begin to move them</li>
    	<li>Our angle, velocity and amplitude vectors will be used when calculating our sine wave function later</li>
    	<li>Hopefully the geometry/material/box business is pretty familiar now :)</li>
		<li>And we're going to create an instance of noise for each mover which we will query later in the update function</li>
    </ul>

    <p></p>
    <code>
    <CodeBlock text = {`class Mover {
	constructor(x,y,z,offset) {

	this.x = x;
	this.y = y;
	this.z = z;

	    this.angle = new THREE.Vector3(0, offset, 0);
	    this.velocity = new THREE.Vector3(0.1, 0.01, 0.01);
	    this.amplitude = new THREE.Vector3(0.5, 2.5, 0.5);
	    this.geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
	    this.mat = new THREE.MeshPhongMaterial({
	      color: new THREE.Color(0.2, 0.2, 0.2)
	    });
	    this.box = new THREE.Mesh(this.geo, this.mat);
	    this.box.position.set(this.x, this.y, this.z);
	    this.noise = new Noise();
	    scene.add(this.box);

	}

	update() {
		this.angle.add(this.velocity);
	}

	display() {
		this.box.position.set(this.x,this.y,this.z);
  }
 
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

    <p></p>

     
    <p></p>

    

	<p>Right, towards the bottom of init() before we call play(), let's initialise the global variables we made earlier. We'll have 36 rows of movers, then we'll create the blank arrays that we're going to fill. <strong>(If you are running on an older machine, you might find you can only have numMovers of 18 or 24 here, because the audio side of things is quite CPU intensive)</strong>. And finally let's create our musical scale array which will be used later to pick the frequencies that we're going to have each mover play: </p>

	<code>
    <CodeBlock text = {`numMovers = 36;
  movers = [];
  synths = [];
  musicalScale = [0, 4, 7, 11, 14];`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

	<p></p>

    <h2>Task 3 - Creating a 2D Array of Movers</h2>

    <p>Now we're going to actually use our Mover class by using a 2 Dimensional array - an array of arrays! It will be a grid 36 boxes long and 18 wide. And we'll just set the x and z positions while leaving the y position at 0 as that is the thing that we'll be updating later. We will also leave the offset at 0 for now, just to demonstrate what happens when we change that:</p>
    
    <p>We're going to make this towards the bottom of the init() function above the line where we call play()</p>
    <p>Try creating your own two dimensional array of movers that have a the following initialisation arguments passed to them as they're created: <code>i - 10, 0, j - 5, 0</code></p>

     <Accordion allowZeroExpanded = "true">
            <AccordionItem>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        Don't worry if you're struggling, click the dropdown to see the solution
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <p>
                        <code>
    <CodeBlock text = {`//
  for (let i = 0; i < numMovers; i++) {
    for (let j = 0; j < numMovers / 2; j++) {
      movers.push([]);
      movers[i].push(new Mover(i - 10, 0, j - 5, 0)); // no offset yet
    }
  }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>
        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            
      </Accordion>
       
	<p></p>
    <p>OK so, not only do we need to create our movers, but we will also need to update them and display them using a for loop too. Let's change our update function to loop through all of our movers and update them:</p>

     <p></p>
       <code>
    <CodeBlock text = {`//our update function

function update() {
  orbit.update();
  //update stuff in here
  delta += clock.getDelta();

  if (delta > interval) {
    // The draw or time dependent code are here
    delta = delta % interval;
  }

  for(let i = 0; i < numMovers; i++) {

		for (let j = 0;j < numMovers/2; j++){
			movers[i][j].update();
		}	
	}
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>
<p></p>
  
    <p>The same is required for the display() function, which we call from render, so let's update that as follows too: </p>

     <p></p>
       <code>
    <CodeBlock text = {`// simple render function

function render() {
  for (let i = 0; i < numMovers; i++) {
    for (let j = 0; j < numMovers / 2; j++) {
      movers[i][j].display();
    }
  }
  renderer.render(scene, camera);
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

   	
	<p>So now we have everything in place to start moving our movers around to create some nice patterns.</p>
    

    <h2>Task 4 - Adding Oscillations and Noise</h2>
    <p></p>

    <p>Right we have our grid layout, but nothing is moving yet. First of all, let's make our movers oscillate update and down using the sine function. With all the vectors that we create earlier and the in built javascript sine function, we can do this really easily by adding the following line to the update method in our Mover class. Let's add it BELOW the line where we add the velocity and angle vectors:</p>
    

    <p>Check the slides / lecture recording to remind yourself of what the sine function will look like</p>
       <code>
    <CodeBlock text = {`this.y = Math.sin(this.angle.y) * this.amplitude.y;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

    <p></p>


     <p>Now you should be able to see your movers doing something, but they're all moving in synchrony right?! That's not what we want, we want to address each row individually and move them to create a sine wave pattern. In order to do this, let's pop back to where we create the movers in the init() function. We're going to change that offset paramter and update it such that updates the y value of the angle vector:</p>

    
       <code>
    <CodeBlock text = {`//
  for (let i = 0; i < numMovers; i++) {
    for (let j = 0; j < numMovers / 2; j++) {
      movers.push([]);
      movers[i].push(new Mover(i - 10, 0, j - 5, i * 0.25));
    }
  }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>
	<p>OK, now we're cooking!</p>

	<p>And from here, it's super easy to add a bit of Perlin noise that we talked about in the lecture too, for some extra generative behaviour. Let's go back to the update() method of our Mover class. We're just going to call the classic 2D perlin noise using our angle and amplitude as coordinates. Then we scale it a bit by multiplying it by 5. Finally we add that to our sine wave function and now we're really getting some interesting emergent patterns happening.</p>

	<p></p>
       <code>
    <CodeBlock text = {`let perl = this.noise.perlin2(this.angle.y, this.amplitude.y) * 5;
 this.angle.add(this.velocity);
 this.y = Math.sin(this.angle.y) * this.amplitude.y + perl;`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

    <p></p>

    <p></p>

    <h2>Task 5 - Adding Sound</h2>

    <p>Right it's all very well making pretty visual patterns and that, but we're hear to make audio visual pieces. Let's just make sure Single Synth at top of init(), just below the bit where we get rid of the overlay. This will just let us test that our sound using Tone is working. I've added some comments to show what each line is doing:</p>
    <code>
    <CodeBlock text = {`//sound
let synthy = new Tone.MonoSynth({ // declare synth and set some parameters
    oscillator: {
      type: "square" // set the oscillator type
    },
    envelope: {
      attack: 3 // fading in our sound over 3 seconds using a volume envelope 
    },
    filterEnvelope: { // attaching an envelope to our low pass filter
      attack: 3,
      decay: 3,
      sustain: 1,
    
    },
    filter: { // setting the frequency and resonance of our filter
      frequency: 20000,
      Q: 4
    }
  });
  synthy.toDestination(); // connect to our output
  synthy.triggerAttack(70, 0, 0.01); //trigger the envelope

  `} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

	<p></p>

	<p>OK you should hear a fairly annoying sound now! Let's delete that synth and start to do some more interesting stuff to create a sound scape that is driven by the movement of the visual elements on screen. We're going to:  </p>
	 <ul>
    	<li>Create a synth per row of our 2D grid of movers</li>
    	<li>Constrain the frequency of each synth to a note of our musical scale array as we loop through our for loop</li>
    	<li>Connect our synths to the master output</li>
    	<li>Trigger our synth to start making sound</li>
    </ul>
	
	
	<code>
    <CodeBlock text = {`for (let i = 0; i < numMovers; i++) {
    let octave = parseInt(i/12,10); // find our octave based on where we're at with our iteration of "i"
	let freq = 36 + (musicalScale[i%5] + (octave*12));// starting from base 36 (C2) pick a value to add from our musicalScale array then increase our octave to spread our scale
			synths.push(new Tone.MonoSynth({ // add a new synth to our synth array
				oscillator: {
					type: "sawtooth"
				},
				envelope: {
					attack: 0.01
				}
				
			}));
		synths[i].toDestination(); //connect our synth to the main output
		synths[i].triggerAttack(Tone.Frequency(freq, "midi")+Math.random(6),0,0.01); // trigger at our desired frequency with a bit of randomness to add "thickness" to the sound
    for (let j = 0; j < numMovers / 2; j++) {
      movers.push([]);

      movers[i].push(new Mover(i - 10, 0, j - 5, i * 0.25));
    }
  }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

	<p></p>

	<p>Now we've got a nice crushed chord going on, but we can take this further to map the movement of each row to the volume of our synth such that the pattern will then directly correlate to the rhythm of the audio being created. Essentially, we're modulating the amplitude to create rhythmic patterns. </p>
	<p>It does get a little bit tricksy at this point because we have to do a few steps to translate the movement along the y axis into something that is usable as an audio paramter.</p>
	<p>In our update function, we're going to change so that:  </p>
	 <ul>
    	<li>We will take the y position of the the first row of each of the movers</li>
    	<li>Then map (using the built in Three js mapLinear function) that value to between -1 and 1 - when tweaking this was found to give the best results for fading the volume</li>
    	<li>Despite mapping between -1 and 1, we actually only ever want our gain to go between the values of 0 and 1. So we use the Three js built in function call clamp to constrain our values so that they will never go below 0 or above 1</li>
    	<li>Then we convert that value to something usable for Tone js using its built in function called gainToDb</li>
    	<li>And after all of that we set our synth volume using a tiny little ramp to prevent clicks from happening as 60fps is actually not quick enough for audio and we need to interpolate between the values to smooth them out</li>
    </ul>
	<code>
    <CodeBlock text = {`function update() {
  orbit.update();
  //update stuff in here
  delta += clock.getDelta();

  for (let i = 0; i < numMovers; i++) {
    let boxPosMap = THREE.MathUtils.mapLinear( // map the mover's box position from world coordinates to between -1 and 1
      movers[i][0].box.position.y,
      -movers[i][0].amplitude.y / 10,
      movers[i][0].amplitude.y,
      -1,
      1
    );
    let boxPosMapClamp = THREE.MathUtils.clamp(boxPosMap, 0, 3); // ensure our newly mapped value never goes above 3 or below 0
    let boxPosGainTodB = Tone.gainToDb(boxPosMapClamp); // convert our mapped and constrained value to decibels
    synths[i].volume.linearRampTo(boxPosGainTodB, 0.01); // set the volume of our synth with the correctly calibrated value mapped from the box position
    for (let j = 0; j < numMovers / 2; j++) { //update our movers
      movers[i][j].update();
    }
  }

  if (delta > interval) {
    // The draw or time dependent code are here
    
    delta = delta % interval;
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
	</code>

	<p>Phew! Big step up but now you can see how to create a pretty neat generative audio-visual system, well done!</p>

	<h2>Task 6 - Stretch Tasks</h2>

    

    <p>OK so hopefully now you have made your generative wave pattern sequencer type thing, leave it running for a while to see how the dynamic, rhythm and tonality change over time. Here are a few of stretch goals for you to work to really extend the knowledge you've developed so far:
    <ul>
    	<li>Change the geometry type to a different shape. Use <a href="https://threejsfundamentals.org/threejs/lessons/threejs-primitives.html" target="_blank">this list</a> to try and implement something a bit more interesting than a cube... </li>
    	<li>Try adding some <a href="https://dustinpfister.github.io/2018/04/16/threejs-fog/" target="_blank">fog effects</a> </li>
    	<li>Change the musical scale array to different integers to see how that can alter the tonality of the piece</li>
    	<li>Try changing the y values in the amplitude and velocity vectors in the Mover class</li>
    	<li>Add effects to the sound like <a href="https://tonejs.github.io/examples/reverb/" target="_blank">reverb</a> and <a href="https://tonejs.github.io/docs/14.7.33/FeedbackDelay" target="_blank">delay</a>  </li>
    	<li>Try and make multiple waves to get cross rhythms and more complex audio-visual structures?</li>
    	<li>Fade master volume based on where the camera is </li>
    	<li>Change the colour of the row depending on whether the volume is high or not </li>
    </ul>
    </p>

    <p>Right we're at the final task for this workshop hooray! Nice one for making our generative noise-based project. </p>
    <p>Super important final task: go to file->export to .zip in your codesandbox and download your project!</p>
    <p>Remember how critical it is to keep a good folder structure? Make sure you start as you mean to go on and make a folder for this module, then another folder inside that one called "week 3".</p>
   

    <Link to="/">Go back to the homepage</Link>
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

export default Workshop03
