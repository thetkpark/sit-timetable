import getAllSubject from '../db/db.ts'

const resolvers = {
	Query: {
		subjects: async () => {
			const subjects = await getAllSubject()
			return subjects
		}
	}
}

export default resolvers
