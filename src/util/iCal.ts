import ical, { EventData } from 'ical-generator'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import getAllSubject from '../db/db'
import { Subject, DayInWeek } from '../types/Subject'
dayjs.extend(customParseFormat)
dayjs.extend(duration)

const getStartDate = (dateString: String, subjectDay: DayInWeek): String => {
	// It must start on monday
	const date = parseInt(dateString.split('-')[0], 10)
	switch (subjectDay) {
		case 'Monday':
			return dateString.replace(`${date}`, `${date}`)
		case 'Tuesday':
			return dateString.replace(`${date}`, `${date + 1}`)
		case 'Wednesday':
			return dateString.replace(`${date}`, `${date + 2}`)
		case 'Thursday':
			return dateString.replace(`${date}`, `${date + 3}`)
		case 'Friday':
			return dateString.replace(`${date}`, `${date + 4}`)
		default:
			throw new Error('Date is not valid')
	}
}

const getMidtermExamDate = (firstDayOfMidterm: String, lastDayOfMidterm: String): string[] => {
	const excludeDate: string[] = []
	let day = dayjs(`${firstDayOfMidterm} +07:00`, 'DD-MM-YYYY Z')
	const lastDay = dayjs(`${lastDayOfMidterm} +07:00`, 'DD-MM-YYYY Z')

	while (day.isBefore(lastDay)) {
		excludeDate.push(day.toISOString())
		day = day.add(1, 'day')
	}

	excludeDate.push(lastDay.toISOString())
	return excludeDate
}

const generateiCal = async (
	firstDayOfSemester: String,
	firstDayOfMidterm: String,
	lastDayOfMidterm: String,
	lastDayBeforeFinal: String
) => {
	const subjects: Subject[] = await getAllSubject()
	const cal = ical()
	const excludeDate = getMidtermExamDate(firstDayOfMidterm, lastDayOfMidterm)

	subjects.forEach(subject => {
		const subj = subject.subject.split(' ')
		const des = `${subject.subject}\n${subject.lecturer}`
		const startDateTime = getStartDate(firstDayOfSemester, subject.day)
		const event: EventData = {
			timezone: 'Asia/Bangkok',
			summary: subj[0],
			location: subject.room.toString(),
			description: des,
			start: dayjs(`${startDateTime} ${subject.startTime} +07:00`, 'DD-MM-YYYY H.mm Z').toISOString(),
			end: dayjs(`${startDateTime} ${subject.endTime} +07:00`, 'DD-MM-YYYY H.mm Z').toISOString(),
			repeating: {
				freq: 'WEEKLY',
				until: dayjs(`${lastDayBeforeFinal} +07:00`, 'DD-MM-YYYY Z').toISOString(),
				exclude: excludeDate
			}
		}
		cal.createEvent(event)
	})
	cal.saveSync('cal.ics')
	console.log('DONE WRITING')
}

export default generateiCal
