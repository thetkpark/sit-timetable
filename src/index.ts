import fastify from 'fastify'
import { ApolloServer } from 'apollo-server-fastify'
import typeDefs from './schema/index.ts'
import resolvers from './resolvers/index.ts'
import { rootRoute, specificRoute } from './routes.ts'
import generateiCal from './util/iCal.ts'
// import './util/iCal'

generateiCal('18-01-2021', '08-03-2021', '16-03-2021', '16-05-2021')
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
