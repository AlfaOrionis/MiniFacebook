export const getCurrentDate = () => {
  const date = new Date();
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate().toString();

  return {
    month: month,
    day: day,
    year: date.getFullYear().toString(),
  };
};

export const getMonthList = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return months;
};

export const getYearsList = () => {
  const thisYear = new Date().getFullYear();
  const minimumYear = thisYear - 120;
  const yearsList = [];

  for (let i = 1; i <= 120; i++) {
    yearsList.push(minimumYear + i);
  }

  return yearsList;
};

export const getDaysList = () => {
  return Array.from({ length: 31 }, (_, i) => i + 1);
};
