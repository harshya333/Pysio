"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Doctor {
  name: string
  title: string
  description: string
  image: string
}

interface ThankYouCardProps {
  doctor: Doctor
}

const ThankYouCard: React.FC<ThankYouCardProps> = ({ doctor }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const smallCircleRef = useRef<HTMLDivElement>(null)
  const yearRef = useRef<HTMLDivElement>(null)
  const orangeShineRef = useRef<HTMLDivElement>(null)
  const cometRef = useRef<HTMLDivElement>(null)
  const shineRef = useRef<HTMLDivElement>(null)

  // Booking modal states
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showKnowledgeOverlay, setShowKnowledgeOverlay] = useState(false)
  const [showServiceDropdown, setShowServiceDropdown] = useState(false)
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState("")

  // Mock services data
  const services = [
    { id: 1, title: "General Consultation" },
    { id: 2, title: "Specialist Consultation" },
    { id: 3, title: "Follow-up Visit" },
    { id: 4, title: "Emergency Consultation" },
  ]

  // Available time slots
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", 
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ]

  // Provide default values if doctor prop is missing
  const doctorData = doctor || {
    name: "Dr. Sample Name",
    title: "Medical Specialist",
    description: "Experienced healthcare professional\nDedicated to patient care",
    image: "/placeholder.svg"
  }

  const openBookingModal = () => {
    setShowBookingModal(true)
  }

  const closeBookingModal = () => {
    setShowBookingModal(false)
    setShowKnowledgeOverlay(false)
    setShowServiceDropdown(false)
    setShowDatePicker(false)
    setShowTimePicker(false)
  }

  const handleConfirmBooking = () => {
    if (selectedService && selectedDate && selectedTime) {
      setShowKnowledgeOverlay(true)
    } else {
      alert("Please fill all the booking details")
    }
  }

  // Date selection functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear()
  }

  const isSelectedDate = (date: Date) => {
    if (!selectedDate) return false
    return date.getDate() === selectedDate.getDate() &&
           date.getMonth() === selectedDate.getMonth() &&
           date.getFullYear() === selectedDate.getFullYear()
  }

  const isPastDate = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const formatDate = (date: Date | null) => {
    if (!date) return "Select Date"
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const handleDateSelect = (day: number, month: number, year: number) => {
    const selected = new Date(year, month, day)
    if (!isPastDate(selected)) {
      setSelectedDate(selected)
      setShowDatePicker(false)
    }
  }

  // Generate calendar for current month
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth)
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
    const days = []

    // Previous month days
    const prevMonthDays = getDaysInMonth(currentYear, currentMonth - 1)
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        month: currentMonth - 1,
        year: currentMonth === 0 ? currentYear - 1 : currentYear,
        isCurrentMonth: false
      })
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true
      })
    }

    // Next month days
    const totalCells = 42 // 6 weeks
    const nextMonthDays = totalCells - days.length
    for (let i = 1; i <= nextMonthDays; i++) {
      days.push({
        day: i,
        month: currentMonth + 1,
        year: currentMonth === 11 ? currentYear + 1 : currentYear,
        isCurrentMonth: false
      })
    }

    return days
  }

  const navigateMonth = (direction: number) => {
    if (direction === 1) {
      // Next month
      if (currentMonth === 11) {
        setCurrentMonth(0)
        setCurrentYear(currentYear + 1)
      } else {
        setCurrentMonth(currentMonth + 1)
      }
    } else {
      // Previous month
      if (currentMonth === 0) {
        setCurrentMonth(11)
        setCurrentYear(currentYear - 1)
      } else {
        setCurrentMonth(currentMonth - 1)
      }
    }
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  useEffect(() => {
    const generateTranslate = (el: HTMLElement | null, e: MouseEvent, value: number) => {
      if (el) {
        el.style.transform = `translate(${e.clientX * value}px, ${e.clientY * value}px)`
      }
    }

    const cumulativeOffset = (element: HTMLElement) => {
      let top = 0,
        left = 0
      let el: HTMLElement | null = element
      do {
        top += el.offsetTop || 0
        left += el.offsetLeft || 0
        el = el.offsetParent as HTMLElement
      } while (el)

      return {
        top: top,
        left: left,
      }
    }

    const handleMouseMove = (event: MouseEvent) => {
      const e = event
      if (!cardRef.current) return

      const cardOffset = cumulativeOffset(cardRef.current)
      const cardTop = cardOffset.top
      const cardBottom = cardOffset.top + 410
      const cardLeft = cardOffset.left
      const cardRight = cardOffset.left + 600

      const reactZoneTop = cardTop - 60
      const reactZoneBottom = cardBottom + 60
      const reactZoneLeft = cardLeft - 80
      const reactZoneRight = cardRight + 80

      if (e.pageY < reactZoneTop || e.pageY > reactZoneBottom || e.pageX < reactZoneLeft || e.pageX > reactZoneRight) {
        if (cardRef.current) {
          cardRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          cardRef.current.style.transform = "matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)"
        }
        if (smallCircleRef.current) {
          smallCircleRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          smallCircleRef.current.style.transform = "translate(0px, 0px)"
        }
        if (orangeShineRef.current) {
          orangeShineRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          orangeShineRef.current.style.transform = "translate(0px, 0px)"
        }
        if (yearRef.current) {
          yearRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          yearRef.current.style.transform = "translate(0px, 0px)"
        }
        if (cometRef.current) {
          cometRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          cometRef.current.style.transform = "translate(0px, 0px)"
        }
        if (shineRef.current) {
          shineRef.current.style.transition = "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
          shineRef.current.style.transform = "translateX(-50%) translateY(-50%) rotate(45deg)"
        }
        return
      }

      if (cardRef.current) cardRef.current.style.transition = ""
      if (smallCircleRef.current) smallCircleRef.current.style.transition = ""
      if (orangeShineRef.current) orangeShineRef.current.style.transition = ""
      if (yearRef.current) yearRef.current.style.transition = ""
      if (cometRef.current) cometRef.current.style.transition = ""
      if (shineRef.current) shineRef.current.style.transition = ""

      const x = ((e.pageX - cardOffset.left - 300 / 2) * -1) / 100
      const y = ((e.pageY - cardOffset.top - 410 / 2) * -1) / 100

      const matrix = [
        [1, 0, 0, -x * 0.00004],
        [0, 1, 0, -y * 0.00004],
        [0, 0, 1, 1],
        [0, 0, 0, 1],
      ]

      generateTranslate(smallCircleRef.current, e, 0.024)
      generateTranslate(orangeShineRef.current, e, 0.072)
      generateTranslate(yearRef.current, e, 0.024)
      generateTranslate(cometRef.current, e, 0.04)

      if (shineRef.current) {
        const shineX = (e.clientX - cardOffset.left - 300) * 0.24
        const shineY = (e.clientY - cardOffset.top - 205) * 0.24
        shineRef.current.style.transform = `translateX(${shineX}px) translateY(${shineY}px) rotate(45deg)`
      }

      if (cardRef.current) {
        cardRef.current.style.transform = `matrix3d(${matrix.toString()})`
      }
    }

    document.addEventListener("mousemove", handleMouseMove)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="thank-you-wrapper">
      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .thank-you-wrapper {
          position: relative;
          margin: 0 auto;
          width: 100%;
          max-width: 600px;
          aspect-ratio: 600 / 410;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
        }

        .thank-you-card {
          width: 100%;
          height: 100%;
          border-radius: 24px;
          position: absolute;
          box-shadow: -20px 30px 116px 0 rgba(255, 255, 255, 0.1);
          overflow: hidden;
          z-index: 4;
          transition: box-shadow 0.4s ease;
        }

        .thank-you-card:hover {
          box-shadow: 
            -20px 30px 116px 0 rgba(255, 255, 255, 0.1),
            0 0 40px rgba(255, 255, 255, 0.15);
        }

        .card__backgroundGlassmorphism {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03));
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 24px;
          z-index: 0;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }

        .card__backgroundGlassmorphism::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent 20%,
            rgba(255, 255, 255, 0.03) 35%,
            rgba(255, 255, 255, 0.15) 50%,
            rgba(255, 255, 255, 0.25) 52%,
            rgba(255, 255, 255, 0.08) 65%,
            transparent 80%
          );
          transform: translateX(-50%) translateY(-50%) rotate(45deg);
          transition: transform 0.1s ease-out;
          opacity: 0;
          will-change: transform;
        }

        .thank-you-card:hover .card__backgroundGlassmorphism::before {
          opacity: 1;
        }

        .thank-you-card:hover .card__backgroundGlassmorphism {
          backdrop-filter: blur(20px) saturate(1.5);
          -webkit-backdrop-filter: blur(20px) saturate(1.5);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .thank-you-card:hover .card__backgroundGlassmorphism div {
          opacity: 1 !important;
        }

        .card__circularGlassmorphism {
          position: absolute;
          right: 5%;
          bottom: 5%;
          width: 55%;
          aspect-ratio: 1;
          background: transparent;
          backdrop-filter: blur(10px) saturate(1.3);
          -webkit-backdrop-filter: blur(10px) saturate(1.3);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          z-index: 2;
          pointer-events: none;
          transition: all 0.4s ease;
          overflow: hidden;
        }

        .card__circularGlassmorphism::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(255, 255, 255, 0.1) 60deg,
            rgba(255, 255, 255, 0.3) 120deg,
            rgba(255, 255, 255, 0.15) 180deg,
            transparent 240deg,
            rgba(255, 255, 255, 0.08) 300deg,
            transparent 360deg
          );
          border-radius: 50%;
          transform: rotate(0deg);
          transition: transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          opacity: 0;
        }

        .thank-you-card:hover .card__circularGlassmorphism::before {
          transform: rotate(360deg);
          opacity: 1;
        }

        .thank-you-card:hover .card__circularGlassmorphism {
          backdrop-filter: blur(15px) saturate(1.6);
          -webkit-backdrop-filter: blur(15px) saturate(1.6);
          border-color: rgba(255, 255, 255, 0.25);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
        }

        .card__orangeShine,
        .card__greenShine {
          position: absolute;
          background-repeat: no-repeat;
          background-size: cover;
        }

        .card__orangeShine {
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 40%, transparent 70%);
          right: -30%;
          top: -26.3%;
          bottom: 14.6%;
          z-index: 2;
          width: 114%;
          height: 146.3%;
        }

        .card__greenShine {
          background: radial-gradient(ellipse at center, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.01) 30%, transparent 60%);
          left: 20%;
          top: 0;
          bottom: 0;
          z-index: 1;
          width: 80%;
        }

        .card__doctorInfo {
          position: absolute;
          left: 5%;
          top: 6%;
          width: 48%;
          z-index: 10;
          color: #fff;
          font-family: 'Oswald', sans-serif;
          display: flex;
          flex-direction: column;
          gap: 3%;
        }

        .card__doctorName {
          font-size: clamp(24px, 6vw, 38px);
          font-weight: 600;
          line-height: 1.05;
          color: #fff !important;
          text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3) !important;
          margin-bottom: 2%;
        }

        .card__doctorTitle {
          font-size: clamp(12px, 2.8vw, 16px);
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.8px;
          color: rgba(255, 255, 255, 0.95) !important;
          margin-bottom: 3%;
          line-height: 1.25;
          text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.3) !important;
        }

        .card__doctorDescription {
          font-size: clamp(11px, 2.6vw, 15px);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.9) !important;
          line-height: 1.5;
          white-space: pre-line;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25) !important;
          flex: 1;
        }

        .card__consultButton {
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.2) !important;
          color: white !important;
          border: 1px solid rgba(255, 255, 255, 0.3) !important;
          border-radius: 20px;
          font-size: clamp(11px, 2.5vw, 14px);
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          backdrop-filter: blur(10px);
          margin-top: 4%;
          display: inline-block;
          width: fit-content;
        }

        .card__consultButton:hover {
          background: rgba(255, 255, 255, 0.3) !important;
          border-color: rgba(255, 255, 255, 0.4) !important;
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(255, 255, 255, 0.1);
        }

        .card__smallCircle {
          position: absolute;
          border-radius: 100%;
          background: transparent !important;
          box-shadow: -10px -15px 90px 0 rgba(255, 255, 255, 0.05) !important;
          z-index: 2;
          backdrop-filter: blur(8px) saturate(1.2);
          -webkit-backdrop-filter: blur(8px) saturate(1.2);
          border: 1px solid rgba(255, 255, 255, 0.12);
          right: 33%;
          top: -5%;
          width: 12%;
          aspect-ratio: 1;
        }

        .card__doctorImage {
          position: absolute;
          right: 7.5%;
          bottom: 7.5%;
          width: 50%;
          aspect-ratio: 1;
          border-radius: 50%;
          object-fit: cover;
          z-index: 3;
          border: 3px solid rgba(255, 255, 255, 0.25);
          box-shadow:
            0 0 30px rgba(255, 255, 255, 0.2),
            0 0 60px rgba(255, 255, 255, 0.1);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
          transform: none !important;
        }

        .thank-you-card:hover .card__doctorImage {
          box-shadow: 
            0 0 40px rgba(255, 255, 255, 0.3),
            0 0 80px rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.35);
        }

        .card__outer-year {
          font-family: 'Orbitron', monospace;
        }

        .card__outer-year span {
          position: absolute;
          color: #fff;
          font-size: clamp(12px, 2.7vw, 16px);
          z-index: 4;
        }

        .card__outer-year span:nth-child(1),
        .card__outer-year span:nth-child(4) {
          position: relative;
        }

        .card__outer-year span:nth-child(1):after,
        .card__outer-year span:nth-child(4):after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 100%;
          border-bottom: 2px solid #fff;
        }

        .card__outer-year span:nth-child(1) {
          top: 8%;
          left: 5%;
        }

        .card__outer-year span:nth-child(2) {
          top: 8%;
          right: 5%;
        }

        .card__outer-year span:nth-child(3) {
          bottom: 8%;
          left: 5%;
        }

        .card__outer-year span:nth-child(4) {
          right: 5%;
          bottom: 8%;
        }

        .card__comet {
          position: relative;
          width: 8px;
          height: 8px;
          background-color: #fff;
          border-radius: 100%;
          transition: all 0.3s ease;
        }

        .thank-you-card:hover .card__comet {
          background-color: #ffffff;
          box-shadow: 
            0 0 10px rgba(255, 255, 255, 0.8),
            0 0 20px rgba(255, 255, 255, 0.6),
            0 0 30px rgba(255, 255, 255, 0.4);
        }

        .card__cometOuter {
          position: absolute;
          top: 25%;
          left: 20%;
        }

        .card__comet--second {
          right: -30px;
          top: -15px;
          transform: scale(0.6);
        }

        .card__comet:before,
        .card__comet:after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.2) 27%, rgba(255, 255, 255, 0) 100%);
          border-radius: 20px;
          transform: rotate(-45deg);
        }

        .card__comet:before {
          width: 18px;
          height: 70px;
          transform-origin: -2px 13px;
        }

        .card__comet:after {
          width: 12px;
          height: 80px;
          transform-origin: 0px 8px;
        }

        /* Modal Styles */
        .glass-button {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          padding: 12px 16px;
          color: white;
          font-size: 14px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          cursor: pointer;
          width: 100%;
        }

        .glass-button:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
        }

        /* Black Theme Dropdown Styles */
        .glass-dropdown {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 12px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          overflow: hidden;
          margin-top: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .glass-dropdown-item {
          padding: 12px 16px;
          color: #ffffff;
          cursor: pointer;
          transition: all 0.2s ease;
          border-bottom: 1px solid #333;
          background: #1a1a1a;
        }

        .glass-dropdown-item:hover {
          background: #2d2d2d;
          color: #ffffff;
        }

        .glass-dropdown-item:last-child {
          border-bottom: none;
        }

        /* Black Theme Calendar Styles */
        .calendar {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 12px;
          padding: 1rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          margin-top: 4px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .calendar-nav {
          background: #2d2d2d;
          border: 1px solid #444;
          color: #ffffff;
          border-radius: 6px;
          padding: 6px 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: bold;
        }

        .calendar-nav:hover {
          background: #3d3d3d;
          border-color: #555;
        }

        .calendar-title {
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
        }

        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 4px;
        }

        .calendar-day-header {
          color: #888;
          font-size: 12px;
          text-align: center;
          padding: 8px 4px;
          font-weight: 500;
        }

        .calendar-day {
          color: #ffffff;
          text-align: center;
          padding: 10px 4px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 13px;
          border: 1px solid transparent;
        }

        .calendar-day:hover {
          background: #2d2d2d;
          border-color: #444;
        }

        .calendar-day.current-month {
          color: #ffffff;
          background: #1a1a1a;
        }

        .calendar-day.other-month {
          color: #666;
          background: #1a1a1a;
        }

        .calendar-day.today {
          background: #333;
          border-color: #555;
          color: #ffffff;
          font-weight: 600;
        }

        .calendar-day.selected {
          background: #4a90e2;
          color: #ffffff;
          font-weight: 600;
          border-color: #5a9ef2;
        }

        .calendar-day.past {
          color: #555;
          background: #1a1a1a;
          cursor: not-allowed;
          opacity: 0.5;
        }

        .calendar-day.past:hover {
          background: #1a1a1a;
          border-color: transparent;
        }

        /* Black Theme Time Picker Styles */
        .time-picker {
          background: #1a1a1a;
          border: 1px solid #333;
          border-radius: 12px;
          padding: 1rem;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          margin-top: 4px;
          max-height: 200px;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .time-slot {
          padding: 10px 12px;
          color: #ffffff;
          cursor: pointer;
          border-radius: 8px;
          transition: all 0.2s ease;
          margin-bottom: 4px;
          border: 1px solid transparent;
          background: #1a1a1a;
        }

        .time-slot:hover {
          background: #2d2d2d;
          border-color: #444;
        }

        .time-slot.selected {
          background: #4a90e2;
          color: #ffffff;
          font-weight: 600;
          border-color: #5a9ef2;
        }

        .time-slot:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 1024px) {
          .card__doctorInfo {
            width: 48%;
            top: 8%;
          }
          
          .card__doctorImage {
            width: 48%;
            right: 6%;
            bottom: 6%;
          }
          
          .card__circularGlassmorphism {
            width: 52%;
            right: 4%;
            bottom: 4%;
          }
        }

        @media (max-width: 768px) {
          .thank-you-wrapper {
            padding: 0 15px;
          }

          .card__doctorInfo {
            left: 5%;
            top: 7%;
            width: 50%;
          }

          .card__doctorName {
            font-size: clamp(20px, 6.5vw, 32px);
          }

          .card__doctorTitle {
            font-size: clamp(11px, 3.5vw, 15px);
          }

          .card__doctorDescription {
            font-size: clamp(10px, 3vw, 13px);
            line-height: 1.4;
          }

          .card__consultButton {
            padding: 8px 16px;
            font-size: clamp(10px, 3vw, 12px);
          }

          .card__doctorImage {
            width: 46%;
            right: 5%;
            bottom: 5%;
          }

          .card__circularGlassmorphism {
            width: 50%;
            right: 3%;
            bottom: 3%;
          }

          .calendar-day {
            padding: 8px 2px;
            font-size: 12px;
          }

          .time-slot {
            padding: 8px 10px;
            font-size: 13px;
          }
        }

        @media (max-width: 480px) {
          .card__doctorInfo {
            width: 52%;
            top: 5%;
          }

          .card__doctorImage {
            width: 48%;
            right: 4%;
            bottom: 4%;
          }

          .card__circularGlassmorphism {
            width: 52%;
            right: 2%;
            bottom: 2%;
          }

          .calendar {
            padding: 0.75rem;
          }

          .calendar-day {
            padding: 6px 1px;
            font-size: 11px;
          }

          .time-picker {
            padding: 0.75rem;
          }

          .time-slot {
            padding: 6px 8px;
            font-size: 12px;
          }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@100;300;400;500;600&family=Orbitron:wght@400;700;900&display=swap"
        rel="stylesheet"
      />

      <div ref={cardRef} className="thank-you-card">
        <div className="card__backgroundGlassmorphism">
          <div
            ref={shineRef}
            style={{
              content: '""',
              position: "absolute",
              top: "-50%",
              left: "-50%",
              width: "200%",
              height: "200%",
              background:
                "linear-gradient(45deg, transparent 20%, rgba(255, 255, 255, 0.03) 35%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.25) 52%, rgba(255, 255, 255, 0.08) 65%, transparent 80%)",
              transform: "translateX(-50%) translateY(-50%) rotate(45deg)",
              transition: "transform 0.1s ease-out",
              opacity: 0,
              willChange: "transform",
              pointerEvents: "none",
            }}
          ></div>
        </div>
        <div ref={yearRef} className="card__doctorInfo">
          <div className="card__doctorName">{doctorData.name}</div>
          <div className="card__doctorTitle">{doctorData.title}</div>
          <div className="card__doctorDescription">{doctorData.description}</div>
          
        </div>
        <div ref={cometRef} className="card__cometOuter">
          <div className="card__comet"></div>
          <div className="card__comet card__comet--second"></div>
        </div>
        <div className="card__circularGlassmorphism"></div>
        <img src={doctorData.image} alt={doctorData.name} className="card__doctorImage" />
        <div ref={smallCircleRef} className="card__smallCircle"></div>
        <div ref={orangeShineRef} className="card__orangeShine"></div>
        <div className="card__greenShine"></div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="booking-form-glass" style={{
              background: "rgba(148, 188, 117, 0.08)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(3.2px)",
              WebkitBackdropFilter: "blur(3.2px)",
              border: "1px solid rgba(148, 188, 117, 0.53)",
              padding: "2rem",
              maxWidth: "28rem",
              width: "100%",
              position: "relative"
            }}>
            <button
              onClick={closeBookingModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-1 rounded-full backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Book Your Session</h2>
            
            <div className="space-y-4">
              <div className="relative">
                <button
                  onClick={() => setShowServiceDropdown(!showServiceDropdown)}
                  className="glass-button w-full text-left flex justify-between items-center"
                >
                  <span>{selectedService || "Select Service"}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showServiceDropdown && (
                  <div className="glass-dropdown absolute top-full left-0 right-0 mt-1 z-10">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="glass-dropdown-item"
                        onClick={() => {
                          setSelectedService(service.title);
                          setShowServiceDropdown(false);
                        }}
                      >
                        {service.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className="glass-button w-full text-left flex justify-between items-center"
                >
                  <span>{formatDate(selectedDate)}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </button>
                
                {showDatePicker && (
                  <div className="calendar absolute top-full left-0 right-0 mt-1 z-10">
                    <div className="calendar-header">
                      <button 
                        className="calendar-nav"
                        onClick={() => navigateMonth(-1)}
                      >
                        ‹
                      </button>
                      <div className="calendar-title">
                        {monthNames[currentMonth]} {currentYear}
                      </div>
                      <button 
                        className="calendar-nav"
                        onClick={() => navigateMonth(1)}
                      >
                        ›
                      </button>
                    </div>
                    
                    <div className="calendar-grid">
                      {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                        <div key={day} className="calendar-day-header">{day}</div>
                      ))}
                      
                      {generateCalendar().map((date, index) => {
                        const dateObj = new Date(date.year, date.month, date.day)
                        const isPast = isPastDate(dateObj)
                        const isTodayDate = isToday(dateObj)
                        const isSelected = isSelectedDate(dateObj)
                        
                        return (
                          <div
                            key={index}
                            className={`
                              calendar-day 
                              ${date.isCurrentMonth ? 'current-month' : 'other-month'}
                              ${isTodayDate ? 'today' : ''}
                              ${isSelected ? 'selected' : ''}
                              ${isPast ? 'past' : ''}
                            `}
                            onClick={() => !isPast && handleDateSelect(date.day, date.month, date.year)}
                          >
                            {date.day}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button
                  onClick={() => setShowTimePicker(!showTimePicker)}
                  className="glass-button w-full text-left flex justify-between items-center"
                >
                  <span>{selectedTime || "Select Time"}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                
                {showTimePicker && (
                  <div className="time-picker absolute top-full left-0 right-0 mt-1 z-10">
                    {timeSlots.map((time) => (
                      <div
                        key={time}
                        className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                        onClick={() => {
                          setSelectedTime(time)
                          setShowTimePicker(false)
                        }}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="pt-4">
                <button
                  onClick={handleConfirmBooking}
                  className="glass-button w-full bg-white/20 hover:bg-white/25 text-center justify-center"
                >
                  Confirm Booking
                </button>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-white/20 flex items-center">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center overflow-hidden">
                <img
                  src={doctorData.image}
                  alt={doctorData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4">
                <p className="text-white font-medium">{doctorData.name}</p>
                <p className="text-gray-300 text-sm">Available for consultation</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
      
      {/* Knowledge Overlay */}
      {showKnowledgeOverlay && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="booking-form-glass" style={{
              background: "rgba(148, 188, 117, 0.08)",
              borderRadius: "16px",
              boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
              backdropFilter: "blur(3.2px)",
              WebkitBackdropFilter: "blur(3.2px)",
              border: "1px solid rgba(148, 188, 117, 0.53)",
              padding: "2rem",
              maxWidth: "32rem",
              width: "100%",
              position: "relative"
            }}>
            <button
              onClick={closeBookingModal}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-1 rounded-full backdrop-blur-sm"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white">Booking Confirmed!</h2>
              <p className="text-gray-300 mt-2">Your session has been successfully booked</p>
            </div>
            
            <div className="bg-white/10 rounded-xl p-4 mb-6 backdrop-blur-sm">
              <div className="flex justify-between py-2">
                <span className="text-gray-300">Service:</span>
                <span className="text-white font-medium">{selectedService}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-300">Date:</span>
                <span className="text-white font-medium">{formatDate(selectedDate)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-300">Time:</span>
                <span className="text-white font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-300">Practitioner:</span>
                <span className="text-white font-medium">{doctorData.name}</span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={closeBookingModal}
                className="glass-button w-32 justify-center"
              >
                Done
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default ThankYouCard