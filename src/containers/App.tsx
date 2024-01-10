import React, { useEffect, useState } from "react";
import "./App.css";
import InputForm from "../components/InputForm/InputForm";
import WeatherResult from "../components/WeatherResult/WeatherResult";
import { getCityFromCoords, getWeatherData } from "../services/api";

const App: React.FC = () => {
  const [step, setStep] = useState(1);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherDataError, setWeatherDataError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleCitySubmit = async (submittedCity: string) => {
    setCity(submittedCity);
    const result = await getWeatherData(city);
    if (result.status) {
      setWeatherData(result.data);
      setStep(2);
      setCity("");
    } else {
      setWeatherDataError("The City you are looking for, does not exist.");
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        getCityName(latitude, longitude);
      });
    } else {
      setWeatherDataError("Geolocation is not supported by this browser.");
    }
  };

  const getCityName = async (latitude: number, longitude: number) => {
    const result = await getCityFromCoords(latitude, longitude);
    if (result.status) {
      setWeatherData(result.data);
      setStep(2);
    } else {
      setWeatherDataError("The City you are looking for, does not exist.");
    }
    setLoading(false);
  };

  const returnToStep1 = () => {
    setStep(1);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (weatherDataError !== "") {
      timer = setTimeout(() => {
        setWeatherDataError("");
      }, 2000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [weatherDataError]);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <InputForm
            onSubmit={handleCitySubmit}
            city={city}
            setCity={setCity}
            apiError={weatherDataError}
            getDeviceLocation={getLocation}
            loading={loading}
          />
        );
      case 2:
        return (
          <WeatherResult
            weatherData={weatherData}
            returnToStep1={returnToStep1}
          />
        );
      default:
        return null;
    }
  };

  return <div className="app-container">{renderStepContent()}</div>;
};

export default App;
