import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { vi } from 'vitest'
import LovePage from '../app/love/[id]/page'

// Mock useParams
vi.mock('next/navigation', () => ({
    useParams: () => ({ id: '123' })
}))

// Mock canvas-confetti
vi.mock('canvas-confetti', () => ({
    default: vi.fn()
}))

// Mock fetch
global.fetch = vi.fn()

// Mock Audio
global.Audio = vi.fn().mockImplementation(function () {
    this.play = vi.fn().mockResolvedValue()
    this.pause = vi.fn()
    this.loop = false
    this.volume = 1
    this.muted = false
    this.addEventListener = vi.fn()
    this.removeEventListener = vi.fn()
})

describe('LovePage', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        global.fetch.mockResolvedValue({
            json: async () => ({ success: true })
        })
    })

    it('renders correctly with initial state', async () => {
        await act(async () => {
            render(<LovePage />)
        })

        expect(screen.getByText('💘 Will you be my Valentine?')).toBeDefined()
        expect(screen.getByText('YES 💕')).toBeDefined()
        expect(screen.getByText('NO 😈')).toBeDefined()
    })

    it('handles YES response correctly', async () => {
        await act(async () => {
            render(<LovePage />)
        })

        const yesBtn = screen.getByText('YES 💕')

        await act(async () => {
            fireEvent.click(yesBtn)
        })

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/respond", expect.objectContaining({
                body: JSON.stringify({ id: '123', action: 'YES' })
            }))
        })

        expect(screen.getByText('YAYYYY!!! 💖🥹')).toBeDefined()
    })

    it('handles NO response correctly (API call)', async () => {
        await act(async () => {
            render(<LovePage />)
        })

        const noBtn = screen.getByText('NO 😈')

        await act(async () => {
            fireEvent.click(noBtn)
        })

        await waitFor(() => {
            expect(global.fetch).toHaveBeenCalledWith("/api/respond", expect.objectContaining({
                body: JSON.stringify({ id: '123', action: 'NO' })
            }))
        })

        // Should NOT show yay message
        expect(screen.queryByText('YAYYYY!!! 💖🥹')).toBeNull()
    })
})
