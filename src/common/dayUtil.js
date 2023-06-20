export const getToday = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = ("0" + (now.getMonth() + 1)).slice(-2);
  const day = ("0" + now.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};

export const getDateAndTime = (data) => {
  const targetDay = new Date(data);
  const year = targetDay.getFullYear();
  const month = ("0" + (targetDay.getMonth() + 1)).slice(-2);
  const day = ("0" + targetDay.getDate()).slice(-2);

  const hours = ("0" + targetDay.getHours()).slice(-2);
  const minutes = ("0" + targetDay.getMinutes()).slice(-2);
  const seconds = ("0" + targetDay.getSeconds()).slice(-2);

  return {
    date: `${year}-${month}-${day}`,
    time: `${hours}:${minutes}:${seconds}`,
  };
};

export const getDateList = (targetYear, targetMonth, targetWorkData) => {
  const start = new Date(targetYear, targetMonth - 1, 1);
  let day = start.getDay();
  const last = new Date(targetYear, targetMonth, 0);
  const lastDate = last.getDate();

  const dateList = [];
  for (let i = 1; i <= lastDate; i++) {
    dateList.push({
      date: i,
      day: formatDay[day],
    });

    day = day < 6 ? (day += 1) : 0;
  }

  targetWorkData.forEach((e) => {
    const d = Number(e.date.split("-")[2]);
    if (e.start_time) {
      console.log(d, e.start_time);
      dateList[d - 1].start_time = getDateAndTime(e.start_time).time;
    }
    if (e.end_time) {
      console.log(d, e.end_time);
      dateList[d - 1].end_time = getDateAndTime(e.end_time).time;
    }
  });

  return dateList;
};

const formatDay = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
