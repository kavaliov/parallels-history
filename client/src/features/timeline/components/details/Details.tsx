import React from "react";
import { useHistory } from "react-router-dom";
import { appTypes } from "duck";
import { Button, ForwardIcon } from "components";
import styles from "./Details.module.css";

interface DetailsProps {
  timeline: appTypes.Timeline;
}

const Details: React.FC<DetailsProps> = ({ timeline }) => {
  const history = useHistory();

  const backHandler = () => {
    history.goBack();
  };

  const newPeriodHandler = () => history.push(`/period/create/${timeline._id}`);

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={backHandler}
        variant="secondary"
        className={styles.backButton}
      >
        <ForwardIcon className={styles.backIcon} />
      </Button>
      <h1 className={styles.title}>{timeline.title}</h1>
      <Button onClick={newPeriodHandler} className={styles.addNewPeriod}>
        Add New Period
      </Button>
    </div>
  );
};

export default Details;
