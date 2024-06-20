import React, { useEffect, useState } from "react";
import axios from "axios";
const bufferToArray = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  var base64Image = window.btoa(binary, "src");
  console.log(base64Image);
  return `data:image/jpeg;base64,${base64Image}`;
};

export default function Post() {
  const url = "";
  const [imageCode, setImageCode] = useState(null);
  useEffect(() => {
    const locatio = window.location.pathname;
    console.log(locatio);
    axios
      .get(`http://localhost:5000${locatio}`)
      .then((res) => {
        setImageCode(res);
      })
      .catch((err) => {
        console.log("error " + err);
      });
  }, []);
  return (
    <div>
      {/* {imageCode && <p>{JSON.stringify(imageCode.file)}</p>} */}
      {imageCode && (
        <img
          src={bufferToArray(imageCode.data.image.data)}
          width={100}
          height={100}
          style={{marginTop:'4pt '}}
        />
      )}
    </div>
  );
}
