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
    <h1>Hello and Welcome</h1>
    <Image fileName = "cpc_header_03.png"/>
    <div className="imageWrapper_main_page">
  <Img
        
        fluid={data.file.childImageSharp.fluid}
        alt=""
        loading="eager"
      />

      </div>
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
