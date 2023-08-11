import { Box, Chip, Typography } from "@mui/material";
import AddItem from "./AddItem";

const AddDeleteItemsChips = ({
  usersLimitingFactors,
  addItemProps,
  handleRemoveItem,
}) => {
  return (
    <>
      <Typography>Limiting factors:</Typography>
      <Box
        sx={{
          border: 1,
          borderRadius: 2,
          borderColor: "#c4c4c4",
          minHeight: "9vh",
          marginBottom: 2,
          padding: 1,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        {usersLimitingFactors.map((factor, index) => (
          <Chip
            label={factor}
            key={factor + index}
            xs={{}}
            name={factor}
            onClick={() => {
              console.log("clicked");
            }}
            onDelete={(e) => handleRemoveItem(e, factor, "myLimitigFactors")}
          />
        ))}
      </Box>
      <AddItem addItemProps={addItemProps} />
    </>
  );
};

export default AddDeleteItemsChips;
