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

// Demo styles, see 'Styles' section below for some notes on use.
import 'react-accessible-accordion/dist/fancy-example.css';
import "../components/layout.css"

//var thisIsMyCopy = "function myTimer() \n { \n let d = new Date();document.getElementById(\"demo\").innerHTML = d.toLocaleTimeString();}";

const Workshop01 = () => (
  <Layout>
  <Navbar/>
    <SEO title="Workshop 01" />
    <p></p>
    <h1>Hello and welcome!</h1>
    <p>This first workshop will get you up to speed with interacting with your peers, and some internet fundamentals. In this workshop we will:</p>
	<p>
     <ul>
      <li>Talk to each other about our past experiences</li>
      <li>Share knowledge with our peers </li>
		  <li>Play about with some basic HTML/CSS/JS </li>
		  <li>Edit our first project in codesandbox</li>
		  <li>Make a basic bleepy button website</li>
	</ul>
	<strong>Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.</strong>
	</p>

  <h3>Task 1 - Top Three Things</h3>

  <h4>Cast your mind back to the wonderful time we all had last year...!</h4>

  <h4>Think of the most important or most inspiring 3 things that you learned related to: </h4>
  <ul>
      <li>creative coding</li>
      <li>graphic and web design</li>
      <li>introductory audio programming </li>
		  <li>audio technology </li>
  </ul>

  <h3>Task 2 - A Group Decision</h3>

  <h4>Get into groups of 3-4</h4>

  <h4>Talk to each other about your respective Top Three's</h4>
  <h4>Through a democratic process, decide on the most important two things - if you are a mixed DM and MT group then pick one from each discipline</h4>

  <h3>Task 3 - Quickfire Presentation</h3>
    
  <h4>Create a short presentation on powerpoint or keynote detailing all the relevant information about the two most important things you learned from last year</h4>
  <h4>Present to the other groups! Order tbd in the class session...</h4>

  <h3>Task 4 - Dipping Our Toes into Codesandbox</h3>
    <p>Right, so let's try editing our first codesandbox project to acquaint ourselves with the environment. We're going to make this little silly thing as our first project: </p>

  

<iframe src="https://codesandbox.io/embed/jsintro-cxl0x?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style={{width:'100%', height:'500px', border:0, borderRadius: '4px', overflow:'hidden'}}
     title="jsintro"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<p>You will be working in two browser windows for these worksheets, generally. So when we provide a start codesandbox embedded in the workshop just click on the "Open Sandox" button in the bottom right hand corner and it will open up a new tab with that sandbox ready for you to work in. 
      You can then click the "fork" button in the top right hand corner which will automatically create a new project with this template as a starting point.

    Take a look around the starter codesandbox we created below. You should be able to see that there are tabs across the top with various different
    file names: index.js; package.json; styles.css and index.html.</p>


  
<iframe src="https://codesandbox.io/embed/jsintrostarter-980ki?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:0, borderRadius: '4px', overflow:'hidden'}}
     title="jsintroStarter"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

<p>styles.css is full of some styling stuff that I stole from elsewhere (which we're allowed to do if we credit it properly) and that's what we'll use to make our buttons look nice and have some nice little interactive responses when clicked.</p>

    
<p>In index.html we currently have one button, we'll add some more in a bit. But what we're really interested in is index.js</p>
 
<p>We've added some starter code here and at the top you can see that we're importing our CSS then also the Tone.js library that we mentioned in class. There's also a variable called <code>synth</code>, which we just turn down a bit on line 6. And a function called <code>playSynth</code> which isn't actually being called right now.</p>

<p>At the moment, the button doesn't actually do anything. So let's go ahead and change that. Add the following line of code below the <code>playSynth</code> function:</p>
 <p></p>
<p>
<code>
<CodeBlock text = {`document.getElementById("button1").addEventListener("click", playSynth);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
</code>
<p></p>

</p>

<p>If you open the console at the bottom right hand side of page, you should now see that we're printing the button's ID. What we're doing here is adding an event listener that will respond to a user clicking the button and we're passing the <code>playSynth</code> function as a callback. That means that when the button is clicked, the function is executed.</p>

<p>OK but that's not that interesting. So now let's make the synth play a note when the button is clicked. Inside the curly brackets of the <code>playSynth</code> below the <code>console.log(buttonID)</code> line, add the following:</p>
<p>
<code>
<CodeBlock text = {`synth.triggerAttackRelease("C1", "1.5");`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
</code>
<p></p>
</p>

<p>Great! This line triggers the synth's envelope to go into the attack phase and then release itself 1.5 seconds later. And it tells the synth to play a C1 note. Can you try changing it to a different note? </p>
<p>
  But hang on, we want three buttons and for them to do different things (trigger different notes) so head over to index.html and add the following directly beneath the button with the id of "button1":</p>
<p>
<code>
<CodeBlock text = {`<button id="button2" class="btn orange">No, click me</button>`} language = {"html"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
</code>
<p></p>
</p>

<p>Now add a third button that will be red and have the id of "button3". Hopefully you should be able to do this bit on your own...</p>

<p></p>   

<p>Remember how switch statements work and what the syntax is? It goes, a little, something like this:</p> 

<p>
<code>
<CodeBlock text = {` switch (myVariable) {
    case option1:
      doSomething;
      break;
    case option2:
      doADifferentThing;
      break;
    case option3:
      doSomethingElse;
      break;

    default:
      break;
  }`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
</code>
<p></p>
</p>

<p>Have a go at adding the switch statement inside the <code>playSynth</code> function so that each button plays a different note.</p>

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
    <CodeBlock text = {`function playSynth(event) {
  
  let buttonID = event.target.id;
  console.log(buttonID);
  switch (buttonID) {
    case "button1":
      synth.triggerAttackRelease("C1", "1.5");
      break;
    case "button2":
      synth.triggerAttackRelease("C2", "1.5");
      break;
    case "button3":
      synth.triggerAttackRelease("C3", "1.5");
      break;

    default:
      break;
  }
}`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
  </code>
        
                    </p>
                </AccordionItemPanel>
            </AccordionItem>
            
      </Accordion>

  <p>Now you just have to attach event listeners to the other buttons. Just like we did with:</p>

  <p>
<code>
<CodeBlock text = {`document.getElementById("button1").addEventListener("click", playSynth);`} language = {"javascript"} theme = {dracula} showLineNumbers = {false} class = "codeBlocks" />
</code>
<p></p>

</p>

  <p> Alright, nice one! You've made your first little interactive web/sound project :) See you next week!</p>

    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default Workshop01
