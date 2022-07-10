// import the gql tagged template function

const { gql } = require("apollo-server-express");

    const typeDefs = gql`
        type Query {
		me: User
		user: User
        
        }

        type Auth {
            token: ID!
            user: User
        }
        type Mutation {
            login(email: String!, password: String!): Auth
            addUser(username: String!, email: String!, password: String!): Auth
            // save book
            // remove book
        }
    }
`;

module.exports = typeDefs;