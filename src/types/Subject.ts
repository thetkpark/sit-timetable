export type DayInWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'

export interface Subject {
	subject: String
	lecturer?: String
	startTime: String
	endTime: String
	room: String
	year: [Number]
	fastTrack: Boolean
	day: DayInWeek
}
