import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearInput, setLastInput, setActive } from "../../redux/inputSlice";

export default function ContinueButton({ nextRoute, buttonText, otpField }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isActive } = useSelector((state) => state.input);

  const navigateNext = () => {
    dispatch(setLastInput());
    dispatch(clearInput());
    dispatch(setActive(false));
    navigate(nextRoute);
  };
  return (
    <div className={`w-full ${otpField ? "flex flex-col gap-y-3 items-center" : ""}`}>
      <button
        className={`${
          isActive ? "bg-continueSelected" : "bg-continue cursor-default"
        } w-full p-3 rounded-lg text-white font-semibold`}
        onClick={navigateNext}
      >
        {buttonText}
      </button>

      {otpField ? (
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
      )}
    </div>
  );
}
