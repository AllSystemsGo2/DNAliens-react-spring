import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { refreshAuthToken } from '../auth'
import { logout, setToken } from '../store/slices/authSlice'

// Store reference to dispatch function
let storeDispatch = null
export const setStoreDispatch = (dispatch) => {
  storeDispatch = dispatch
}

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_URI, 
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('auth_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : '',
    }
  }
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    })
  if (networkError) {
    console.error(`[Network error]: ${networkError}`)
    // Handle authentication errors
    if (networkError.statusCode === 401 && storeDispatch) {
      localStorage.removeItem('auth_token')
      const refresh_token = localStorage.getItem('refresh_token')
      
      refreshAuthToken(refresh_token)
        .then((newAuthToken) => {
          localStorage.setItem('auth_token', newAuthToken)
          storeDispatch(setToken(newAuthToken))
        })
        .catch(() => {
          storeDispatch(logout())
          // You might want to redirect to login page here
          // window.location.href = `/login?returnTo=${encodeURIComponent(window.location.href)}`
        })
    }
  }
})

export const client = new ApolloClient({
  link: errorLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
})
