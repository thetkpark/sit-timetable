import { UserInputError } from 'apollo-server-fastify'
import getAllSubject from '../db/db.ts'
import { Subject } from '../types/Subject'

const resolvers = {
	// Truly Fasttrack
	Query: {
		subjects: async (_, { year, fastTrack, day, room }) => {
			let subjects: Subject[] = await getAllSubject()
			if (year) {
				subjects = subjects.filter(subject => subject.year.some(years => years.year == year))
			}
			if (year && fastTrack == false) {
				subjects = subjects.filter(subject =>
					subject.year.every(years => !(years.year == year && years.fastTrack == true))
				)
			}
			if (year && fastTrack == true) {
				subjects = subjects.filter(subject =>
					subject.year.every(years => !(years.year == year - 1 && years.fastTrack == true))
				)
				const removeIndex = subjects.findIndex(
					subJ =>
						subJ.subject == 'LNG322 Academic Writing I (G.3)' &&
						subJ.startTime == '09.00' &&
						subJ.day == 'Thursday'
				)
				if (removeIndex !== -1) {
					subjects.splice(removeIndex, 1)
				}
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
