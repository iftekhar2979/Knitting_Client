"use client";

/* Core */
import { Provider } from "react-redux";

/* Instruments */
import { store } from "../lib/store";
import UserContext from "@/components/Context/UserContext";

export const Providers = (props) => {
  return (
    <Provider store={store}>
      <UserContext>{props.children}</UserContext>
    </Provider>
  );
};
