import fs from 'fs'
import { Subject } from '../types/Subject.ts'

const getAllSubject = async (): Promise<Subject[]> => {
	const text = await fs.promises.readFile('data/allSubject.json')
	const jsonText = text.toString()
	return JSON.parse(jsonText)
}

export default getAllSubject
