import axios from "axios";
import React from "react";
export default async function service(info) {
  axios.post("http://localhost:5000/login", { info: info }).then((response) => {
    console.log(response);
  });
}
