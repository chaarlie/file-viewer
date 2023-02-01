import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'

import Home from '../../pages'
import sampleFile from '../data/images/answers.1.png'
import { FileDocument } from 'types/'

describe('Carousel', () => {
    const mockedFileName = 'samplePdfFile'

    const fetchImage = rest.get(
        `/public_server_host/static/${mockedFileName}.1.png`,
        async (_, res, ctx) => {
            const image = await fetch(sampleFile as any).then(res =>
                res.arrayBuffer(),
            )
            return res(
                ctx.set('Content-Length', image.byteLength.toString()),
                ctx.set('Content-Type', 'image/png'),
                ctx.body(image),
            )
        },
    )

    const mswServer = setupServer(fetchImage)

    beforeAll(() => mswServer.listen())
    afterEach(() => mswServer.resetHandlers())
    afterAll(() => mswServer.close())

    it('renders a carousel with no content', async () => {
        const { getByTestId, queryAllByTestId } = render(
            <Home fileDocumentList={[]} />,
        )

        getByTestId('carousel')
        getByTestId('no-content')

        const fileNames = await queryAllByTestId('file-list-item')
        expect(fileNames).toHaveLength(0)
    })

    it('renders a carousel and displays the elements', async () => {
        const list: FileDocument[] = [
            {
                id: 1,
                originalName: mockedFileName,
                encodingFormat: '7bit',
                size: 86169,
                pageNo: 1,
                mimeType: 'application/pdf',
                created_at: new Date('2023-01-31T15:03:57.990Z'),
                updated_at: new Date('2023-01-31T15:03:57.990Z'),
            },
        ]
        const { queryAllByTestId, getByText } = render(
            <Home fileDocumentList={list} />,
        )

        const fileNames = await queryAllByTestId('file-list-item')

        expect(fileNames).toHaveLength(1)

        getByText(/no content/)

        await waitFor(async () => {
            fireEvent.click(fileNames[0])

            const carouselItems = await queryAllByTestId('carousel-item')
            expect(carouselItems).toHaveLength(1)
        })
    })
})
