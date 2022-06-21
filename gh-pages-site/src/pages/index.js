import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import Navbar from "../components/navbar"

const IndexPage = ({data}) => (
  <Layout>
    <Navbar/>
    <SEO title="Home" />
    <p></p>
    <h1>Hello and Welcome to CPC 2021/2022!</h1>
    <p></p>
    <p>Here you will find the workshop materials with embedded code examples to help your learning and development.</p>
    <p></p>
    <Image fileName = "CPC_Splash-01.png"/>

      <p></p>
    
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "cpc_header_02.png" }) {
      childImageSharp {
        fluid(maxWidth: 800) {
            ...GatsbyImageSharpFluid
        }
      }
    }
  }`

export default IndexPage
