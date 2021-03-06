// Type definitions, or TypeDefs for short, involves literally defining every piece of data that the client can expect to work with through a query or mutation.
// import the gql tagged template function

const { gql } = require("apollo-server-express");
// me: Which returns a User type.
const typeDefs = gql`

    type Query {
		me: User
		user: User
        users: [User]
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: savedBook!): User
        removeBook(bookId: ID!): User
    }
    
    input savedBook {
        _id: ID
        bookId: String
        title: String
        image: String
        link: String
        authors: [String]
        description: String
            
    }
    
    type User {
        _id: ID!
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
        
    type Book {
        _id: ID!
        bookId: String
        authors: [String]
        # authors: String
        description: String
        title: String
        image: String
        link: String
    }

    type Auth {
        token: ID!
        user: User
    }

`;

module.exports = typeDefs;