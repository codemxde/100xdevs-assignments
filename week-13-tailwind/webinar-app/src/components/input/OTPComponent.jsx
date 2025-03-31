import { useRef } from "react";

import { useDispatch } from "react-redux";
import { setActive } from "../../redux/inputSlice";

function createOTPFields(length, refArray) {
  const dispatch = useDispatch();
  const handleKeyPress = (e, index) => {
    // move to previous otp field
    if (e.key.toLowerCase() === "backspace" || e.key.toLowerCase() === "delete") {
      if (index > 0) {
        e.target.value = "";
        refArray.current[index - 1].focus();
      }
    } else if (index + 1 < length) {
      // move to the next field
      setTimeout(() => {
        refArray.current[index + 1].focus();
      }, 0);
    } else if (index === length - 1) {
      // time to make the button green!
      dispatch(setActive(true));
    }
  };

  return Array.from({ length }, (_, index) => {
    return (
      <input
        key={index}
        ref={(el) => {
          refArray.current[index] = el;
        }}
        className="w-9 p-1 text-center text-white h-10 bg-input rounded-xl"
        type="text"
        onKeyDown={(e) => {
          handleKeyPress(e, index);
        }}
      />
    );
  });
}

export default function OTPComponent({ length }) {
  const refArray = useRef(new Array(length));

  const OTPFields = createOTPFields(6, refArray);

  return <div className="w-[80%] flex justify-center gap-x-3">{OTPFields}</div>;
}
