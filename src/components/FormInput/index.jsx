import React, { forwardRef } from "react";
import cn from "classnames";

import s from "./index.modules.css";

const FormInput = forwardRef((props, ref) => {
  return <input ref={ref} className={s.input} {...props} />;
});

export default FormInput;
