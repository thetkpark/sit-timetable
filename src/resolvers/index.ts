import getAllSubject from '../db/db.ts'

const resolvers = {
	Query: {
		subjects: async () => {
			const subjects = await getAllSubject()
			console.log(subjects)
			return subjects
		}
	}
}

export default resolvers
