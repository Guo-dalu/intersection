import { runIntersection } from '../utils/getIntersection'
import type { IntersectionParams, MessageData } from '../app'
import { RUN_MULTIPLE, RUN_SINGE, SINGLE_RESULT } from '../constants'

onmessage = (event: MessageEvent) => {
	const { message, data } = event.data as MessageData
	switch (message) {
		case RUN_SINGE:
			postMessage({
				message: SINGLE_RESULT,
				data: runIntersection(data as IntersectionParams)
			})
			break
		case RUN_MULTIPLE:
			break
		default:
			break
	}
}

export {}
