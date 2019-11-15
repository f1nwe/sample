import React, { Component } from 'react'

class Link extends Component {
  render() {
    const agreement = this.props.agreement.node
    return (
      <div className='link-container'>
          <div>
            {agreement.remote_id}
          </div>
          <a href={agreement.id} target='_blank' rel='noopener noreferrer'>
            {agreement.id}
          </a>
      </div>
    )
  }
}

export default Link
