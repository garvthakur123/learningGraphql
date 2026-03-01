import { ApolloServer} from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const typeDefs = `
    type Query{ 
        getUsers: [User]
        getUserById: User
    }

    type Mutation {
    
    }

    type User {
        id: ID!
        name: String
        age: Int
        isMarried: Boolean
    }
`

const server = new ApolloServer({ typeDefs, resolvers});

const {url} = await startStandaloneServer(server, {
    listen: { port: 8000},
});

console.log("Hey, I'm running at: ", url);