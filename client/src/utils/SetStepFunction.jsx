import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStep } from "../slices/checkoutSlice";

export const SetStepFunction = (step) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setStep(step));
  });
};
