import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  getAdminStats, getAdminUsers, getAdminBookings,
  getAdminProperties, getAdminReviews,
  toggleProperty, cancelAdminBooking,
  deleteAdminReview, deleteAdminUser,
  addAdminProperty
} from "../services/api";
import { formatKES } from "../data/properties";
import ImageUploader from "../components/ImageUploader";
import "./AdminPage.css";

function AdminPage() {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [properties, setProperties] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProperty, setNewProperty] = useState({
    title: "", location: "", category: "beach", price_per_night: "",
    beds: "", baths: "", max_guests: "", highlight: "",
    description: "", amenities: "", images: "", latitude: "", longitude: ""
  });
  const [addingProperty, setAddingProperty] = useState(false);
  const [addPropertyError, setAddPropertyError] = useState("");
  const [addPropertySuccess, setAddPropertySuccess] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!user) { navigate("/login"); return; }
    if (!user.isAdmin) { navigate("/"); return; }
    fetchAll();
  }, [user]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [s, u, b, p, r] = await Promise.all([
        getAdminStats(token),
        getAdminUsers(token),
        getAdminBookings(token),
        getAdminProperties(token),
        getAdminReviews(token),
      ]);
      setStats(s);
      setUsers(Array.isArray(u) ? u : []);
      setBookings(Array.isArray(b) ? b : []);
      setProperties(Array.isArray(p) ? p : []);
      setReviews(Array.isArray(r) ? r : []);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleToggleProperty = async (id) => {
    await toggleProperty(id, token);
    fetchAll();
  };

  const handleCancelBooking = async (id) => {
    if (!window.confirm("Cancel this booking?")) return;
    await cancelAdminBooking(id, token);
    fetchAll();
  };

  const handleDeleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) return;
    await deleteAdminReview(id, token);
    fetchAll();
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Delete this user?")) return;
    await deleteAdminUser(id, token);
    fetchAll();
  };

  const handleAddProperty = async () => {
    setAddingProperty(true);
    setAddPropertyError("");
    const data = await addAdminProperty(newProperty, token);
    if (data.error) {
      setAddPropertyError(data.error);
    } else {
      setAddPropertySuccess(true);
      setNewProperty({ title: "", location: "", category: "beach", price_per_night: "", beds: "", baths: "", max_guests: "", highlight: "", description: "", amenities: "", images: "", latitude: "", longitude: "" });
      fetchAll();
      setTimeout(() => setAddPropertySuccess(false), 3000);
    }
    setAddingProperty(false);
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "properties", label: "Properties" },
    { id: "add-property", label: "Add Property" },
    { id: "bookings", label: "Bookings" },
    { id: "users", label: "Users" },
    { id: "reviews", label: "Reviews" },
  ];

  if (loading) return (
    <div className="admin-page">
      <div className="admin-loading container">Loading dashboard...</div>
    </div>
  );

  return (
    <div className="admin-page">
      <div className="admin-sidebar">
        <div className="admin-sidebar__header">
          <h2>Admin</h2>
          <p>StayNest Kenya</p>
        </div>
        {tabs.map((tab) => (
          <button key={tab.id} className={`admin-tab ${activeTab === tab.id ? "active" : ""}`} onClick={() => setActiveTab(tab.id)}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="admin-content">
        {activeTab === "overview" && stats && (
          <div className="admin-section">
            <h1>Dashboard Overview</h1>
            <div className="admin-stats">
              <div className="stat-card">
                <span className="stat-card__icon">Users</span>
                <div><p className="stat-card__value">{stats.totalUsers}</p><p className="stat-card__label">Total Users</p></div>
              </div>
              <div className="stat-card">
                <span className="stat-card__icon">Props</span>
                <div><p className="stat-card__value">{stats.totalProperties}</p><p className="stat-card__label">Active Properties</p></div>
              </div>
              <div className="stat-card">
                <span className="stat-card__icon">Book</span>
                <div><p className="stat-card__value">{stats.totalBookings}</p><p className="stat-card__label">Total Bookings</p></div>
              </div>
              <div className="stat-card stat-card--revenue">
                <span className="stat-card__icon">KES</span>
                <div><p className="stat-card__value">{formatKES(stats.totalRevenue)}</p><p className="stat-card__label">Total Revenue</p></div>
              </div>
            </div>
            <h2>Recent Bookings</h2>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Ref</th><th>Property</th><th>Guest</th><th>Check-in</th><th>Total</th><th>Status</th></tr></thead>
                <tbody>
                  {stats.recentBookings?.map((b) => (
                    <tr key={b.id}>
                      <td><strong>{b.booking_ref}</strong></td>
                      <td>{b.title}</td>
                      <td>{b.first_name} {b.last_name}</td>
                      <td>{new Date(b.checkin_date).toLocaleDateString("en-KE")}</td>
                      <td>{formatKES(b.total_amount)}</td>
                      <td><span className={`admin-badge admin-badge--${b.status}`}>{b.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "properties" && (
          <div className="admin-section">
            <h1>Manage Properties ({properties.length})</h1>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Property</th><th>Category</th><th>Price/Night</th><th>Rating</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {properties.map((p) => (
                    <tr key={p.id}>
                      <td><strong>{p.title}</strong><br /><small>{p.location}</small></td>
                      <td>{p.category}</td>
                      <td>{formatKES(p.price_per_night)}</td>
                      <td>{p.rating}</td>
                      <td><span className={`admin-badge ${p.is_active ? "admin-badge--confirmed" : "admin-badge--cancelled"}`}>{p.is_active ? "Active" : "Inactive"}</span></td>
                      <td><button className="admin-action-btn" onClick={() => handleToggleProperty(p.id)}>{p.is_active ? "Deactivate" : "Activate"}</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "add-property" && (
          <div className="admin-section">
            <h1>Add New Property</h1>
            {addPropertySuccess && <div className="admin-success">Property added successfully!</div>}
            {addPropertyError && <div className="admin-error">{addPropertyError}</div>}
            <div className="admin-form">
              <div className="admin-form__row">
                <div className="admin-form__field"><label>Title *</label><input value={newProperty.title} onChange={(e) => setNewProperty({...newProperty, title: e.target.value})} placeholder="Diani Oceanfront Villa" /></div>
                <div className="admin-form__field"><label>Location *</label><input value={newProperty.location} onChange={(e) => setNewProperty({...newProperty, location: e.target.value})} placeholder="Diani Beach, Kwale County" /></div>
              </div>
              <div className="admin-form__row">
                <div className="admin-form__field">
                  <label>Category *</label>
                  <select value={newProperty.category} onChange={(e) => setNewProperty({...newProperty, category: e.target.value})}>
                    <option value="beach">Beach</option><option value="safari">Safari</option><option value="mountain">Mountain</option><option value="city">City</option><option value="lakeside">Lakeside</option><option value="farm">Farm</option>
                  </select>
                </div>
                <div className="admin-form__field"><label>Price per Night (KES) *</label><input type="number" value={newProperty.price_per_night} onChange={(e) => setNewProperty({...newProperty, price_per_night: e.target.value})} placeholder="15000" /></div>
              </div>
              <div className="admin-form__row">
                <div className="admin-form__field"><label>Beds</label><input type="number" value={newProperty.beds} onChange={(e) => setNewProperty({...newProperty, beds: e.target.value})} placeholder="2" /></div>
                <div className="admin-form__field"><label>Baths</label><input type="number" value={newProperty.baths} onChange={(e) => setNewProperty({...newProperty, baths: e.target.value})} placeholder="2" /></div>
                <div className="admin-form__field"><label>Max Guests</label><input type="number" value={newProperty.max_guests} onChange={(e) => setNewProperty({...newProperty, max_guests: e.target.value})} placeholder="4" /></div>
              </div>
              <div className="admin-form__field"><label>Highlight</label><input value={newProperty.highlight} onChange={(e) => setNewProperty({...newProperty, highlight: e.target.value})} placeholder="Beachfront" /></div>
              <div className="admin-form__field"><label>Description</label><textarea rows={4} value={newProperty.description} onChange={(e) => setNewProperty({...newProperty, description: e.target.value})} placeholder="Describe the property..." /></div>
              <div className="admin-form__field"><label>Amenities (comma separated)</label><input value={newProperty.amenities} onChange={(e) => setNewProperty({...newProperty, amenities: e.target.value})} placeholder="WiFi, Pool, Kitchen, Parking" /></div>
              <div className="admin-form__field">
                <label>Photos</label>
                <ImageUploader
                  images={newProperty.images ? newProperty.images.split(',').map(s => s.trim()).filter(Boolean) : []}
                  onChange={(imgs) => setNewProperty({...newProperty, images: imgs.join(',')})}
                />
              </div>
              <div className="admin-form__row">
                <div className="admin-form__field">
                  <label>Latitude (for map)</label>
                  <input type="number" step="any" value={newProperty.latitude} onChange={(e) => setNewProperty({...newProperty, latitude: e.target.value})} placeholder="-4.2769" />
                </div>
                <div className="admin-form__field">
                  <label>Longitude (for map)</label>
                  <input type="number" step="any" value={newProperty.longitude} onChange={(e) => setNewProperty({...newProperty, longitude: e.target.value})} placeholder="39.5908" />
                </div>
              </div>
              <button className="admin-submit-btn" onClick={handleAddProperty} disabled={addingProperty}>{addingProperty ? "Adding..." : "Add Property"}</button>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="admin-section">
            <h1>Manage Bookings ({bookings.length})</h1>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Ref</th><th>Property</th><th>Guest</th><th>Dates</th><th>Total</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {bookings.map((b) => (
                    <tr key={b.id}>
                      <td><strong>{b.booking_ref}</strong></td>
                      <td>{b.title}</td>
                      <td>{b.first_name} {b.last_name}<br /><small>{b.email}</small></td>
                      <td>{new Date(b.checkin_date).toLocaleDateString("en-KE")} to {new Date(b.checkout_date).toLocaleDateString("en-KE")}</td>
                      <td>{formatKES(b.total_amount)}</td>
                      <td><span className={`admin-badge admin-badge--${b.status}`}>{b.status}</span></td>
                      <td>{b.status === "confirmed" && <button className="admin-action-btn admin-action-btn--danger" onClick={() => handleCancelBooking(b.id)}>Cancel</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div className="admin-section">
            <h1>Manage Users ({users.length})</h1>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Joined</th><th>Action</th></tr></thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td><strong>{u.first_name} {u.last_name}</strong></td>
                      <td>{u.email}</td>
                      <td>{u.phone || "-"}</td>
                      <td>{u.is_admin ? <span className="admin-badge admin-badge--paid">Admin</span> : u.is_host ? <span className="admin-badge admin-badge--confirmed">Host</span> : <span className="admin-badge">Guest</span>}</td>
                      <td>{new Date(u.created_at).toLocaleDateString("en-KE")}</td>
                      <td>{!u.is_admin && <button className="admin-action-btn admin-action-btn--danger" onClick={() => handleDeleteUser(u.id)}>Delete</button>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="admin-section">
            <h1>Manage Reviews ({reviews.length})</h1>
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead><tr><th>Property</th><th>Reviewer</th><th>Rating</th><th>Comment</th><th>Date</th><th>Action</th></tr></thead>
                <tbody>
                  {reviews.map((r) => (
                    <tr key={r.id}>
                      <td><strong>{r.property_title}</strong></td>
                      <td>{r.reviewer_name}</td>
                      <td>{r.rating}/5</td>
                      <td>{r.comment || "-"}</td>
                      <td>{new Date(r.created_at).toLocaleDateString("en-KE")}</td>
                      <td><button className="admin-action-btn admin-action-btn--danger" onClick={() => handleDeleteReview(r.id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;