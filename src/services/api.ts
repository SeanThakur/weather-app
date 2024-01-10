const api = {
  key: "2ba36577529779ff81af09129d2526c2",
  base: "https://api.openweathermap.org/data/2.5/",
};

export const getWeatherData = async (
  query: string
): Promise<{ status: boolean; data?: any }> => {
  try {
    const response = await fetch(
      `${api.base}weather?q=${query}&appid=${api.key}&units=metric`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const result = await response.json();
    return { status: true, data: result };
  } catch (error) {
    return { status: false };
  }
};

export const getCityFromCoords = async (
  latitude: number,
  longitude: number
): Promise<{ status: boolean; data?: any }> => {
  try {
    const response = await fetch(
      `${api.base}weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch city name.");
    }
    const result = await response.json();
    return { status: true, data: result };
  } catch (error) {
    return { status: false };
  }
};
