/* eslint-disable no-lonely-if */
import fs from 'fs'

interface Subject {
	subject: String
	lecturer?: String
	time: String
	room: String
}

const vistionResultTextToJson = filePath => {
	const text = fs
		.readFileSync(filePath)
		.toString()
		.replace(/CS\s?\d{1}\\n/gi, '')
		.replace(/(Mon.?|Tue.?|Wed.?|Thu.?|Fri.?|Sat.?)\\n/g, '')
		.split('\\n')

	const subject: Subject[] = []
	let i = 0
	while (i < text.length) {
		if (/(CSC\s*291|CSC\s*498).+/g.test(text[i])) {
			i += 1
			continue
		}
		const subJectRegex = /(\w{3}\s?\d{3}).*/
		if (subJectRegex.test(text[i])) {
			const testGenRegex = /(GEN\d{3}).*/
			if (
				testGenRegex.test(text[i]) ||
				/(\(\d{1,2}.\d{1,2}\s*-\s*\d{1,2}.\d{1,2}\)).*/g.test(text[i + 1])
			) {
				// GEN class (Not leucturer name) OR No lecturer name is provided
				const timeRoomRegex = /(\(\d{1,2}.\d{1,2}\s*-\s*\d{1,2}.\d{1,2}\))\s?(.*)/g
				const timeRoom = timeRoomRegex.exec(text[i + 1])
				if (!timeRoom) throw new Error('GEN timeRoom NULL')
				const subj: Subject = {
					subject: text[i],
					time: timeRoom[1],
					room: timeRoom[2]
				}
				subject.push(subj)
				i += 2
			} else {
				if (
					/(\(\d{1,2}.\d{1,2}\s*-\s*\d{1,2}.\d{1,2}\))\s+(.+)/g.test(
						text[i + 2]
					)
				) {
					// Room at the same level of time
					const timeRoomRegex = /(\(\d{1,2}.\d{1,2}\s*-\s*\d{1,2}.\d{1,2}\))\s?(.*)/g
					const timeRoom = timeRoomRegex.exec(text[i + 2])
					if (!timeRoom) throw new Error('timeRoom NULL')
					const subj: Subject = {
						subject: text[i],
						lecturer: text[i + 1],
						time: timeRoom[1],
						room: timeRoom[2]
					}
					subject.push(subj)
				} else {
					const lecturerRoomRegex = /(.+)\s+(.+)/g
					const lecturerRoom = lecturerRoomRegex.exec(text[i + 1])
					if (!lecturerRoom) throw new Error('lecturerRoom NULL')
					const subj: Subject = {
						subject: text[i],
						lecturer: lecturerRoom[1],
						time: text[i + 2],
						room: lecturerRoom[2]
					}
					subject.push(subj)
				}
				i += 3
			}
		} else {
			i += 1
		}
	}
	fs.writeFileSync(filePath, JSON.stringify(subject))
}

export default vistionResultTextToJson
