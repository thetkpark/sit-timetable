import fastify from 'fastify'
import { ApolloServer } from 'apollo-server-fastify'
import rateLimit from 'fastify-rate-limit'
import helmet from 'fastify-helmet'
import cors from 'fastify-cors'
import typeDefs from './schema/index.ts'
import resolvers from './resolvers/index.ts'
import { rootRoute, specificRoute, downloadiCalRoute } from './routes.ts'

const port = process.env.PORT || 4000
const app = fastify({
	// logger: true
})

app.register(helmet)
app.register(rateLimit, {
	max: 100,
	timeWindow: 5000
})
app.register(cors, {
	origin: '*',
	methods: 'GET'
})

app.register(rootRoute, { prefix: '/api' })
app.register(specificRoute, { prefix: '/api' })
app.register(downloadiCalRoute, { prefix: '/api' })

const apolloServer = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true
})

apolloServer.setGraphQLPath('/graphql')

app.register(apolloServer.createHandler())

app.listen(port, () => {
	console.log(`Serving on ${port}`)
})
