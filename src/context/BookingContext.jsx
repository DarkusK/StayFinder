import { createContext, useContext, useCallback } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage.js'
import { seedBookings } from '../data/seedBookings.js'

const BookingContext = createContext(null)

// Generates a booking reference like SF-8F2K3Q (no Math.random dependency issues).
function makeBookingId(existingCount) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789'
  const seed = Date.now() + existingCount * 7919
  let n = seed
  let out = ''
  for (let i = 0; i < 6; i++) {
    n = (n * 1103515245 + 12345) & 0x7fffffff
    out += chars[n % chars.length]
  }
  return `SF-${out}`
}

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useLocalStorage('stayfinder_bookings', seedBookings)

  const addBooking = useCallback(
    (data) => {
      const id = makeBookingId(bookings.length)
      const booking = {
        id,
        status: 'Confirmed',
        createdAt: new Date().toISOString(),
        ...data,
      }
      setBookings((prev) => [booking, ...prev])
      return booking
    },
    [bookings.length, setBookings]
  )

  const getBooking = useCallback(
    (id) => bookings.find((b) => b.id === id),
    [bookings]
  )

  const updateBookingStatus = useCallback(
    (id, status) => {
      setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
    },
    [setBookings]
  )

  return (
    <BookingContext.Provider value={{ bookings, addBooking, getBooking, updateBookingStatus }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBookings() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBookings must be used within a BookingProvider')
  return ctx
}
