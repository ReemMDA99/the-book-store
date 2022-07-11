const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth');
//  Define the query and mutation functionality to work with the Mongoose models.
const resolvers = {
    // Queries are how we perform GET requests and ask for data from a GraphQL API.
    Query: {

        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('thoughts')
                .populate('friends');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
        },
        
		users: async () => {
			const users = User.find()
            .sort({ createdAt: -1 });
			return users;
		},
		user: async (parent, { _id }) => {
			const user = User.findOne({ _id });
			return user;
		},

    },

    // Mutations are how we perform POST, PUT, and DELETE requests to create or manipulate data through a GraphQL API.
    Mutation: {

        addUser: async function (parent, args) {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user }
        },
        // Look up the user by the provided email address. Since the `email` field is unique, we know that only one person will exist with that email
        login: async function (parent, { email, password }) {
            const user = await User.findOne({ email });
            
            // If there is no user with that email address, return an Authentication error stating so
            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }
            // If there is a user found, execute the `isCorrectPassword` instance method and check if the correct password was provided
            const correctPw = await user.isCorrectPassword(password);
            // If the password is incorrect, return an Authentication error stating so
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            // If email and password are correct, sign user into the application with a JWT
            const token = signToken(user);
            // Return an `Auth` object that consists of the signed token and user's information
            return { token, user };
        },

        // save book
        saveBook: async (parent, args, context) => {
			if (context.user) {

				const updateBook = await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $addToSet: { savedBooks: args.input } },
					{ new: true }
				);

				return updateBook;
			}

			throw new AuthenticationError("You need to be logged in!");
		},

        // remove book
        removeBook: async (parent, args, context) => {
			if (context.user) {
				const updateBook = await User.findOneAndUpdate(
					{ _id: context.user._id },
					{ $pull: { savedBooks: { bookId: args.bookId } } },
					{ new: true }
				);

				return updateBook;
			}

			throw new AuthenticationError("You need to be logged in!");
		},
	},
    
};

module.exports = resolvers;
