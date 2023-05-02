// import axios from "axios";

// export const getOptionData = async () => {
//   const API_ENDPOINT = process.env["OPTION_DATA_API_ENDPOINT"];
//   const ESTDate = new Date(
//     Date.UTC(
//       new Date().getUTCFullYear(),
//       new Date().getUTCMonth(),
//       new Date().getUTCDate(),
//       new Date().getUTCHours() - 4,
//       new Date().getUTCMinutes(),
//       new Date().getUTCSeconds(),
//       new Date().getUTCMilliseconds()
//     )
//   );
//   const dayOfWeek = ESTDate.getDay(); // Sunday = 0, Monday = 1, etc.
//   const isWeekday = dayOfWeek >= 1 && dayOfWeek <= 5;
//   const isAfter10amET = ESTDate.getHours() >= 10; // 10am in EST

//   let delayInMs = 0;

//   if (isWeekday) {
//     if (!isAfter10amET) {
//       // Wait until 10am EST
//       delayInMs =
//         (new Date(
//           ESTDate.getFullYear(),
//           ESTDate.getMonth(),
//           ESTDate.getDate(),
//           10,
//           0,
//           0,
//           0
//         ) -
//           ESTDate) /
//         1000;
//       console.log(`Delaying API call by ${delayInMs} seconds...`);
//       await new Promise((resolve) => setTimeout(resolve, delayInMs * 1000));
//     } else {
//       // Schedule for next weekday at 10am EST
//       const nextDay = new Date(ESTDate);
//       nextDay.setUTCDate(ESTDate.getDate() + (dayOfWeek === 5 ? 3 : 1)); // If today is Friday, schedule for Monday
//       nextDay.setHours(10, 0, 0, 0); // Schedule for 10am EST
//       delayInMs = nextDay - ESTDate;
//       console.log(`Next API call scheduled for ${nextDay}.`);
//       setTimeout(getOptionData, delayInMs);
//       return;
//     }
//   } else {
//     // Schedule for next weekday at 10am EST
//     const nextDay = new Date(ESTDate);
//     nextDay.setDate(ESTDate.getDate() + (dayOfWeek === 6 ? 2 : 1)); // If today is Saturday, schedule for Monday
//     nextDay.setHours(10, 0, 0, 0); // Schedule for 10am EST
//     delayInMs = nextDay - ESTDate;
//     console.log(`Next API call scheduled for ${nextDay}.`);
//     setTimeout(getOptionData, delayInMs);
//     return;
//   }

//   try {
//     const res = await axios.get(API_ENDPOINT);
//     console.log("API call succeeded:", res.data);
//   } catch (error) {
//     console.error("API call failed:", error);
//     // Try again in 1 minute if there is an error
//     setTimeout(getOptionData, 60 * 1000);
//     return;
//   }

//   // Schedule for next weekday at 10am EST
//   const nextDay = new Date(ESTDate);
//   nextDay.setDate(ESTDate.getDate() + (dayOfWeek === 5 ? 3 : 1)); // If today is Friday, schedule for Monday
//   nextDay.setHours(10, 0, 0, 0); // Schedule for 10am EST
//   delayInMs = nextDay - ESTDate;
//   console.log(`Next API call scheduled for ${nextDay}.`);
//   setTimeout(getOptionData, delayInMs);
// };
