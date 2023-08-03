import { TextField } from "@mui/material";

const ValidatedTextField = ({
  label,
  type,
  id,
  state,
  value,
  dispatch,
  generateOnChanged,
  required = false,
  inputProps = {}
}) => { 
  return (
    <TextField
      label={label}
      type={type}
      required={required}
      helperText={((state.errors[id] !== undefined) && !state.errors[id].valid) ? state.errors[id].cause : " "}
      error={state.errors[id] !== undefined && !state.errors[id].valid}
      id={id}
      name={id}
      value={value}
      inputProps={inputProps}
      onChange={generateOnChanged}
      sc={{ paddingBottom: "2rem" }}
      onBlur={(e) => {
        dispatch({
          type: "validate",
          key: id,
        });
      }}
    />
  );
};

export default ValidatedTextField;
