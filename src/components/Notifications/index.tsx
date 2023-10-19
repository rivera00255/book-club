"use client";
import { RootState } from "@/store";
import { remove } from "@/store/slices/notifySlice";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./notify.module.scss";

const Notifications = () => {
  const timer = useRef<NodeJS.Timeout>(null);
  const notification = useSelector((state: RootState) => state.notify);
  const dispatch = useDispatch();

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);

    const setTimer = setTimeout(() => {
      dispatch(remove());
    }, 2000);
  }, [dispatch]);

  return (
    <div className={styles.notify}>
      <p>{notification.message}</p>
      <button onClick={() => dispatch(remove())}>✕</button>
    </div>
  );
};

export default Notifications;
