import { toast } from "react-toastify";

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

export const showToast = (type: "SUCCESS" | "ERROR", msg: string) => {
  switch (type) {
    case "SUCCESS":
      toast.success(msg, { pauseOnHover: false });

      break;
    case "ERROR":
      toast.error(msg, { pauseOnHover: false });
      break;

    default:
      return false;
  }
};

export const boldTypedLetter = (input: string, result: string) => {
  const resultArr = result.split("");
  const boldedChars: string[] = [];
  let index = result.toLowerCase().indexOf(input.toLocaleLowerCase());
  let counter = 0;

  return (
    <span>
      {resultArr.map((char, i) => {
        if (i === index && counter < input.length) {
          index += 1;
          counter++;
          boldedChars.push(char);
          if (counter === input.length) {
            return (
              <span style={{ fontWeight: "lighter" }}>
                {boldedChars.join("")}
              </span>
            );
          }
        } else return char;
      })}
    </span>
  );
};
