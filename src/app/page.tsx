"use client";
import Home from "@/components/Home";
import { Provider } from "react-redux";
import { store } from "./store/store";
export default function Page() {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
}
