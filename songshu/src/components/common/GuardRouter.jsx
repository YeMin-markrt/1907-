import React, { Component } from 'react'
import {
  withRouter
} from "react-router-dom"
 class GuardRouter extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
         <this.props.component {...this.props}/>
      </div>
    )
  }
}
export default withRouter(GuardRouter)