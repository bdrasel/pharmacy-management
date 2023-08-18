import { eventBus } from "./eventBus";

export const errorMessage = (err) => {
  let errorMessage = err || "Something went wrong";

  if (err.response) {
    errorMessage = err.response.data.message || err.response.data.err_message;
  }

  eventBus.emit("toast", {
    type: "Error",
    message: errorMessage,
  });
};

export const successMessage = (res) => {
  let successMessage = res || "Success";

  if (res.data) {
    successMessage = res.data.message;
  }

  eventBus.emit("toast", {
    type: "Success",
    message: successMessage,
  });
};
