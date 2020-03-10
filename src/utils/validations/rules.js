import * as ErrorMessages from "./errorMessages";

export const required = text => {
  text = text.toString().trim();
  if (text || text === 0) {
    return null;
  } else {
    return ErrorMessages.isRequired;
  }
};

export const checkValidEmail = text => {
  if (text) {
    const regExp = /^(?:[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-zA-Z0-9-]*[a-zA-Z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
    if (regExp.test(text)) {
      return null;
    }
    return ErrorMessages.isValidEmail;
  } else {
    return null;
  }
};

export const mustMatch = (field, fieldName) => {
  return (text, state) => {
    return state[field] && state[field] === text
      ? null
      : ErrorMessages.mustMatch(fieldName);
  };
};

export const checkValidPhoneNumber = field => {
  if (field) {
    const regex = /^\d{10}$/;
    const phoneRes = regex.test(field);
    return phoneRes ? null : ErrorMessages.phoneno;
  } else {
    return null;
  }
};

export const requiredByCheckBox = (field, fieldName) => {
  return (text, state) => {
    if (field === "morning_availble") {
      return state[field]
        ? null
        : state["disable_morning_time"]
        ? null
        : required(text);
    }
    return state[field] ? null : required(text);
  };
};

export const requiredByArray = (field, fieldName) => {
  return (text, state) => {
    return state[field].length > 0 ? null : required(text);
  };
};
