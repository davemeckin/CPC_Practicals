import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi Sheeple</h1>
    <p>Welcome to the CPC Practicals.</p>
    <iframe src="https://codesandbox.io/embed/eager-mcnulty-s9bkd?fontsize=14&hidenavigation=1&theme=dark"
     style={{width:'100%', height:'500px', border:'0', overflow:'hidden'}}
     title="eager-mcnulty-s9bkd"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
  </Layout>
)



export default IndexPage
