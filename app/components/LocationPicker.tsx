"use client";

import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { useCallback, useState } from "react";

const containerStyle = {
  width: "100%",
  height: "400px",
};

export const LocationPicker = ({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) => {
  const maps_api_key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  console.log(maps_api_key)
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [showInfoWindow, setShowInfoWindow] = useState(false);

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      const latLng = e.latLng;
      if (latLng) {
        setSelectedLocation({
          lat: latLng.lat(),
          lng: latLng.lng(),
        });
        setShowInfoWindow(true);
        onLocationSelect(latLng.lat(), latLng.lng());
      }
    },
    [onLocationSelect]
  );

  return (
    <LoadScript googleMapsApiKey={maps_api_key}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: -1.2921, lng: 36.8219 }} // default location (e.g., Nairobi, Kenya)
        zoom={12}
        onClick={handleMapClick}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
        {showInfoWindow && selectedLocation && (
          <InfoWindow
            position={selectedLocation}
            onCloseClick={() => setShowInfoWindow(false)}
          >
            <div>
              <p>Latitude: {selectedLocation.lat}</p>
              <p>Longitude: {selectedLocation.lng}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};
