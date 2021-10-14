import React, { useState } from "react";
import { Wrapper } from "./Global-styles";
import { GoogleMap, Marker, InfoWindow, useJsApiLoader, InfoBox } from "@react-google-maps/api";
import { useQuery } from "react-query";
import { fetcWeather } from "./api";

export type WeatherType = {
  temp: number;
  text: string;
};

export type Coordinate = {
  lat: number;
  lng: number;
};

const testr = {
  lat: 47,
  lng: 19,
};

const App: React.FC = () => {
  const [selectedPosition, setSelectedPosition] = useState<Coordinate>({} as Coordinate);
  const containerStyle = {
    width: "1400px",
    height: "720px",
  };

  const { data, isLoading, error, status } = useQuery("fetcfromhapi", () => fetcWeather(selectedPosition), {
    staleTime: 1000,
    cacheTime: 300,
  });

  const clickHandler = (e: google.maps.MapMouseEvent) => {
    setSelectedPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    console.log(selectedPosition);
  };

  const center = {
    lat: 47.49,
    lng: 19.04,
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
        <div>...</div>
      </>
    );
  }
  if (isLoading) {
    return (
      <>
        <div>loading...</div>
      </>
    );
  }

  console.log(data);

  return (
    <Wrapper>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={unMount}
        onClick={clickHandler}
        options={{ zoomControl: true }}
      >
        {selectedPosition.lat ? <Marker position={selectedPosition} /> : null}
        {selectedPosition.lat && (
          <InfoWindow position={selectedPosition}>
            <div>
              <h3>{data?.location?.city}</h3>
              {isLoading ? (
                <p>Loading Weather ...</p>
              ) : (
                <>
                  <p>{data?.current_observation?.condition?.temperature}</p>
                  <p>{data?.current_observation?.condition?.text} </p>
                </>
              )}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </Wrapper>
  );
};

export default App;
