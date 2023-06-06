"use client";
import { account } from "@/lib/appwriteConfig";
import Image from "next/image";
import Label from "./label";
import { useState, useEffect } from "react";

export default function Signin() {
  const [route, setRoute] = useState("SignIn");
  const [left, setLeft] = useState("8.5px");
  const [errorMessage, setErrorMessage] = useState("");
  const [border, setBorder] = useState("1px solid rgba(0,0,0,0.1)");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const handleLogin = (e: any) => {
    e.preventDefault();
    const promise = account.createEmailSession(emailValue, passwordValue);

    promise.then(
      () => window.location.reload(),
      (err) => {
        setErrorMessage(err.message);
        setBorder("1px solid red");
      }
    );
  };

  const handleSignUp = (e: any) => {
    e.preventDefault();
    const promise = account.create(
      crypto.randomUUID(),
      emailValue,
      passwordValue,
      nameValue
    );

    promise.then(
      () => {
        setRoute("SignIn");
      },
      (err) => {
        setErrorMessage(err.message);
        setBorder("1px solid red");
      }
    );
  };

  useEffect(() => {
    setBorder("1px solid rgba(0,0,0,0.1)");
    setErrorMessage("");
  }, [emailValue, passwordValue]);

  useEffect(() => {
    setTimeout(() => {
      route === "SignIn" ? setLeft("8.5px") : setLeft("53%");
    }, 50);
    setErrorMessage("");
    setEmailValue("");
    setPasswordValue("");
    setNameValue("");
    setBorder("1px solid rgba(0,0,0,0.1");
  }, [route]);

  const UserEmail = (
    <div className="flex flex-col  w-full">
      <Label element="email" title="Your Email" />
      <input
        value={emailValue}
        onChange={(e) => setEmailValue(e.target.value)}
        type="email"
        name="email"
        style={{ border: border }}
        className="w-full px-2 py-1.5 rounded text-[13px] font-medium text-black/80 outline-none "
        placeholder="example@gmail.com"
        required
      />
    </div>
  );

  const UserName = (
    <div className="flex flex-col  w-full">
      <Label element="name" title="Your Full name" />
      <input
        value={nameValue}
        onChange={(e) => setNameValue(e.target.value)}
        name="name"
        type="text"
        style={{ border: border }}
        className="w-full px-2 py-1.5 rounded text-[13px] font-medium text-black/80 outline-none "
        placeholder="Promise Onuoha"
        required
      />
    </div>
  );

  const UserPassword = (
    <div className="flex flex-col  w-full">
      <Label element="password" title="Your Password" />
      <input
        name="password"
        value={passwordValue}
        onChange={(e) => setPasswordValue(e.target.value)}
        type="password"
        style={{ border: border }}
        className="w-full px-2 py-1.5 rounded text-[13px] font-medium text-black/80 outline-none "
        placeholder="******"
        required
      />
    </div>
  );

  return (
    <div className="w-screen h-screen absolute bg-black/50 top-0 left-0 flex justify-center items-center">
      <div className="w-[330px] h-auto min-h-[360px]  bg-white rounded border border-solid items-center border-[rgba(0,0,0,0.1)] py-4 px-5 flex flex-col">
        <p className="text-[13px] text-black/80 font-medium pb-3">
          👋 Welcome, SignIn to use MineCloud
        </p>
        <div className="w-full flex pb-2 relative justify-between">
          <div
            style={{
              left: left,
            }}
            className="w-5/12 bg-black/50 h-[1px] rounded absolute bottom-1 duration-150  "
          ></div>
          <p
            onClick={() => setRoute("SignIn")}
            className="text-[13px] text-black/80   w-6/12 text-center font-medium cursor-pointer"
          >
            SignIn
          </p>
          <p
            onClick={() => setRoute("SignUp")}
            className="text-[13px] text-black/80  w-6/12   text-center font-medium cursor-pointer"
          >
            SignUp
          </p>
        </div>
        {route === "SignIn" && (
          <form
            method="post"
            action={""}
            className="py-2 w-full flex flex-col gap-2"
          >
            {UserEmail}
            {UserPassword}

            {errorMessage !== "" && (
              <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
            )}
            <button
              onClick={handleLogin}
              type="submit"
              className="text-sm flex justify-center items-center w-full py-1.5 rounded border-none bg-[rgba(0,0,0,0.6)] text-white"
            >
              SignIn
            </button>
          </form>
        )}
        {route === "SignUp" && (
          <form
            method="post"
            action={""}
            className="py-2 w-full flex flex-col gap-2"
          >
            {UserName}
            {UserEmail}
            {UserPassword}

            {errorMessage !== "" && (
              <p className="text-xs text-red-600 font-medium">{errorMessage}</p>
            )}
            <button
              onClick={handleSignUp}
              type="submit"
              className="text-sm flex justify-center items-center w-full py-1.5 rounded border-none bg-black/60 text-white"
            >
              SignUp
            </button>
          </form>
        )}
        <div className="pt-1 w-full border-t border-solid border-[rgba(0,0,0,0.1)] flex flex-col gap-1 ">
          <p className="text-[13px] text-black/50 font-medium text-center">
            OR
          </p>
          <button
            onClick={() => {
              account.createOAuth2Session(
                "google",
                "https://minecloud.vercel.app/",
                "https://minecloud.vercel.app/"
              );
            }}
            className="flex justify-center items-center text-[13px] text-white bg-black/60 gap-1  px-4 py-2 rounded"
          >
            SignIn with google
            <Image
              src={"/images/google.png"}
              alt="Google Icon"
              width={18}
              height={18}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
