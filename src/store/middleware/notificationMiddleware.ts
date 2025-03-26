import type { Middleware, MiddlewareAPI } from "redux";
import { isFulfilled, isRejectedWithValue } from "@reduxjs/toolkit";
import { messageCatch } from "../../utils/messageCatch";
import { errorCatch } from "../../utils/errorCatch";
import { addToast, cn } from "@heroui/react";

export const notificationMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isFulfilled(action)) {
    const message = messageCatch(action.payload);
    if (message !== "") {
      addToast({
        title: "Успешно",
        description: message,
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "success",
        classNames: {
          base: cn(["z-[10000]"]),
        },
      });
    }
  }

  if (isRejectedWithValue(action)) {
    const error = errorCatch(action.payload);
    if (error !== "") {
      addToast({
        title: "Ошибка",
        description: error,
        variant: "flat",
        radius: "sm",
        timeout: 5000,
        color: "danger",
        classNames: {
          base: cn(["z-[10000]"]),
        },
      });
    }
  }
  return next(action);
};
