import React, { useEffect, useState } from "react";
import "./styles.css";
import { InputFormProps } from "../../typings/dto";

const InputForm: React.FC<InputFormProps> = ({
  onSubmit,
  getDeviceLocation,
  city,
  setCity,
  apiError,
  loading,
}) => {
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (city.trim() === "") {
      setError("Please enter a city name");
    } else {
      onSubmit(city);
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (error !== "") {
      timer = setTimeout(() => {
        setError("");
      }, 2000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error]);

  return (
    <div className="container">
      <div className="header">
        <div className="header-title">Weather App</div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          autoFocus
        />
        <div className="inputForm-or-divider">or</div>
        <button
          onClick={getDeviceLocation}
          type="button"
          className="inputForm-button"
        >
          {loading ? "Loading..." : "Get Device Location"}
        </button>
      </form>
      {error && <p className="inputForm-error">{error}</p>}
      {apiError && <p className="inputForm-error">{apiError}</p>}
    </div>
  );
};

export default InputForm;
