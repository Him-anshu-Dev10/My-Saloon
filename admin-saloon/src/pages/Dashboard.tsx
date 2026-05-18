import React from 'react'
import Layout from '../components/Layout'
import './dashboard.css'

type Props = {
  user: string
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: Props) {
  return (
    <Layout user={user} onLogout={onLogout}>
      <div className="dashboard-root container">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="date">Thursday, October 24</div>
            <h1 className="greeting">Good morning, Sarah</h1>
          </div>
          <div className="header-right">
            <div className="small-stats">
              <div className="stat">New customers<br /><strong>8</strong></div>
            </div>
          </div>
        </header>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="label">Daily Revenue</div>
            <div className="value">$1,250</div>
          </div>
          <div className="metric-card">
            <div className="label">Total Bookings</div>
            <div className="value">42</div>
          </div>
          <div className="metric-card">
            <div className="label">New Customers</div>
            <div className="value">8</div>
          </div>
          <div className="metric-card">
            <div className="label">Average Rating</div>
            <div className="value">4.9</div>
          </div>
        </div>

        <div className="main-grid">
          <section className="card appointments-card">
            <div className="card-title">
              <span>Upcoming Appointments Today</span>
              <a className="view-all" href="#">View All</a>
            </div>

            <ul className="appointments">
              <li>
                <div className="time">09:00</div>
                <div className="info">
                  <div className="client">Emma Thompson</div>
                  <div className="meta">Balayage & Cut • with Jessica</div>
                </div>
                <div className="status in-progress">In Progress</div>
              </li>

              <li>
                <div className="time">10:30</div>
                <div className="info">
                  <div className="client">Michael Reed</div>
                  <div className="meta">Men's Styling • with David</div>
                </div>
                <div className="status pending">Pending</div>
              </li>

              <li>
                <div className="time">11:15</div>
                <div className="info">
                  <div className="client">Sophia Chen</div>
                  <div className="meta">Signature Facial • with Sarah</div>
                </div>
                <div className="status confirmed">Confirmed</div>
              </li>
            </ul>
          </section>

          <aside className="right-col">
            <div className="card quick-actions">
              <div className="card-title">Quick Actions</div>
              <div className="actions">
                <button className="btn primary">New Booking</button>
                <button className="btn outline">Add Team Member</button>
              </div>
            </div>

            <div className="card gallery">
              <div className="card-title">Gallery</div>
              <div className="thumbs">
                <div className="thumb" />
                <div className="thumb" />
                <div className="thumb" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Layout>
  )
}
