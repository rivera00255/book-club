"use client";
import { useRouter } from "next/navigation";
import styles from "./signin.module.scss";
import { useRef, useState } from "react";
import { mutateFetch } from "@/utilities/fetcher";
import { signIn } from "next-auth/react";

const Signin = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [isSignin, setIsSignin] = useState(true);
  const [errorMessage, setErrorMessage] = useState({
    email: "",
    pw: "",
  });

  const validateEmail = (value: string) => {
    if (value !== "") {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (emailRegex.test(value)) return true;
    }
    setErrorMessage((prev) => ({
      ...prev,
      email: "올바른 형식의 이메일을 입력해주세요.",
    }));
    return false;
  };

  const validatePassword = (value: string) => {
    if (value !== "") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[0-9]).{6,20}$/;
      if (passwordRegex.test(value)) return true;
    }
    setErrorMessage((prev) => ({
      ...prev,
      pw: "영어 소문자, 숫자 포함 6자리 이상 20자리 이하로 입력해주세요.",
    }));
    return false;
  };

  const onSignup = async (email: string, password: string) => {
    const response = await mutateFetch("POST", "/api/signup", {
      email,
      password,
    });
    if (response) {
      const { user, message } = response;
      if (message) {
        alert(message);
        return;
      }
      if (user) {
        alert("가입이 완료되었습니다. 로그인 후 이용해주세요.");
        setIsSignin(true);
      }
    }
  };

  const onSignin = async (email: string, password: string) => {
    const response = await signIn("credentials", {
      email,
      password,
      callbackUrl: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}`,
      // redirect: false,
    });
    if (response) {
      const { error } = response;
      if (error) alert(error);
    }
  };

  const onSubmit = (email: string, password: string) => {
    if (validateEmail(email) && validatePassword(password)) {
      setErrorMessage({ email: "", pw: "" });
      isSignin ? onSignin(email, password) : onSignup(email, password);
    }
  };

  return (
    <main className={styles.container}>
      <h2>{isSignin ? "로그인" : "회원가입"}</h2>
      <div className={styles.form}>
        <label>
          <p>이메일</p>
          <input
            type="text"
            ref={emailRef}
            placeholder="이메일을 입력하세요."
          />
        </label>
        {errorMessage.email !== "" && <p>{errorMessage.email}</p>}
        <label>
          <p>비밀번호</p>
          <input
            type="password"
            ref={passwordRef}
            placeholder="영어 소문자, 숫자 포함 6자리 이상 20자리 이하."
          />
        </label>
        {errorMessage.pw !== "" && <p>{errorMessage.pw}</p>}
        <button
          onClick={() => {
            const email = emailRef.current?.value ?? "";
            const password = passwordRef.current?.value ?? "";
            onSubmit(email, password);
          }}
        >
          {isSignin ? "로그인" : "가 입"}
        </button>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={() => router.back()}>← 뒤로 가기</button>
        <button onClick={() => setIsSignin(!isSignin)}>
          {!isSignin ? "로그인" : "회원가입"}
        </button>
      </div>
    </main>
  );
};

export default Signin;
