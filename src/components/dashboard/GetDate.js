const getDate = () => {
  const currentDate = new Date();
  const options = { month: "long", day: "numeric", year: "numeric" };
  const monthDay = currentDate.toLocaleDateString("en-US", options);
  const formattedDate = `${monthDay.slice(0, 1).toUpperCase()}${monthDay.slice(
    1
  )}`;
  return formattedDate;
};

export default getDate;
