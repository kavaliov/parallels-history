import React, { useContext, useState } from "react";
import { AppContext } from "duck";
import { useHttp } from "hooks";
import { Input, Button } from "components";
import styles from "./CreateTimeline.module.css";

interface CreateTimelineProps {
  setTimelines: any;
  timelines: any[];
}

const CreateTimeline: React.FC<CreateTimelineProps> = ({
  setTimelines,
  timelines
}) => {
  const { token } = useContext(AppContext);
  const [form, setForm] = useState({ title: "" });
  const { loading, request } = useHttp();

  const changeHandler = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const createHandler = async () => {
    try {
      if (form.title) {
        const timeline = await request(
          "/api/timeline",
          "POST",
          { ...form },
          { Authorization: `Bearer ${token}` }
        );

        setForm({ title: "" });
        setTimelines([...timelines, timeline]);
      }
    } catch (e) {}
  };

  return (
    <div className={styles.wrapper}>
      <Input
        placeholder="Timeline Title"
        name="title"
        value={form.title}
        onChange={changeHandler}
      />
      <Button loading={loading} onClick={createHandler}>
        Add New Timeline
      </Button>
    </div>
  );
};

export default CreateTimeline;
