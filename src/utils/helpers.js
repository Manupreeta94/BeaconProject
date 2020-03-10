import { isEmpty, map, find } from "lodash";
import { AsyncStorage } from "react-native";
import { get } from "./http";
import * as NetInfo from "@react-native-community/netinfo";

export function findExtensionFromEmail(email) {
  var index = email.indexOf("@");
  var extension = email.substr(index + 1);
  return extension;
}

export function getErrorMessage(errors) {
  let msg = {
    header: "",
    message: ""
  };
  // error.response.data.errors.mail_extension[0]
  if (!isEmpty(errors)) {
    if (!isEmpty(errors.data)) {
      if (!isEmpty(errors.data.errors)) {
        let err = errors.data.errors;
        map(err, (obj, key) => {
          msg.header = key;
          msg.message = obj[0];
          // msg += `${key} : ${obj[0]}\n`;
        });
      }
    }

    if (msg === {}) {
      map(errors, (obj, key) => {
        // msg += `${key} : ${obj}\n`;
        msg.header = key;
        msg.message = obj;
      });
    }
  }
  return msg;
}

export function isNetworkAvailable() {
  let isConnected;
  NetInfo.addEventListener(result => {
    isConnected = result.isConnected;
  });
  return isConnected;
}
