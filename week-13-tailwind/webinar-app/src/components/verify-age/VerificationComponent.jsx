import Input from "../input/Input";
import ContinueButton from "../continue/ContinueButton";

import { useState } from "react";
import OTPComponent from "../input/OTPComponent";

export default function VerificationComponent({
  header,
  description,
  placeholderText,
  type,
  nextRoute,
  buttonText,
  otpField,
}) {
  return (
    <>
      <h1 className="text-white text-3xl font-medium mb-11">{header}</h1>

      <div className="flex flex-col items-center gap-y-6 w-[34%]">
        {description ? (
          <p className="text-para w-screen text-center">{description}</p>
        ) : (
          ""
        )}
        <div className="flex flex-col items-center w-[65%] gap-y-8">
          {otpField ? (
            <OTPComponent />
          ) : (
            <Input type={type} placeholderText={placeholderText} />
          )}

          <ContinueButton
            nextRoute={nextRoute}
            buttonText={buttonText}
            otpField={otpField}
          />

          {/* {otpField ? (
            <p className="text-para">
              Can't find the email? Click{" "}
              <span>
                <Link className="underline text-white" to={"/get-started"}>
                  here
                </Link>
              </span>{" "}
              to respond
            </p>
          ) : (
            ""
          )} */}
        </div>
      </div>
    </>
  );
}
