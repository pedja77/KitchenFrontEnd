import { Box, FormLabel } from "@mui/material";
import ValidatedTextField from "./ValidatedTextField";

const UserGeneralDataEdit = ({ user, validationContext }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <FormLabel>id: {user.id}</FormLabel>
      <FormLabel sx={{ marginBottom: 2 }}>Username: {user.username}</FormLabel>
      <ValidatedTextField
        label={"Ime"}
        type={"text"}
        id={"firstName"}
        value={user.firstName}
        {...validationContext}
      />
      <ValidatedTextField
        label="Prezime"
        type={"text"}
        id={"lastName"}
        value={user.lastName}
        {...validationContext}
      />

      <ValidatedTextField
        label="Email"
        type={"email"}
        id={"email"}
        value={user.email}
        {...validationContext}
      />
    </Box>
  );
};

export default UserGeneralDataEdit;
