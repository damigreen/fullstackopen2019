import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import { ApolloProvider } from 'react-apollo'
// import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks'
// import { ApolloClient } from 'apollo-client'
// import {createHttpLink } from 'apollo-link-http'
// import { InMemoryCache } from 'apollo-cache-inmemory'
// import { setContext } from 'apollo-link-context'
import { ApolloClient, createHttpLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'


const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
})

// const httpLink = createHttpLink({
//   uri: 'http://localhost:4000/'
// })


// // Adding token from localstorage
// // and set as the Authorization headers
// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('phonenumbers-user-token');
//   console.log(token)

//   return {
//     headers: {
//       ...headers,
//       authorization: token ? `bearer ${token}` : null
//     }
//   }
// })


// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:4000/graphql`,
//   options: {
//     reconnect: true
//   }
// })

// const splitLink = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query)
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   authLink.concat(httpLink),
// )

// // ApolloConstructure function using the parameters
// const client = new ApolloClient({
//   link: splitLink,
//   cache: new InMemoryCache()
// })

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
