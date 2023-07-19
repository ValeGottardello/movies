import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  cache: new InMemoryCache(), 
  link: new HttpLink({
      uri: `${process.env.REACT_APP_SERVER}`
  }),
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

reportWebVitals();
