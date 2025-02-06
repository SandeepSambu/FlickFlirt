import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import requestReducer from "./requestSlice";
import senderReducer from "./senderSlice";

const appStrore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    request: requestReducer,
    sender: senderReducer,
  },
});

export default appStrore;
