import { FastifyInstance } from 'fastify'
import { Subject, DayInWeek } from './types/Subject'
import getAllSubject from './db/db.ts'

interface SubjectQueryString {
	year?: number
	fastTrack?: string
	day?: DayInWeek
	room?: string
}

interface SubjectQueryParam {
	subject: string
}

const rootRoute = async (app: FastifyInstance): Promise<void> => {
	app.get<{
		Querystring: SubjectQueryString
	}>('/', async (req, res) => {
		try {
			const { fastTrack, year, day, room } = req.query
			let subjects: Subject[] = await getAllSubject()
			if (year) {
				subjects = subjects.filter(subject => subject.year.some(years => years == year))
			}
			if (fastTrack == 'false') {
				subjects = subjects.filter(subject => `${subject.fastTrack}` == fastTrack)
			}
			if (day) {
				subjects = subjects.filter(subject => subject.day == day)
			}
			if (room) {
				subjects = subjects.filter(subject => subject.room === room)
			}
			res.send(subjects)
		} catch (error) {
			res.status(500).send(error)
		}
	})
}

const specificRoute = async (app: FastifyInstance): Promise<void> => {
	app.get<{
		Params: SubjectQueryParam
	}>('/:subject', async (req, res) => {
		const subjectId = req.params.subject.toLowerCase()
		const subjects: Subject[] = await getAllSubject()
		const subject = subjects.find(subj => subj.subject.toLowerCase().startsWith(subjectId))
		console.log(subject)
		res.send(subject)
	})
}

export { rootRoute, specificRoute }
