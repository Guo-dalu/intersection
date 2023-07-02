import { expect, describe, it } from 'vitest'
import { render } from '@testing-library/svelte'
import CollectionRadio from './CollectionRadio.svelte'

describe('CollectionRadio Component', () => {
	it('should render correctly', () => {
		const { container } = render(CollectionRadio, { iterateCollection: 'B' })

		expect(container).toMatchSnapshot()
	})
})
