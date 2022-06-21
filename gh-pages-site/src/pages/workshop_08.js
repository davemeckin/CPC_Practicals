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

const Workshop08 = ({data}) => (
  <Layout>
  <Navbar/>
    <SEO title="Workshop 08" />
    <p></p>
    <h1>Hello and welcome back!</h1>
    <p>This final optional task is a little tester taking the training wheels off. It also provides a nice little template for having multiple states in your project...</p>

	<p>Here's what you can make, click on the buttons and interact with the dat.gui to see how it all works...</p>
	

  <iframe src="https://codesandbox.io/embed/w09-finitestate-eh6v2?fontsize=14&hidenavigation=1&theme=dark&view=preview"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W09_FiniteState"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

	
   <p></p>
	<p><strong>Where code is provided, you are expected to write it out yourself rather than copying and pasting it. We know this is tempting, but the point of a university education is for you to learn the necessary skills for your field, and copying and pasting code will not be on any job descriptions.</strong>
	</p>
    

    <h2>Task 1 - Having a Go</h2>

    <p>Right, it's up to you to have a go at adapting this starter code. You can put your own states in or try and do the same as the above example.  </p>
    <p></p>
    <iframe src="https://codesandbox.io/embed/w09-finitestatestarter-fiwx3?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="W09_FiniteStateStarter"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
  <p></p>

   

   <p> </p>

  

    <Link to="/">Go back to the homepage</Link>
   
  </Layout>
)


export const query = graphql`
  query {
    file(relativePath: { eq: "WS07/collision.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
        }
      }
    }
  }`

export default Workshop08
