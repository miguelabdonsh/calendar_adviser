import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "./components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./components/ui/dialog"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

type Event = {
  date: string
  description: string
}

export default function Component() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [events, setEvents] = useState<Event[]>([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [eventDescription, setEventDescription] = useState('')

  const goToPreviousMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1))
  }

  const openEventModal = (date: Date) => {
    setSelectedDate(date)
    const existingEvent = events.find(event => event.date === date.toISOString().split('T')[0])
    setEventDescription(existingEvent ? existingEvent.description : '')
    setIsModalOpen(true)
  }

  const saveEvent = () => {
    if (selectedDate && eventDescription) {
      const dateString = selectedDate.toISOString().split('T')[0]
      setEvents(prevEvents => {
        const newEvents = prevEvents.filter(event => event.date !== dateString)
        return [...newEvents, { date: dateString, description: eventDescription }]
      })
    }
    setIsModalOpen(false)
  }

  const renderCalendar = () => {
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const calendarDays = []
    for (let i = 0; i < startingDay; i++) {
      calendarDays.push(<div key={`empty-${i}`} className="h-20" />)
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day)
      const dateString = date.toISOString().split('T')[0]
      const hasEvent = events.some(event => event.date === dateString)
      
      calendarDays.push(
        <Button
          key={dateString}
          variant={hasEvent ? "default" : "outline"}
          className={`h-20 text-lg ${hasEvent ? 'bg-primary text-primary-foreground' : ''}`}
          onClick={() => openEventModal(date)}
        >
          {day}
        </Button>
      )
    }

    return calendarDays
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <div className="flex justify-between items-center mb-6">
          <Button variant="outline" size="icon" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h2 className="text-3xl font-bold">
            {months[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          <Button variant="outline" size="icon" onClick={goToNextMonth}>
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center font-medium text-lg">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {renderCalendar()}
        </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Evento para {selectedDate?.toLocaleDateString()}</DialogTitle>
              <DialogDescription>
                Ingresa los detalles del evento para este día.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="event" className="text-right">
                  Evento
                </Label>
                <Input
                  id="event"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={saveEvent}>Guardar evento</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}