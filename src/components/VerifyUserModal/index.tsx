import { Dispatch, SetStateAction, useRef } from "react";
import Dimmed from "../Dimmed";
import styles from "./verify.module.scss";
import { mutateFetch } from "@/utilities/fetcher";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const VerifyUserModal = ({
  email,
  setIsOpenModal,
}: {
  email: string | undefined | null;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const callbackUrl =
    process.env.NODE_ENV === "production"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_NEXTAUTH_URL;

  const deleteUser = async (password: string) => {
    if (email) {
      const response = await mutateFetch("DELETE", "/api/auth/remove", {
        email,
        password,
      });
      setIsOpenModal(false);
      signOut({
        callbackUrl: callbackUrl,
      });
    }
  };

  return (
    <Dimmed modalRef={modalRef} setIsOpenModal={setIsOpenModal}>
      <div className={styles.modal}>
        <div>
          <h4>비밀번호 확인</h4>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            ref={passwordRef}
          />
          <button
            onClick={() => {
              if (confirm("정말 탈퇴하시겠습니까?")) {
                const password = passwordRef.current?.value ?? "";
                deleteUser(password);
              }
            }}
          >
            탈퇴
          </button>
        </div>
      </div>
    </Dimmed>
  );
};

export default VerifyUserModal;
