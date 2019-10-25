import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

import * as serviceWorker from './serviceWorker';
import App from './App';

import './style.css';


// Application level error handling with Apollo
const errorLink = onError(({ graphQLErrors, networkError }) => {
  // TODO Add actual error handling for these
  if (graphQLErrors) {
    console.log('GraphQL Error!');
  }

  if (networkError) {
    console.log('Network Error!');
  }
});

// Define the GraphQL endpoint to be used by Apollo Client
const GITHUB_BASE_URL = 'https://api.github.com/graphql';
const httpLink = new HttpLink({
  uri: GITHUB_BASE_URL,
  headers: {
    authorization: `Bearer ${
      process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
    }`,
  },
});

// Combine links to be used to configure Apollo Client
// and add functionality. Links access and modify GraphQL
// control flow. httpLink is a terminating link so it must
// be placed last. 
const link = ApolloLink.from([errorLink, httpLink]);

// Cache where data is managed by Apollo Client
// (read/write, normalize data, cache requests)
const cache = new InMemoryCache();

// Initialize Apollo Client with link and cache configs
const client = new ApolloClient({
  link,
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
