// import the gql tagged template function

const { gql } = require("apollo-server-express");

    const typeDefs = gql`
        type Query {
		me: User
		user: User

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

        type Mutation {
            login(email: String!, password: String!): Auth
            addUser(username: String!, email: String!, password: String!): Auth
            
        }
    }
`;

module.exports = typeDefs;