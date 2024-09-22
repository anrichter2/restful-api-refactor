const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        bookcount: Int
        savedBooks: [Book]
    }

    type Book {
        bookId: String
        author: [String] // might be wrong look up later
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        author: [String]
        description: String
        title: String
        image: String
        link: String
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(criteria: BookInput): User
        removeBook(bookId: String!): User
    }
`;

module.exports = typeDefs;