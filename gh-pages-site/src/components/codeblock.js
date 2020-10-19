import React from "react"



class CodeBlock extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: `
            function setup () {

            }
          `
    }
  }

   render() {
        return (
          <pre>{this.props.code}</pre>
        )
    }
}

export default CodeBlock