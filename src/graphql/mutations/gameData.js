import { gql } from '@apollo/client'

export const WRITE_GAME_DATA = gql`
  mutation updateGameData($username: ID!, $documentPath: String , $value: String!) {
  writeGameData(username: $username, documentPath: $documentPath, replaceValue: $value) {
    documentRoot
  }
}
`
