import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useHttp } from "hooks";
import { AppContext, appTypes } from "duck";
import { Button } from "components";
import styles from "./Period.module.css";

interface PeriodProps {
  period: appTypes.Period;
  periods: any[];
  setPeriods: any;
}

const Period: React.FC<PeriodProps> = ({ period, periods, setPeriods }) => {
  const { token } = useContext(AppContext);
  const { request, loading } = useHttp();

  const deleteHandler = async () => {
    const id = period._id;

    try {
      await request(
        "/api/period",
        "DELETE",
        { id },
        { Authorization: `Bearer ${token}` }
      );

      setPeriods(periods.filter(period => period._id !== id));
    } catch (e) {}
  };

  return (
    <div className={styles.wrapper}>
      {period.title}
      <div className={styles.deleteContainer}>
        <Link to={`/period/${period._id}`}>
          <Button size="small">EDIT</Button>
        </Link>
        <Button
          size="small"
          loading={loading}
          variant="secondary"
          onClick={deleteHandler}
          className={styles.deleteButton}
        >
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default Period;
