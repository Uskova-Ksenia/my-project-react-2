import React from "react";
import cn from "classnames";

import s from "./index.modules.css";

const FormButton = ({ text, onClick, type = "primary" }) => {
  return (
    <button className={cn(s.btn, s[`btn_type_${type}`])} onClick={onClick}>
      {text}
    </button>
  );
};

export default FormButton;
