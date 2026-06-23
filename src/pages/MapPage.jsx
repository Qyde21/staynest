import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import L from "leaflet";
import { getProperties } from "../services/api";
import { formatKES } from "../data/properties";
import "leaflet/dist/leaflet.css";
import "./MapPage.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapPage() {
  const [properties, setProperties] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const fetchProperties = async () => {
      const data = await getProperties();
      setProperties(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetchProperties();
  }, []);

  const filtered = activeCategory === "all"
    ? properties
    : properties.filter((p) => p.category === activeCategory);

  const mappable = filtered.filter((p) => p.latitude && p.longitude);

  const categories = [
    { id: "all", label: "All" },
    { id: "beach", label: "Beach" },
    { id: "safari", label: "Safari" },
    { id: "mountain", label: "Mountain" },
    { id: "city", label: "City" },
    { id: "lakeside", label: "Lakeside" },
    { id: "farm", label: "Farm" },
  ];

  return (
    <div className="map-page">
      <div className="map-page__sidebar">
        <div className="map-page__sidebar-header">
          <h1>Explore Kenya</h1>
          <p>{filtered.length} stays</p>
        </div>

        <div className="map-page__categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`map-cat-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="map-page__list">
          {loading ? (
            <p className="map-page__loading">Loading stays...</p>
          ) : (
            filtered.map((p) => (
              <div
                key={p.id}
                className={`map-listing ${selected?.id === p.id ? "active" : ""}`}
                onClick={() => setSelected(p)}
              >
                <img src={p.images?.[0]} alt={p.title} />
                <div className="map-listing__info">
                  <p className="map-listing__location">{p.location}</p>
                  <h3 className="map-listing__title">{p.title}</h3>
                  <div className="map-listing__meta">
                    <span>â˜… {p.rating}</span>
                    <span>{formatKES(p.price_per_night)} / night</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="map-page__map">
        <MapContainer
          center={[-0.5, 37.5]}
          zoom={6}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mappable.map((p) => (
            <Marker
              key={p.id}
              position={[Number(p.latitude), Number(p.longitude)]}
              eventHandlers={{ click: () => setSelected(p) }}
            >
              <Popup>
                <div className="map-popup">
                  <img src={p.images?.[0]} alt={p.title} />
                  <h4>{p.title}</h4>
                  <p>{p.location}</p>
                  <div className="map-popup__meta">
                    <span>â˜… {p.rating}</span>
                    <span>{formatKES(p.price_per_night)}/night</span>
                  </div>
                  <Link to={`/property/${p.id}`}>View property â†’</Link>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapPage;