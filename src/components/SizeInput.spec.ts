import { expect, describe, it } from 'vitest'
import { render } from '@testing-library/svelte'
import SizeInput from './SizeInput.svelte'

describe('SizeInput Component', () => {
	it('should render correctly', () => {
		const { container } = render(SizeInput, { size: 100, label: 'size input' })
		expect(container).toMatchSnapshot()
	})
})
