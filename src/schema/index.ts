import { gql } from 'apollo-server-fastify'

const typeDefs = gql`
	type Query {
		subjects: [Subject]
		hello: String
	}
	type Subject {
		subject: String!
		lecturer: String
		startTime: String!
		endTime: String!
		room: String!
		year: [Int]!
		fastTrack: Boolean!
		day: DayInWeek!
	}
	enum DayInWeek {
		Monday
		Tuesday
		Wednesday
		Thursday
		Friday
	}
`

export default typeDefs
