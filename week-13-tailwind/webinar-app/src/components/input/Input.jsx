import { useSelector, useDispatch } from "react-redux";
import { handleTyping, setActive } from "../../redux/inputSlice";

export default function Input({ placeholderText, type }) {
  const dispatch = useDispatch();

  const { value } = useSelector((state) => state.input);

  return (
    <input
      className="w-full p-3 rounded-lg bg-input text-white focus:outline-none"
      type={type}
      placeholder={placeholderText}
      onFocus={() => dispatch(setActive(true))}
      onChange={(e) => dispatch(handleTyping(e.target.value))}
      value={value}
    />
  );
}
