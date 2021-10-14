import { WeatherType, Coordinate } from "./App";
export const fetcWeather = async (coordinate: Coordinate): Promise<any> => {
  const respone: any = await fetch(
    `https://yahoo-weather5.p.rapidapi.com/weather?lat=${coordinate.lat}&long=${coordinate.lng}&format=json&u=c`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "yahoo-weather5.p.rapidapi.com",
        "x-rapidapi-key": `${process.env.REACT_APP_WEATHER_APP!}`,
      },
    }
  );

  const data = await respone.json();
  return data;
  //   return {
  //     temp: data.value.current_observation.condition.temperature,
  //     text: data.value.current_observation.condition.text,
  //   };
};
