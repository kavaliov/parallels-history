import React, { useCallback, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { AppContext } from "duck";
import { Button, ForwardIcon, Input } from "components";
import { useHttp } from "hooks";
import styles from "./Period.module.css";

interface PeriodProps {}

const Period: React.FC<PeriodProps> = () => {
  const history = useHistory();
  const { id } = useParams();
  const [period, setPeriod] = useState({
    title: "",
    from: "",
    to: "",
    description: ""
  });
  const { token } = useContext(AppContext);
  const { request, loading } = useHttp();

  const backHandler = () => history.goBack();

  const getPeriod = useCallback(async () => {
    try {
      const result = await request(`/api/period/${id}`, "GET", null, {
        Authorization: `Bearer ${token}`
      });
      setPeriod(result);
    } catch (e) {}
  }, [id, request, token]);

  useEffect(() => {
    getPeriod().catch();
  }, [getPeriod]);

  const changeHandler = (event: any) => {
    setPeriod({ ...period, [event.target.name]: event.target.value });
  };

  const updateHandler = async () => {
    try {
      await request(
        "/api/period",
        "PUT",
        { ...period, _id: id },
        { Authorization: `Bearer ${token}` }
      );
      history.goBack();
    } catch (e) {}
  };

  if (loading) return <div className={styles.wrapper}>Loading ...</div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button
          variant="secondary"
          className={styles.backButton}
          onClick={backHandler}
        >
          <ForwardIcon className={styles.backIcon} />
        </Button>
        <h1>Edit period "{period.title}"</h1>
      </div>
      <div className={styles.form}>
        <Input
          id="title"
          label="Title"
          name="title"
          value={period.title}
          onChange={changeHandler}
        />
        <div className={styles.row}>
          <div>
            <Input
              id="from"
              label="From"
              name="from"
              value={period.from}
              onChange={changeHandler}
            />
          </div>
          <div>
            <Input
              id="to"
              label="To"
              name="to"
              value={period.to}
              onChange={changeHandler}
            />
          </div>
        </div>
        <Input
          id="description"
          label="Description"
          name="description"
          value={period.description}
          onChange={changeHandler}
        />
        <Button loading={loading} onClick={updateHandler}>
          Update
        </Button>
      </div>
    </div>
  );
};

export default Period;
