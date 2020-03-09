import React, { useCallback, useContext, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { useHttp } from "hooks";
import { appTypes, AppContext } from "duck";
import { timelineSelectors } from "./duck";
import styles from "./GridLine.module.css";

const GridLine: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [periods, setPeriods] = useState([]);
  const { state } = useContext(AppContext);
  const years = timelineSelectors.getYears(periods, state.scale);
  const periodWithPosition = timelineSelectors.getPeriodsWithPosition(periods);
  const { request } = useHttp();

  const getTimeline = useCallback(
    async id => {
      try {
        const result = await request(`/api/timeline/${id}/periods`, "GET");

        setPeriods(result);
      } catch (e) {}
    },
    [request]
  );

  useEffect(() => {
    if (state.selectedTimeline) getTimeline(state.selectedTimeline).catch();
  }, [state.selectedTimeline, getTimeline]);

  return (
    <div className={styles.wrapper}>
      <PerfectScrollbar>
        <div className={styles.data}>
          <div className={styles.years}>
            {years.map(year => (
              <div className={styles.year} key={year}>
                {year}
              </div>
            ))}
          </div>
          <div className={styles.periods}>
            {periodWithPosition.map((period: appTypes.PeriodWithPosition) => (
              <div
                key={period._id}
                className={styles.period}
                style={{
                  top: period.top * (10 / state.scale),
                  left: period.left + state.scale,
                  height: period.duration * (10 / state.scale)
                }}
              >
                {period.title}
                <div className={styles.info}>
                  {`${period.from} - ${
                    period.to === currentYear ? "present days" : period.to
                  } (avg. age: ${period.to - period.from})`}
                  <div>{period.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default GridLine;
