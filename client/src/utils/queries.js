import { gql } from '@apollo/client'

// Query for finding the users' personal data on savedBooks page
export const  GET_ME = gql`
    query me {
        me {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;