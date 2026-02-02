import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import Home from '../app/page'

// Mock fetch
global.fetch = vi.fn()
global.alert = vi.fn()

describe('Home Page', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('renders the form correctly', () => {
        render(<Home />)
        expect(screen.getByText('💘 Valentine Link Generator')).toBeDefined()
        expect(screen.getByPlaceholderText('Your Name')).toBeDefined()
        expect(screen.getByPlaceholderText('Partner Name')).toBeDefined()
        expect(screen.getByRole('button', { name: /Generate Love Link/i })).toBeDefined()
    })

    it('shows alert if inputs are empty', () => {
        render(<Home />)

        // Click button without inputs
        fireEvent.click(screen.getByRole('button', { name: /Generate Love Link/i }))

        expect(global.alert).toHaveBeenCalledWith("Bhai dono naam daal 😤")
    })

    it('calls API and generates link on valid input', async () => {
        const mockLink = 'http://localhost:3000/love/123'
        global.fetch.mockResolvedValueOnce({
            json: async () => ({ url: mockLink })
        })

        render(<Home />)

        fireEvent.change(screen.getByPlaceholderText('Your Name'), { target: { value: 'Romeo' } })
        fireEvent.change(screen.getByPlaceholderText('Partner Name'), { target: { value: 'Juliet' } })

        fireEvent.click(screen.getByRole('button', { name: /Generate Love Link/i }))

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/create", expect.objectContaining({
                method: "POST",
                body: JSON.stringify({ yourName: 'Romeo', partnerName: 'Juliet' })
            }))
        })

        expect(screen.getByText(mockLink)).toBeDefined()
    })
})
