import React, { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useHttp } from "hooks";
import { AppContext } from "duck";
import { Button, ForwardIcon, Input } from "components";
import styles from "./CreatePeriod.module.css";

const CreatePeriod: React.FC = () => {
  const history = useHistory();
  const { token } = useContext(AppContext);
  const { loading, request } = useHttp();
  const [form, setForm] = useState({
    title: "",
    from: 0,
    to: 0,
    description: ""
  });
  const { id } = useParams();

  const backHandler = () => history.goBack();

  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const createHandler = async () => {
    try {
      await request(
        "/api/period",
        "POST",
        { ...form, timeline: id },
        { Authorization: `Bearer ${token}` }
      );
      history.goBack();
    } catch (e) {}
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <Button
          variant="secondary"
          onClick={backHandler}
          className={styles.backButton}
        >
          <ForwardIcon className={styles.backIcon} />
        </Button>
        <h1>Add New Period</h1>
      </div>
      <div className={styles.form}>
        <Input id="title" label="Title" name="title" onChange={changeHandler} />
        <div className={styles.row}>
          <div>
            <Input
              id="from"
              label="From"
              name="from"
              onChange={changeHandler}
              defaultValue={form.from}
            />
          </div>
          <div>
            <Input
              id="to"
              label="To"
              name="to"
              onChange={changeHandler}
              defaultValue={form.to}
            />
          </div>
        </div>
        <Input
          id="description"
          label="Description"
          name="description"
          onChange={changeHandler}
        />
        <Button loading={loading} onClick={createHandler}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default CreatePeriod;
