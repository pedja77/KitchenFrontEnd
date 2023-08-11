import {
  Box,
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  FormGroup,
} from "@mui/material";
import { useState } from "react";
import { getUserRole } from "../../utils/token";

const EditButtons = ({
  onResetClick,
  onSaveClick,
  onDeleteClick,
  isFormValid,
}) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  return (
    <>
      <Collapse in={isAlertOpen}></Collapse>
      <FormGroup
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        {getUserRole() === "ADMINISTRATOR" && (
          <>
            <Box>
              <Button
                variant="contained"
                sx={{ marginRight: 1 }}
                onClick={onResetClick}
              >
                Reset
              </Button>
              <Button
                variant="outlined"
                onClick={onSaveClick}
                disabled={!isFormValid}
              >
                Save
              </Button>
            </Box>
            <Button variant="outlined" onClick={() => setIsAlertOpen(true)}>
              Delete
            </Button>
          </>
        )}
        <Dialog
          // selectedValue={}
          open={isAlertOpen}
        >
          <DialogContent>
            <pre>This entity will be removed permanently! Proceed anyway?</pre>
          </DialogContent>
          <DialogActions>
            <Button onClick={onDeleteClick}>Yes</Button>
            <Button autoFocus onClick={() => setIsAlertOpen(false)}>
              No
            </Button>
          </DialogActions>
        </Dialog>
      </FormGroup>
    </>
  );
};

export default EditButtons;
