import { gql } from '@apollo/client'

export const WRITE_RESPONSE_DATA = gql`
  mutation updateResponse($username: ID!, $lesson:String!, $key:String!, $value: String!) {
  writeResponse(lesson: $lesson, key: $key, replaceValue: $value, username: $username) {
    documentRoot
  }
}
`
