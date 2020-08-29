import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
// import {setContext} from 'apollo-link-context'
// import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

// const httpLink = new createHttpLink({
//   uri: 'http://localhost:4000/graphql'
// })

// const authLink = setContext((_, { headers }) => {
//   const token = localStorage.getItem('library-user-token')
//   return {
//     headers: {
//       ...headers,
//       // authorization: token ? `bearer ${token}` : null
//       authorization: token ? `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRhbWlncmVlbiIsImlkIjoiNWY0Nzg0MTk0OGQ3ZTIyNjRjNTAyZGE5IiwiaWF0IjoxNTk4NzIwNjY5fQ.gevkgHGkOTsE0SXh03XkSURvlp9Ak1Lm5rtlaDycE-8` : null
//     }
//   }
// })

// const client = new ApolloClient({
//   uri: authLink.concat(httpLink),
//   cache: new InMemoryCache(),
// })

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root'))