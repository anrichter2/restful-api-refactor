const { Book, User } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth')

const resolvers = {
    Query: {
        // Query for finding data of the user for the users' savedBooks page
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        // Mutation for when logging into an already existing account
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            // Check that user exists
            if (!user) {
                throw AuthenticationError;
            };

            const correctPw = await user.isCorrectPassword(password);
            // Check that password is correct
            if (!correctPw) {
                throw AuthenticationError;
            };
            // sign and return user and token
            const token = signToken(user);

            return { token, user };
        },
        // Mutation for creating a new user in the database
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });

            const token = signToken(user);

            return { token, user };
        },
        // Mutation for adding a book to the savedBooks array of a user
        saveBook: async (parent, { criteria }, context) => {
            if (context.user) {
                return User.findOneAndUpdate(
                    { _id: context.user._id },
                    {
                        $addToSet: {
                            savedBooks: criteria,
                        },
                    },
                    {
                        new: true,
                        runValidators: true,
                    }
                );
            }
            throw AuthenticationError;
        },
        // Mutation for removing a book from savedBooks array of user
        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id},
                    { $pull: { savedBooks: { bookId }}},
                    { new: true}
                );
                return updatedUser;
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;