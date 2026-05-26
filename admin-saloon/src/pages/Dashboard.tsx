import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import './dashboard.css'

type Props = {
  user: any
  onLogout: () => void
}

export default function Dashboard({ user, onLogout }: Props) {
  const [bookings, setBookings] = useState<any[]>([]);
  const [allocationStylist, setAllocationStylist] = useState<Record<string, string>>({});

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await fetch('http://localhost:3000/api/v1/bookings/admin', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });
      const data = await res.json();
      if (data.success) {
        setBookings(data.data || []);
      }
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const handleAllocate = async (bookingId: string) => {
    const stylist = allocationStylist[bookingId];
    if (!stylist) return alert("Please enter a barber's name.");

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");
      const res = await fetch("http://localhost:3000/api/v1/bookings/admin/" + bookingId + "/allocate", {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify({ stylist })
      });
      const data = await res.json();
      if (data.success) {
        alert("Barber allocated successfully!");
        fetchBookings();
      } else {
        alert(data.message || "Failed to allocate.");
      }
    } catch (err) {
      console.error(err);
      alert("Error allocating barber.");
    }
  };

  const totalRevenue = bookings.reduce((sum, b) => sum + Number(b.total_price || 0), 0);
  
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout user={user?.email || 'Admin'} onLogout={onLogout}>
      <div className="dashboard-root container">
        <header className="dashboard-header">
          <div className="header-left">
            <div className="date">{today}</div>
            <h1 className="greeting">Good morning, {user?.email ? user.email.split('@')[0] : 'Admin'}</h1>
          </div>
          <div className="header-right">
            <div className="small-stats">
              <div className="stat">Total Bookings<br /><strong>{bookings.length}</strong></div>
            </div>
          </div>
        </header>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="label">Total Revenue</div>
            <div className="value"></div>
          </div>
          <div className="metric-card">
            <div className="label">Total Appointments</div>
            <div className="value">{bookings.length}</div>
          </div>
        </div>

        <div className="main-grid">
          <section className="card appointments-card">
            <div className="card-title">
              <span>Appointment Log</span>
            </div>

            <ul className="appointments">
              {bookings.length === 0 ? (
                <li style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                  No appointments found.
                </li>
              ) : bookings.map((b) => (
                <li key={b.id}>
                  <div className="time">{b.booking_time}</div>
                  <div className="info">
                    <div className="client">{b.customer_name} ({b.customer_email})</div>
                    <div className="meta">{b.hairstyle} &bull; Date: {new Date(b.booking_date).toLocaleDateString()}</div>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <strong style={{ fontSize: '13px' }}>Stylist:</strong>
                      {b.stylist ? (
                        <span style={{ fontSize: '13px', background: '#e0e0e0', padding: '2px 8px', borderRadius: '4px' }}>{b.stylist}</span>
                      ) : (
                        <span style={{ fontSize: '13px', background: '#ffe0b2', padding: '2px 8px', borderRadius: '4px', color: '#d84315' }}>Unassigned</span>
                      )}
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                    <div className={"status " + (b.booking_status === 'confirmed' ? 'confirmed' : 'pending')}>
                      {b.booking_status}
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <input 
                        type="text" 
                        placeholder="Barber name" 
                        value={allocationStylist[b.id] || ''}
                        onChange={(e) => setAllocationStylist({...allocationStylist, [b.id]: e.target.value})}
                        style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '12px', width: '100px' }}
                      />
                      <button 
                        onClick={() => handleAllocate(b.id)}
                        style={{ padding: '4px 8px', background: '#000', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                      >
                        Allocate
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </Layout>
  )
}