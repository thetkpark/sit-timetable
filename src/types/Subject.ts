export type DayInWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'

export interface Year {
	year: number
	fastTrack: boolean
}
export interface Subject {
	subject: String
	lecturer?: String
	startTime: String
	endTime: String
	room: String
	year: [Year]
	day: DayInWeek
}
