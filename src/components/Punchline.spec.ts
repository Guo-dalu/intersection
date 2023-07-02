import { expect, describe, it } from 'vitest'
import { render } from '@testing-library/svelte'
import Punchline from './Punchline.svelte'

describe('Punchline Component', () => {
	it('should render correctly', () => {
		// still can not test slot in a normal way, see: https://github.com/testing-library/svelte-testing-library/issues/48
		const { container } = render(Punchline)

		expect(container).toMatchSnapshot()
	})
})
