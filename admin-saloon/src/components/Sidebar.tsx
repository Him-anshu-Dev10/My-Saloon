import React from 'react'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">Glowup</div>
      <nav>
        <ul>
          <li className="active"><img className="nav-icon" src="/icons-high/dashboard.svg" alt=""/>Dashboard</li>
          <li><img className="nav-icon" src="/icons-high/calendar.svg" alt=""/>Bookings</li>
          <li><img className="nav-icon" src="/icons-high/briefcase.svg" alt=""/>Services</li>
          <li><img className="nav-icon" src="/icons-high/users.svg" alt=""/>Team</li>
          <li><img className="nav-icon" src="/icons-high/settings.svg" alt=""/>Salon Profile</li>
        </ul>
      </nav>
      <button className="new-booking"><img className="btn-icon" src="/icons-high/plus.svg" alt=""/>New Booking</button>
    </aside>
  )
}
