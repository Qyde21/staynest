import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  getHostStats, getHostProperties,
  getHostBookings, addHostProperty,
  toggleHostProperty
} from '../services/api';
import { formatKES } from '../data/properties';
import ImageUploader from '../components/ImageUploader';
import './HostDashboardPage.css';

function HostDashboardPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [properties, setProperties] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProperty, setNewProperty] = useState({
    title: '', location: '', category: 'beach', price_per_night: '',
    beds: '', baths: '', max_guests: '', highlight: '',
    description: '', amenities: '', images: ''
  });
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    if (!user.isHost && !user.isAdmin) { navigate('/become-a-host'); return; }
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [s, p, b] = await Promise.all([
        getHostStats(token),
        getHostProperties(token),
        getHostBookings(token),
      ]);
      setStats(s);
      setProperties(Array.isArray(p) ? p : []);
      setBookings(Array.isArray(b) ? b : []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleToggle = async (id) => {
    await toggleHostProperty(id, token);
    fetchAll();
  };

  const handleAddProperty = async () => {
    setAdding(true);
    setAddError('');
    const data = await addHostProperty(newProperty, token);
    if (data.error) {
      setAddError(data.error);
    } else {
      setAddSuccess(true);
      setNewProperty({ title: '', location: '', category: 'beach', price_per_night: '', beds: '', baths: '', max_guests: '', highlight: '', description: '', amenities: '', images: '' });
      fetchAll();
      setTimeout(() => setAddSuccess(false), 3000);
    }
    setAdding(false);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'properties', label: 'My Properties' },
    { id: 'bookings', label: 'Bookings' },
    { id: 'add', label: 'Add Property' },
  ];

  if (loading) return (
    <div className="host-dashboard">
      <div className="container" style={{ padding: '120px 24px', textAlign: 'center', color: 'var(--stone)' }}>
        Loading your dashboard...
      </div>
    </div>
  );

  return (
    <div className="host-dashboard">
      <div className="host-dashboard__sidebar">
        <div className="host-dashboard__header">
          <div className="host-dashboard__avatar">
            {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
          </div>
          <div>
            <h3>{user.firstName} {user.lastName}</h3>
            <p>Host</p>
          </div>
        </div>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`host-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
        <Link to="/listings" className="host-view-site">View Site</Link>
      </div>

      <div className="host-dashboard__content">
        {/* Overview */}
        {activeTab === 'overview' && stats && (
          <div className="host-section">
            <h1>Welcome back, {user.firstName}!</h1>
            <div className="host-stats">
              <div className="host-stat-card">
                <p className="host-stat-card__value">{stats.totalProperties}</p>
                <p className="host-stat-card__label">Active Properties</p>
              </div>
              <div className="host-stat-card">
                <p className="host-stat-card__value">{stats.totalBookings}</p>
                <p className="host-stat-card__label">Total Bookings</p>
              </div>
              <div className="host-stat-card host-stat-card--revenue">
                <p className="host-stat-card__value">{formatKES(stats.totalRevenue)}</p>
                <p className="host-stat-card__label">Total Earnings</p>
              </div>
            </div>

            <h2>Recent Bookings</h2>
            {stats.recentBookings?.length === 0 ? (
              <p className="host-empty">No bookings yet. Add a property to get started!</p>
            ) : (
              <div className="host-table-wrap">
                <table className="host-table">
                  <thead>
                    <tr>
                      <th>Ref</th>
                      <th>Property</th>
                      <th>Guest</th>
                      <th>Check-in</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentBookings?.map((b) => (
                      <tr key={b.id}>
                        <td><strong>{b.booking_ref}</strong></td>
                        <td>{b.title}</td>
                        <td>{b.first_name} {b.last_name}</td>
                        <td>{new Date(b.checkin_date).toLocaleDateString('en-KE')}</td>
                        <td>{formatKES(b.total_amount)}</td>
                        <td><span className={`host-badge host-badge--${b.status}`}>{b.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Properties */}
        {activeTab === 'properties' && (
          <div className="host-section">
            <div className="host-section__header">
              <h1>My Properties ({properties.length})</h1>
              <button className="host-add-btn" onClick={() => setActiveTab('add')}>+ Add Property</button>
            </div>
            {properties.length === 0 ? (
              <div className="host-empty-state">
                <p>You have no properties listed yet.</p>
                <button className="host-add-btn" onClick={() => setActiveTab('add')}>Add your first property</button>
              </div>
            ) : (
              <div className="host-properties-grid">
                {properties.map((p) => (
                  <div key={p.id} className="host-property-card">
                    <div className="host-property-card__img">
                      <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80'} alt={p.title} />
                    </div>
                    <div className="host-property-card__body">
                      <p className="host-property-card__location">{p.location}</p>
                      <h3 className="host-property-card__title">{p.title}</h3>
                      <div className="host-property-card__meta">
                        <span>{formatKES(p.price_per_night)}/night</span>
                        <span>★ {p.rating}</span>
                      </div>
                      <div className="host-property-card__actions">
                        <span className={`host-badge ${p.is_active ? 'host-badge--confirmed' : 'host-badge--cancelled'}`}>
                          {p.is_active ? 'Active' : 'Inactive'}
                        </span>
                        <button className="host-toggle-btn" onClick={() => handleToggle(p.id)}>
                          {p.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                        <Link to={`/property/${p.id}`} className="host-view-btn">View</Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bookings */}
        {activeTab === 'bookings' && (
          <div className="host-section">
            <h1>Bookings ({bookings.length})</h1>
            {bookings.length === 0 ? (
              <p className="host-empty">No bookings yet.</p>
            ) : (
              <div className="host-table-wrap">
                <table className="host-table">
                  <thead>
                    <tr>
                      <th>Ref</th>
                      <th>Property</th>
                      <th>Guest</th>
                      <th>Dates</th>
                      <th>Guests</th>
                      <th>Total</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id}>
                        <td><strong>{b.booking_ref}</strong></td>
                        <td>{b.title}</td>
                        <td>
                          {b.first_name} {b.last_name}
                          <br /><small>{b.email}</small>
                          <br /><small>{b.phone}</small>
                        </td>
                        <td>
                          {new Date(b.checkin_date).toLocaleDateString('en-KE')}
                          <br />to {new Date(b.checkout_date).toLocaleDateString('en-KE')}
                        </td>
                        <td>{b.guests}</td>
                        <td>{formatKES(b.total_amount)}</td>
                        <td><span className={`host-badge host-badge--${b.status}`}>{b.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Add Property */}
        {activeTab === 'add' && (
          <div className="host-section">
            <h1>Add New Property</h1>
            {addSuccess && <div className="host-success">Property added successfully!</div>}
            {addError && <div className="host-error">{addError}</div>}
            <div className="host-form">
              <div className="host-form__row">
                <div className="host-form__field">
                  <label>Title *</label>
                  <input value={newProperty.title} onChange={(e) => setNewProperty({...newProperty, title: e.target.value})} placeholder="Diani Oceanfront Villa" />
                </div>
                <div className="host-form__field">
                  <label>Location *</label>
                  <input value={newProperty.location} onChange={(e) => setNewProperty({...newProperty, location: e.target.value})} placeholder="Diani Beach, Kwale County" />
                </div>
              </div>
              <div className="host-form__row">
                <div className="host-form__field">
                  <label>Category *</label>
                  <select value={newProperty.category} onChange={(e) => setNewProperty({...newProperty, category: e.target.value})}>
                    <option value="beach">Beach</option>
                    <option value="safari">Safari</option>
                    <option value="mountain">Mountain</option>
                    <option value="city">City</option>
                    <option value="lakeside">Lakeside</option>
                    <option value="farm">Farm</option>
                  </select>
                </div>
                <div className="host-form__field">
                  <label>Price per Night (KES) *</label>
                  <input type="number" value={newProperty.price_per_night} onChange={(e) => setNewProperty({...newProperty, price_per_night: e.target.value})} placeholder="15000" />
                </div>
              </div>
              <div className="host-form__row">
                <div className="host-form__field">
                  <label>Beds</label>
                  <input type="number" value={newProperty.beds} onChange={(e) => setNewProperty({...newProperty, beds: e.target.value})} placeholder="2" />
                </div>
                <div className="host-form__field">
                  <label>Baths</label>
                  <input type="number" value={newProperty.baths} onChange={(e) => setNewProperty({...newProperty, baths: e.target.value})} placeholder="2" />
                </div>
                <div className="host-form__field">
                  <label>Max Guests</label>
                  <input type="number" value={newProperty.max_guests} onChange={(e) => setNewProperty({...newProperty, max_guests: e.target.value})} placeholder="4" />
                </div>
              </div>
              <div className="host-form__field">
                <label>Highlight</label>
                <input value={newProperty.highlight} onChange={(e) => setNewProperty({...newProperty, highlight: e.target.value})} placeholder="Beachfront" />
              </div>
              <div className="host-form__field">
                <label>Description</label>
                <textarea rows={4} value={newProperty.description} onChange={(e) => setNewProperty({...newProperty, description: e.target.value})} placeholder="Describe your property..." />
              </div>
              <div className="host-form__field">
                <label>Amenities (comma separated)</label>
                <input value={newProperty.amenities} onChange={(e) => setNewProperty({...newProperty, amenities: e.target.value})} placeholder="WiFi, Pool, Kitchen, Parking" />
              </div>
             <div className="host-form__field">
  <label>Photos</label>
  <ImageUploader
    images={newProperty.images ? newProperty.images.split(',').map(s => s.trim()).filter(Boolean) : []}
    onChange={(imgs) => setNewProperty({...newProperty, images: imgs.join(',')})}
  />
</div>
              <button className="host-submit-btn" onClick={handleAddProperty} disabled={adding}>
                {adding ? 'Adding...' : 'Add Property'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default HostDashboardPage;