import axios from "axios";

export const getOptionPrice = async () => {
  const API_ENDPOINT = "/getCurrentMarketPrice";
  const date = new Date();
  const options = { timeZone: "America/New_York" };
  const estDateString = date.toLocaleString("en-US", options);
  const estDate = new Date(estDateString);

  const isWeekday = estDate.getDay() >= 1 && estDate.getDay() <= 5;
  const isBetween9_30_4 = estDate.getHours() >= 9 && estDate.getHours() < 16;
  const isQuarterHour = estDate.getMinutes() % 5 === 0;
  const shouldFetchData = isWeekday && isBetween9_30_4 && isQuarterHour;
  if (shouldFetchData) {
    try {
      const res = await axios.get(API_ENDPOINT);
      console.log("API call succeeded:", res.data);
    } catch (error) {
      console.error("API call failed:", error);
    }
  }
};
