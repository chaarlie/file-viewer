import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

import Home from '../pages'

describe('Home', () => {
    it('renders the home component', async () => {
        const { getByTestId } = render(<Home fileDocumentList={[]} />)
        getByTestId('home-container')
    })
})
