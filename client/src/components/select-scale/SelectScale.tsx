import React, { useState, useContext, useEffect } from "react";
import { AppContext, appActions } from "duck";
import { Button, ZoomIn } from "../index";
import styles from "./SelectScale.module.css";

const SelectScale: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const [scale, setScale] = useState<1 | 2 | 5>(state.scale);

  const scaleChangeHandler = () => {
    if (scale === 1) setScale(5);
    if (scale === 2) setScale(1);
    if (scale === 5) setScale(2);
  };

  useEffect(() => {
    dispatch(appActions.setScale({ scale }));
  }, [scale, dispatch]);

  return (
    <Button
      variant="secondary"
      onClick={scaleChangeHandler}
      className={styles.wrapper}
    >
      <ZoomIn /> x{5 / scale}
    </Button>
  );
};

export default SelectScale;
