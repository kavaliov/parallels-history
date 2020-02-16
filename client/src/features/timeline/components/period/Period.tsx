import React from "react";
import { Link } from "react-router-dom";
import { appTypes } from "duck";
import { Button } from "components";
import styles from "./Period.module.css";

interface PeriodProps {
  period: appTypes.Period;
}

const Period: React.FC<PeriodProps> = ({ period }) => (
  <div className={styles.wrapper}>
    {period.title}
    <div className={styles.deleteContainer}>
      <Link to={`/timeline/${period._id}`}>
        <Button >VIEW</Button>
      </Link>
      <Button variant="secondary">
        DELETE
      </Button>
    </div>
  </div>
);

export default Period;
