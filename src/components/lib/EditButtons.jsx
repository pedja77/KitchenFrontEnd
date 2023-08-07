import { Box, Button, Collapse, Dialog, DialogActions, DialogContent, FormGroup } from "@mui/material";
import { useState } from "react";
import { getUserRole } from "../../utils/token";

const EditButtons = ({onResetClick, onSaveClick, onDeleteClick, isFormValid}) => {
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
                Otkaži
              </Button>
              <Button
                variant="outlined"
                onClick={onSaveClick}
                disabled={!isFormValid}
              >
                Sačuvaj
              </Button>
            </Box>
            <Button
              variant="outlined"
              onClick={() => setIsAlertOpen(true)}
            >
              Obriši
            </Button>
          </>
        )}
        <Dialog
          // selectedValue={}
          open={isAlertOpen}
        >
          <DialogContent>
            Da li zaista želite da obrišete entitet{" "}
            iz baze?
          </DialogContent>
          <DialogActions>
            <Button
              onClick={onDeleteClick}
            >
              Da
            </Button>
            <Button autoFocus onClick={() => setIsAlertOpen(false)}>
              Ne
            </Button>
          </DialogActions>
        </Dialog>
      </FormGroup>
    </>
  );
};

export default EditButtons;
