// Logo.js

import React from "react"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"


const Logo = () => {
  const data = useStaticQuery(graphql`
    query {
      file(name: { eq: "uwe-bristol" }, extension: { eq: "png" }) {
        childImageSharp {
          fluid(maxWidth: 500,maxHeight: 100, pngQuality: 5) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)
  return (
      <Img fluid={data.file.childImageSharp.fluid} alt="logo" />
  )
}

export default Logo