import fastify from 'fastify'
import { ApolloServer } from 'apollo-server-fastify'
import typeDefs from './schema/index.ts'
import resolvers from './resolvers/index.ts'
import { rootRoute, specificRoute } from './routes.ts'

const port = process.env.PORT || 4000
const app = fastify({
	// logger: true
})

app.register(rootRoute)
app.register(specificRoute)

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true
})

app.register(apolloServer.createHandler())

app.listen(port, () => {
	console.log(`Serving on ${port}`)
})
