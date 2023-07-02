import { expect, describe, it } from 'vitest'
import { render } from '@testing-library/svelte'
import Alert from './Alert.svelte'

describe('Alert Component', () => {
	it('should render correctly', () => {
		const { container } = render(Alert)

		expect(container).toMatchSnapshot()
	})
})
