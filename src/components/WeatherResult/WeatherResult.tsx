import React from "react";
import "./styles.css";

import { FaTemperatureFull, FaArrowLeft } from "react-icons/fa6";
import { IoLocationOutline } from "react-icons/io5";
import { IoWater } from "react-icons/io5";
import { WeatherResultProps } from "../../typings/dto";

const WeatherResult: React.FC<WeatherResultProps> = ({
  weatherData,
  returnToStep1,
}) => {
  return (
    <div className="container">
      <div className="header">
        <FaArrowLeft
          color="#88bae4"
          onClick={returnToStep1}
          className="weatherResult-header-icon"
        />
        <div className="header-title">Weather App</div>
      </div>
      {weatherData ? (
        <div className="weatherResult-info">
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
            alt="cloud-icon"
          />
          <h2>{Math.round(weatherData.main.temp)}°c</h2>
          <p>{weatherData.weather[0].main}</p>
          <div>
            <IoLocationOutline size={12} />
            <span>
              {weatherData.name}, {weatherData.sys.country}
            </span>
          </div>
        </div>
      ) : (
        <p>No weather data available</p>
      )}
      <div className="weatherResult-info-footer">
        <div className="weatherResult-info-footer-item">
          <FaTemperatureFull
            size={20}
            color="#41adfd"
            className="weatherInfo-icon"
          />
          <div className="weatherResult-temp-info">
            <p className="weatherResult-temp-info-text">
              {Math.round(weatherData.main.feels_like)}°c
            </p>
            <span className="weatherResult-temp-info-status">Feels like</span>
          </div>
        </div>
        <div className="weatherResult-info-footer-item">
          <IoWater size={20} color="#41adfd" className="weatherInfo-icon" />
          <div className="weatherResult-temp-info">
            <p className="weatherResult-temp-info-text">
              {Math.round(weatherData.main.humidity)}%
            </p>
            <span className="weatherResult-temp-info-status">Humidity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherResult;
