import { FastifyInstance } from 'fastify'
import { Subject, DayInWeek } from './types/Subject'
import getAllSubject from './db/db'

interface SubjectQueryString {
	year?: number
	fastTrack?: string
	day?: DayInWeek
}

const restRoute = async (app: FastifyInstance): Promise<void> => {
	app.get<{
		Querystring: SubjectQueryString
	}>('/', async (req, res) => {
		try {
			const { fastTrack, year, day } = req.query
			let subjects: Subject[] = await getAllSubject()
			if (year) {
				subjects = subjects.filter(subject => subject.year.some(years => years == year))
			}
			if (fastTrack) {
				subjects = subjects.filter(subject => `${subject.fastTrack}` == fastTrack)
			}
			if (day) {
				subjects = subjects.filter(subject => subject.day == day)
			}
			res.send(subjects)
		} catch (error) {
			res.status(500).send(error)
		}
	})
}

export default restRoute
