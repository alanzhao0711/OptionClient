// import axios from "axios";

// export const getOptionPrice = async () => {
//   const API_ENDPOINT = process.env.REACT_APP_OPTION_PRICE_API;
//   console.log(process.env);
//   const date = new Date();
//   const options = { timeZone: "America/New_York" };
//   const estDateString = date.toLocaleString("en-US", options);
//   const estDate = new Date(estDateString);

//   const isWeekday = estDate.getDay() >= 1 && estDate.getDay() <= 5;
//   const isBetween9_30_4 = estDate.getHours() >= 9 && estDate.getHours() < 16;
//   const shouldFetchData = isWeekday && isBetween9_30_4;
//   console.log(isWeekday);
//   console.log(isBetween9_30_4);
//   if (shouldFetchData) {
//     try {
//       console.log("Getting option price, please wait!");
//       const res = await axios.get(API_ENDPOINT);
//       console.log("API call succeeded:", res.data);
//     } catch (error) {
//       console.error("API call failed:", error);
//     }
//   }
// };
