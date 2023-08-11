import { Box, TextField } from "@mui/material";

const IngredientForm = ({props}) => {

    return <Box>
        <TextField 
            type="text"
        />
        <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9\.]*' }}
            
        />
        
        <TextField
            inputMode="numeric"
            step={0.5}
            type="number"
        />
        <TextField />
        <TextField />
        <TextField />
        <TextField />
    </Box>
}

export default IngredientForm;