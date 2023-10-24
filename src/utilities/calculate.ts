export const getDateString = (datetime: number) => {
  const date = new Date(datetime)
    .toLocaleDateString("ko-kr")
    .replaceAll(".", "")
    .split(" ");
  return `${date[0]}-${date[1].padStart(2, "0")}-${date[2].padStart(2, "0")}`;
};

export const handlePeriod = () => {
  const now = new Date().getTime();
  const day = 1000 * 60 * 60 * 24;
  const start = now - day * 90;
  const end = now - day;
  const startDate = getDateString(start);
  const endDate = getDateString(end);
  return `&startDt=${startDate}&endDt=${endDate}`;
};
