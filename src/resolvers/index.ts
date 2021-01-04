import getAllSubject from '../db/db.ts'
import { Subject } from '../types/Subject'
import { UserInputError } from 'apollo-server-fastify'

const resolvers = {
	Query: {
		subjects: async (_, { year, fastTrack, day, room }) => {
			let subjects: Subject[] = await getAllSubject()
			if (year) {
				subjects = subjects.filter(subject => subject.year.some(years => years == year))
			}
			if (fastTrack === false) {
				subjects = subjects.filter(subject => subject.fastTrack === false)
			}
			if (day) {
				subjects = subjects.filter(subject => subject.day == day)
			}
			if (room) {
				subjects = subjects.filter(subject => subject.room === room)
			}
			return subjects
		},
		subject: async (_, { id }) => {
			const subjects: Subject[] = await getAllSubject()
			const subject = subjects.find(subj => subj.subject.toLowerCase().startsWith(id.toLowerCase()))
			if (!subject) throw new UserInputError('Subject not found')
			return subject
		}
	}
}

export default resolvers
