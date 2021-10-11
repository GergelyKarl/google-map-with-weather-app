import React, { ElementType } from "react";
import { Wrapper } from "./Global-styles";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from "@react-google-maps/api";

const App: React.FC = () => {
  const containerStyle = {
    width: '1400px',
    height: '400px'
  };
  
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_APP!,
  });

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
  };

  const unMount = () => {
    mapRef.current = null;
  };

  if (!isLoaded) {
    return (
      <>
        <div>sddf</div>
      </>
    );
  }

  return (
    <Wrapper>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}  onLoad={onLoad} onUnmount={unMount} />
    </Wrapper>
  );
};

export default App;
