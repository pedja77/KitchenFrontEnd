import { AddBoxSharp } from "@mui/icons-material";
import { Autocomplete, Box, IconButton, TextField, Tooltip } from "@mui/material";


/**props: {
 * itemName: "nastavnik",
 *  newItemName: "newTeacher",
 *  newItem: state.newTeacher
 *  options: teachers, 
 * collection: "teachers"
 * forFilterOptions: state.subject.teachers,
 * labelOptions: ["firstName", "lastName"],
 * handleSetNewOption,
 * handleAddNewItem }*/
const AddItem = ({addItemProps, disabled = false, handleAddItem}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2
      }}
    >
      {console.log("add item options", addItemProps.options)}
      {console.log("add item forFilterOptions", addItemProps.forFilterOptions)}
      <Autocomplete
        disabled={disabled}
        sx={{ width: "90%" }}
        options={addItemProps.options.filter((t) =>
          addItemProps.forFilterOptions.every((st) => st !== t)
        )}
        // getOptionLabel={(a) => `${a[addItemProps.labelOptions[0]]} ${a[addItemProps.labelOptions[1]] || ""}`}
        renderInput={(params) => (
          <TextField {...params} label={`Add ${addItemProps.itemName}`} />
        )}
        value={addItemProps.newItem}
        onChange={(e, v) => addItemProps.handleSetNewOption(e, v, addItemProps.newItemName)}
      />
      <Tooltip title={`Dodaj ${addItemProps.itemName}`}>
        <span>
          <IconButton
            disabled={addItemProps.newItem === null}
            size="large"
            onClick={() => addItemProps.handleAddNewItem(addItemProps.newItemName, addItemProps.collection)}
          >
            <AddBoxSharp fontSize="large" />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export default AddItem;
