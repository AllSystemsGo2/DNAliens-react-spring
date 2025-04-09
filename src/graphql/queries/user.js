import { gql } from '@apollo/client'

export const GET_USER = gql`
  query getUser($username: String!) {
    getUser(username: $username) {
      email
      firstName
      lastName
      class {
        classId
        name
        teacher 
        students
      }
      gameData {
        documentRoot
      }
    }
  } 
`
