import React, { Component } from 'react'
import Link from './Link'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const LINKS = gql`
  query {
    agreements {
      edges{
        node{
          id
          remoteId
        }
      }
    }
  }
`
const NEW_LINKS = gql`
  subscription {
    asyncJobStatusWasChanged(id: "eb25b6e429e3d2edc8294c8b") {
      id
      status
    }
  }
`
class Links extends Component {
  _subscribeToNewLinks = subscribeToMore => {
      subscribeToMore({
        document: NEW_LINKS,
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev

          const newLink = subscriptionData.data.newLink

          return Object.assign({}, prev, {
            links: [newLink, ...prev.links],
            __typename: prev.links.__typename
          })
        }
      })
    }
  render() {
    return (
      <Query query={LINKS} fetchPolicy='network-only' >
        {({ loading, error, data, subscribeToMore }) => {
          if (loading) return <div>Loading...</div>
          if (error) return <div>Error</div>

          this._subscribeToNewLinks(subscribeToMore)

          const agreements = data.agreements


          return (
            <div>
              <h3>Neat Links</h3>
              <div>
                {agreements.edges.map(agreement => <Link key={agreement.id} agreement={agreement} />)}
              </div>
            </div>
          )
        }}
      </Query>
    )
  }
}

export default Links
