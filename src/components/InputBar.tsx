import TextField from "@mui/material/TextField";
import { InputType } from "../types/components";

export default function InputBar({ name, ...rest }: InputType) {
  return <TextField className={`app-input-${name}`} {...rest} />;
}
