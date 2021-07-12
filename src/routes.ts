import { FastifyInstance } from 'fastify'
import fs from 'fs'
import { Subject, DayInWeek } from './types/Subject'
import getAllSubject from './db/db'
import generateiCal from './util/iCal'

interface SubjectQueryString {
	year?: number
	fastTrack?: string
	day?: DayInWeek
	room?: string
	track?: string
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
			const { year, day, room, fastTrack, track } = req.query
			let subjects: Subject[] = await getAllSubject()
			if (year) {
				subjects = subjects.filter(subject => subject.year.some(years => years.year == year))
			}
			if (year && fastTrack == 'false') {
				subjects = subjects.filter(subject =>
					subject.year.every(years => !(years.year == year && years.fastTrack == true))
				)
			}
			if (year && fastTrack == 'true') {
				subjects = subjects.filter(subject =>
					subject.year.every(years => !(years.year == year - 1 && years.fastTrack == true))
				)
			}
			if (track) {
				// subjects = subjects.filter(subject => subject.year.)
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
		try {
			const { fastTrack, year } = req.query
			let subjects: Subject[] = await getAllSubject()
			const fileName: string = `year-${year}-${fastTrack == 'true' ? 'fasttrack' : 'normal-track'}.ics`
			if (year) {
				subjects = subjects.filter(subject => subject.year.some(years => years.year == year))
			}
			if (year && fastTrack == 'false') {
				subjects = subjects.filter(subject =>
					subject.year.every(years => !(years.year == year && years.fastTrack == true))
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
			if (year && fastTrack == 'true') {
				subjects = subjects.filter(subject =>
					subject.year.every(years => !(years.year == year - 1 && years.fastTrack == true))
				)
			}
			generateiCal(subjects, '18-01-2021', '08-03-2021', '16-03-2021', '16-05-2021', fileName)
			const icalFile = fs.readFileSync(fileName)
			fs.unlinkSync(fileName)
			res.header('content-type', 'text/calendar').send(icalFile)
		} catch (error) {
			res.status(500).send(error)
		}
	})
}

export { rootRoute, specificRoute, downloadiCalRoute }
