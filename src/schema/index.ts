import { gql } from 'apollo-server-fastify'

const typeDefs = gql`
	type Query {
		subjects(year: Int, fastTrack: Boolean, day: DayInWeek, room: String): [Subject]!
		subject(id: String!): Subject!
	}
	type Subject {
		subject: String!
		lecturer: String
		startTime: String!
		endTime: String!
		room: String!
		year: [Years]!
		day: DayInWeek!
	}
	type Years {
		year: Int!
		fastTrack: Boolean!
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
