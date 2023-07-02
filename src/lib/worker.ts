import { runIntersection, getMultipleIntersectionData } from '../utils/getIntersection'
import type { IntersectionParams, MessageData, MultipleIntersectionParams } from '../app'
import { ERROR_FLAG, MULTIPLE_RESULT, RUN_MULTIPLE, RUN_SINGE, SINGLE_RESULT } from '../constants'

onmessage = (event: MessageEvent) => {
	const { message, data } = event.data as MessageData
	try {
		switch (message) {
			case RUN_SINGE:
				postMessage({
					message: SINGLE_RESULT,
					data: runIntersection(data as IntersectionParams)
				})
				break
			case RUN_MULTIPLE:
				postMessage({
					message: MULTIPLE_RESULT,
					data: getMultipleIntersectionData(data as MultipleIntersectionParams)
				})
				break
			default:
				break
		}
	} catch (e) {
		postMessage({ message: ERROR_FLAG })
	}
}

export {}
