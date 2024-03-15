import * as MBUtton from "@mui/material/Button";

import { ButtonType } from "../types/components";

export default function Button({ children, ...rest }: ButtonType) {
  return (
    <div>
      <MBUtton.default {...rest}> {children} </MBUtton.default>
    </div>
  );
}
