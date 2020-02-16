import { appTypes } from "duck";

export const getYears = (periods: appTypes.Period[], scale: number) => {
  let currentYear = new Date().getFullYear();
  let startYear = currentYear;
  let resultArray = [];

  periods.map(period =>
    startYear > period.from ? (startYear = period.from) : ""
  );

  for (let i = Math.floor(startYear / 10) * 10; i <= currentYear; i = i + scale) {
    resultArray.push(i);
  }

  return resultArray;
};

export const getPeriodsWithPosition = (
  periods: appTypes.Period[]
): appTypes.PeriodWithPosition[] => {
  let currentYear = new Date().getFullYear();
  let periodWithPosition: appTypes.PeriodWithPosition[] = [];
  let busyPlaces: any[] = [];

  periods.forEach((period: appTypes.Period) => {
    let leftIndex = 0;

    if(period.to === 0)
      period.to = currentYear;

    if (busyPlaces.length === 0) {
      busyPlaces.push([{ from: period.from, to: period.to }]);
    } else {
      busyPlaces.some((places: any[], index) => {
        let intersection = false;

        places.some((place: { from: number; to: number }) => {
          if (period.from <= place.to && period.to >= place.from) {
            intersection = true;
            return true;
          }
          return false;
        });

        if (!intersection) {
          busyPlaces[index].push({
            from: period.from,
            to: period.to
          });

          leftIndex = index;
          return true;
        }

        if (busyPlaces.length === index + 1 && intersection) {
          busyPlaces.push([{ from: period.from, to: period.to }]);
          leftIndex = index + 1;
        }

        return false;
      });
    }

    periodWithPosition.push({
      ...period,
      top: (currentYear - period.to) * 2,
      left: leftIndex * 30,
      duration: (period.to - period.from) * 2
    });
  });

  return periodWithPosition;
};