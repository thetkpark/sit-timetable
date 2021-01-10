import { FastifyInstance } from 'fastify'
import fs from 'fs'
import { Subject, DayInWeek } from './types/Subject'
import getAllSubject from './db/db.ts'
import generateiCal from './util/iCal'

interface SubjectQueryString {
	year?: number
	fastTrack?: string
	day?: DayInWeek
	room?: string
}

interface iCalDownloadQueryString {
	year: number
	fastTrack: string
}

interface SubjectQueryParam {
	subject: string
}

const rootRoute = async (app: FastifyInstance): Promise<void> => {
	app.get<{
		Querystring: SubjectQueryString
	}>('/', async (req, res) => {
		try {
			const { year, day, room } = req.query
			const fastTrack = req.query.fastTrack || false
			let subjects: Subject[] = await getAllSubject()
			if (year) {
				subjects = subjects.filter(subject =>
					subject.year.some(years => years.fastTrack == fastTrack && years.year == year)
				)
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
		try {
			const subjectId = req.params.subject.toLowerCase()
			const subjects: Subject[] = await getAllSubject()
			const subject = subjects.find(subj => subj.subject.toLowerCase().startsWith(subjectId))
			res.send(subject)
		} catch (error) {
			res.status(500).send(error)
		}
	})
}

const downloadiCalRoute = async (app: FastifyInstance): Promise<void> => {
	app.get<{ Querystring: iCalDownloadQueryString }>('/ical', async (req, res) => {
		// try {
		// 	const { fastTrack, year } = req.query
		// 	let subjects: Subject[] = await getAllSubject()
		// 	const fileName: string = `year-${year}-${fastTrack == 'true' ? 'fasttrack' : 'normal-track'}.ics`
		// 	subjects = subjects.filter(subject => {
		// 		const yearMatch = subject.year.some(years => years == year)
		// 		const fastTrackMatch = fastTrack == 'true' ? true : `${subject.fastTrack}` == 'false'
		// 		return yearMatch && fastTrackMatch
		// 	})
		// 	generateiCal(subjects, '18-01-2021', '08-03-2021', '16-03-2021', '16-05-2021', fileName)
		// 	const icalFile = fs.readFileSync(fileName)
		// 	fs.unlinkSync(fileName)
		// 	res.header('content-type', 'text/calendar').send(icalFile)
		// } catch (error) {
		// 	res.status(500).send(error)
		// }
	})
}

export { rootRoute, specificRoute, downloadiCalRoute }
