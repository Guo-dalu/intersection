import { MIN_SIZE, MAX_SIZE } from '../constants'

const isSizeValid = (size: number, min = MIN_SIZE, max = MAX_SIZE): boolean => {
	if (typeof size !== 'number') {
		return false
	}
	return Number.isInteger(size) && size >= min && size <= max
}

export default isSizeValid
