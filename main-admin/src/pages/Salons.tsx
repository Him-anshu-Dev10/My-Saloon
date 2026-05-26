import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

export default function Salons() {
  const [showModal, setShowModal] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [salons, setSalons] = useState<any[]>([]);
  
  // Salon state
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  
  // Admin state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminSalonId, setAdminSalonId] = useState('');

  const VITE_BACKEND_URL = 'http://localhost:3000/api/v1';

  const fetchSalons = async () => {
    try {
      const res = await fetch(`${VITE_BACKEND_URL}/salons`);
      const json = await res.json();
      if (json.success) {
        setSalons(json.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchSalons();
  }, []);

  const handleCreate = async () => {
    try {
      const res = await fetch("/salons", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('superadmin_token')}`
        },
        body: JSON.stringify({ name, city, latitude: 0, longitude: 0, starting_price: 50 })
      });
      if (res.ok) {
        setShowModal(false);
        setName('');
        setCity('');
        fetchSalons();
      } else {
        alert('Failed to create salon');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateAdmin = async () => {
    try {
        const res = await fetch(`${VITE_BACKEND_URL}/auth/create-salon-admin`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('superadmin_token')}`
          },
          body: JSON.stringify({ email: adminEmail, password: adminPassword, salon_id: adminSalonId })
        });
        const json = await res.json();
        if (res.ok) {
          alert('Admin created successfully!');
          setShowAdminModal(false);
          setAdminEmail('');
          setAdminPassword('');
          setAdminSalonId('');
        } else {
          alert('Failed to create admin: ' + (json.message || 'Error'));
        }
      } catch (e) {
          console.error(e);
      }
  };

  return (
    <Layout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#111' }}>Manage Salons</h1>
        <button 
          onClick={() => setShowModal(true)}
          style={{ background: '#000', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
        >
          + Add New Salon
        </button>
      </div>

      <div style={{ marginTop: '30px', background: '#fff', borderRadius: '12px', border: '1px solid #eee', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: '#111' }}>
          <thead style={{ background: '#f5f5f5', borderBottom: '1px solid #eee' }}>
            <tr>
              <th style={{ padding: '15px 20px' }}>Name</th>
              <th style={{ padding: '15px 20px' }}>City</th>
              <th style={{ padding: '15px 20px' }}>Rating</th>
              <th style={{ padding: '15px 20px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salons.map(s => (
              <tr key={s.id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px 20px' }}>{s.name}</td>
                <td style={{ padding: '15px 20px' }}>{s.city}</td>
                <td style={{ padding: '15px 20px' }}>{s.rating || 'New'}</td>
                <td style={{ padding: '15px 20px' }}>
                  <button 
                    onClick={() => {
                        setAdminSalonId(s.id);
                        setShowAdminModal(true);
                    }}
                    style={{ background: '#CA9A86', border: 'none', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', color: '#fff', marginRight: '10px' }}>
                    + Create Admin
                  </button>
                  <button style={{ background: 'transparent', border: '1px solid #ccc', padding: '5px 10px', borderRadius: '6px', cursor: 'pointer', color: '#111' }}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '400px' }}>
            <h2 style={{ marginTop: 0, color: '#111' }}>Create Salon Profile</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <input 
                placeholder="Salon Name" 
                value={name} onChange={e => setName(e.target.value)}
                style={{ background: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', width: '100%', boxSizing: 'border-box', color: '#111' }} 
              />
              <input 
                placeholder="City" 
                value={city} onChange={e => setCity(e.target.value)}
                style={{ background: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', width: '100%', boxSizing: 'border-box', color: '#111' }} 
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  onClick={handleCreate}
                  style={{ flex: 1, background: '#000', color: '#fff', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                  Save Salon
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  style={{ flex: 1, background: '#fff', color: '#111', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showAdminModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#fff', padding: '30px', borderRadius: '12px', width: '400px' }}>
            <h2 style={{ marginTop: 0, color: '#111' }}>Create Salon Admin</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
              <input 
                placeholder="Admin Email" 
                value={adminEmail} onChange={e => setAdminEmail(e.target.value)}
                style={{ background: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', width: '100%', boxSizing: 'border-box', color: '#111' }} 
              />
              <input 
                placeholder="Password" 
                type="password"
                value={adminPassword} onChange={e => setAdminPassword(e.target.value)}
                style={{ background: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', width: '100%', boxSizing: 'border-box', color: '#111' }} 
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button 
                  onClick={handleCreateAdmin}
                  style={{ flex: 1, background: '#000', color: '#fff', padding: '10px', borderRadius: '6px', border: 'none', cursor: 'pointer' }}>
                  Create Account
                </button>
                <button 
                  onClick={() => setShowAdminModal(false)}
                  style={{ flex: 1, background: '#fff', color: '#111', padding: '10px', borderRadius: '6px', border: '1px solid #ccc', cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

