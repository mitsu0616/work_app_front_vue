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
