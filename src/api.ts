import { WeatherType, Coordinate } from "./App";
export const fetcWeather = async (coordinate: Coordinate): Promise<any> => {
  const respone: any = await fetch(
    `https://yahoo-weather5.p.rapidapi.com/weather?lat=${coordinate.location.lat}&lang=${coordinate.location.lng}&format=json&u=f`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_WEATHER_APP!,
      },
    }
  );

  const data = await respone.json();
  console.log(data);

  return data;
};
