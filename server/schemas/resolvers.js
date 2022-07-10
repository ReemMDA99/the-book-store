const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        me: async (parent, args, context) => {
			const userData = await User.findOne({ _id: context.user._id })
				.select("-__v -password")
				.populate("savedBooks");

			return userData;
		},
		users: async () => {
			const users = User.find().sort({ createdAt: -1 });
			return users;
		},
		user: async (parent, { _id }) => {
			const user = User.findOne({ _id });
			return user;
		},

    },
    Mutation: {

        addUser: async function (parent, args) {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user }
        },

        login: async function (parent, { email, password }) {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },
        // save book
        // remove book
    }
};
module.exports = resolvers;
