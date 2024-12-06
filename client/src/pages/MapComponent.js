import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import './MapComponent.css';

const MapComponent = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch geolocation data when the component is mounted
  useEffect(() => {
    const fetchGeolocation = async () => {
      console.log("Fetching geolocation...");
      try {
        const response = await axios.get('http://localhost:3002/api/geo');
        console.log('Geolocation Data:', response.data);
        setGeoData(response.data);
      } catch (error) {
        console.error('Error fetching geolocation data:', error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchGeolocation();
  }, []); // Empty dependency array ensures it runs once when component mounts

  // If data is still loading, show a loading message
  if (loading) {
    console.log("Loading...");
    return <p className="loading-message">Loading map...</p>;
  }

  // If geolocation data is unavailable, show an error message
  if (!geoData) {
    console.log("Geolocation data not available.");
    return <p className="error-message">Unable to fetch geolocation data.</p>;
  }

  const { ip, latitude, longitude } = geoData;
  console.log("Rendering map with coordinates:", latitude, longitude);

  return (
    <div className="page-container">
      <div className="map-wrapper">
        <h2>Geolocation Info:</h2>
        <p>IP Address: {ip}</p>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>

        {/* Map component */}
        {latitude && longitude ? (
          <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[latitude, longitude]}>
              <Popup>
                IP Address: {ip}
                <br />
                Coordinates: {latitude}, {longitude}
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p className="error-message">Geolocation coordinates are not valid.</p>
        )}
      </div>
    </div>
  );
};

export default MapComponent;
