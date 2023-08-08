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
const AddItem = ({props, disabled = false}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2
      }}
    >
      {console.log("add item options", props.options)}
      {console.log("add item forFilterOptions", props.forFilterOptions)}
      <Autocomplete
        disabled={disabled}
        sx={{ width: "90%" }}
        options={props.options.filter((t) =>
          props.forFilterOptions.every((st) => st !== t)
        )}
        // getOptionLabel={(a) => `${a[props.labelOptions[0]]} ${a[props.labelOptions[1]] || ""}`}
        renderInput={(params) => (
          <TextField {...params} label={`Add ${props.itemName}`} />
        )}
        value={props.newItem}
        onChange={(e, v) => props.handleSetNewOption(e, v, props.newItemName)}
      />
      <Tooltip title={`Dodaj ${props.itemName}`}>
        <span>
          <IconButton
            disabled={props.newItem === null}
            size="large"
            onClick={() => props.handleAddNewItem(props.newItemName, props.collection)}
          >
            <AddBoxSharp fontSize="large" />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};

export default AddItem;
