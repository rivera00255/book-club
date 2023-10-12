import React, { Dispatch, RefObject, SetStateAction, useEffect } from "react";
import styles from "./dim.module.scss";

const Dimmed = ({
  children,
  modalRef,
  setIsOpenModal,
}: {
  children: React.ReactNode;
  modalRef: RefObject<HTMLDivElement>;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const clickOutsideModal = (e: { target: any }) => {
    if (modalRef.current === e.target) setIsOpenModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div
      className={styles.container}
      ref={modalRef}
      onClick={(e) => clickOutsideModal(e)}
    >
      {children}
    </div>
  );
};

export default Dimmed;
