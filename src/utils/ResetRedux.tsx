import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useDispatch } from "react-redux";
import { resetReduxStore } from "../store/store";

const ResetRedux: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetReduxStore());
  }, [location.pathname, dispatch]);

  return <></>;
};

export default ResetRedux;
