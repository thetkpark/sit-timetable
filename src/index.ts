import fastify from 'fastify'
import { ApolloServer } from 'apollo-server-fastify'
import typeDefs from './schema/index.ts'
import resolvers from './resolvers/index.ts'

const port = process.env.PORT || 4000
const app = fastify({
	logger: true
})

app.get('/', (req, res) => {
	res.send({ hello: 'world' })
})

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true
})

app.register(apolloServer.createHandler())
console.log(apolloServer.graphqlPath)

app.listen(port, () => {
	console.log(`Serving on ${port}`)
})
