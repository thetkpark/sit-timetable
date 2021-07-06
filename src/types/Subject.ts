export type DayInWeek = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday'

export enum Track {
	DS = 'DS',
	EL = 'EL',
	NO = 'NO'
}
export interface Year {
	year: number
	fastTrack: boolean
	track: Track
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
