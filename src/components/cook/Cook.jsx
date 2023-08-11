import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import {
  useFetcher,
  useLoaderData,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useImmerReducer } from "use-immer";
import TableTemplate from "../lib/TableTemplate";
import AddItem from "../lib/AddItem";
import { getUserRole } from "../../utils/token";
import EditButtons from "../lib/EditButtons";
import UserGeneralDataEdit from "../lib/UserGeneralDataEdit";
import AddDeleteItemsChips from "../lib/AddDeleteItemsChips";
import {
  isFormValid,
  validateFirstName,
  validateLastName,
  validateEmail,
} from "../../utils/validation";
import ValidatedTextField from "../lib/ValidatedTextField";
import { useEffect, useState } from "react";

const ValidationIndex = {
  firstName: validateFirstName,
  lastName: validateLastName,
  email: validateEmail,
};

const userReducer = (draft, action) => {
  switch (action.type) {
    case "input_changed": {
      draft.user[action.name] = action.value;
      break;
    }
    case "remove_item": {
      const index = draft.user[action.collection].findIndex(
        (c) => c === action.item
      );
      if (index !== -1) {
        draft.user[action.collection].splice(index, 1);
      }
      break;
    }
    case "set_new_option": {
      draft[action.optionType] = action.option;
      break;
    }
    case "add_new_item": {
      console.log("add_new_item", action.collection);
      draft.user[action.collection].push(draft[action.item]);
      draft[action.item] = null;
      break;
    }
    case "reset_form": {
      draft.user = action.user;
      for (const k in ValidationIndex) {
        draft.errors[k] = ValidationIndex[k](draft.user[k]);
      }
      draft.isFormValid = true;
      break;
    }
    case "validate": {
      draft.errors[action.key] = ValidationIndex[action.key](
        draft.user[action.key]
      );
      draft.isFormValid = isFormValid(draft.errors, ["firstName", "lastName"]);
      break;
    }
    default: {
      throw ("Invalid action: ", action.type);
    }
  }
};

const Cook = ({ props }) => {
  const [userData, allFactors] = useLoaderData();
  const [factors, setFactors] = useState(structuredClone(allFactors));
  // console.log("userData", props.user);
  const fetcher = useFetcher();
  const nav = useNavigate();
  const location = useLocation();
  const [state, dispatch] = useImmerReducer(userReducer, {
    user: {
      ...userData,
    },
    errors: {
      firstName: validateFirstName(userData.firstName),
      lastName: validateLastName(userData.lastName),
    },
    newFactor: null,
    // newRecipe: null,
    isFormValid: true,
  });

  useEffect(() => {
    if (fetcher.data) {
      console.log("fetcher.data from Cook in effect", fetcher.data);
      nav("/admin/cooks");
    }
  }, [fetcher.data]);

  const handleRemoveItem = (e, item, collection) => {
    dispatch({
      type: "remove_item",
      item,
      collection,
    });
  };

  const handleSetNewOption = (e, v, optionType) => {
    dispatch({
      type: "set_new_option",
      option: v,
      optionType,
    });
  };

  const handleAddNewItem = (item, collection) => {
    dispatch({
      type: "add_new_item",
      item,
      collection,
    });
  };

  const handleInputChanged = (e) => {
    dispatch({
      type: "input_changed",
      value: e.target.value,
      name: e.target.name,
    });
  };

  const onResetClick = () =>
    dispatch({
      type: "reset_form",
      user: structuredClone(userData),
    });

  const onDeleteClick = () => {
    fetcher.submit(
      {},
      {
        method: "delete",
        action: `/admin/cooks/${state.user.id}`,
      }
    );
    nav("/admin/cooks")
  };

  const onSaveClick = async () => {
    let cook = {
      "firstName": state.user.firstName,
      "lastName": state.user.lastName,
      "email": state.user.email,
      "aboutMe": state.user.aboutMe
    };
    fetcher.submit(cook, {
      method: "put",
      action: `/admin/cooks/${state.user.id}`,
    });
    // nav("/teachers");
  };

  const recipesTableProps = {
    tableLabel: "Recipes",
    tableHeaders: ["Id", "Title", "Posted"],
    tableData: state.user.recipes,
    tdConfig: ["id", "title", "createdOn"],
    removeFn: handleRemoveItem,
    collectionName: "recipes",
    editUrl: "/",
    editBtn: true,
    deleteBtn: false,
  };

  // const addItemProps = {
  //   itemName: state.itemName,
  //   newItemName: state.newFactor,
  //   newItem: state.newItem,
  //   options: state.items,
  //   collection: props.addItemProps.collection,
  //   forFilterOptions: state.user[props.addItemProps.forFilterOptions],
  //   labelOptions: [props.addItemProps.labelOptions],
  //   handleSetNewOption,
  //   handleAddNewItem,
  // };
  // const addItemProps = {
  //   itemName: "Limiting Factor",
  //   newItemName: "newFactor",
  //   newItem: state.newFactor,
  //   options: state.factors,
  //   collection: "myLimitigFactors",
  //   forFilterOptions: state.user.myLimitigFactors,
  //   labelOptions: ["limitingFactor"],
  //   handleSetNewOption,
  //   handleAddNewItem,
  // };

  const validationContext = {
    dispatch,
    generateOnChanged: handleInputChanged,
    state,
  };

  return (
    <Box sx={{ minWidth: "100vh", width: "100%" }}>
      <Button onClick={() => nav("/admin/cooks")}>&lt;&lt; BACK</Button>
      <Container
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          minWidth: "90%",
        }}
      >
        {console.log("Cook render", state.user)}

        <Box sx={{ width: "50vw" }}>
          <form>
            <FormControl
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <UserGeneralDataEdit
                user={state.user}
                validationContext={validationContext}
              />

              <Box
                // component="form"
                sx={{
                  "& .MuiTextField-root": { width: "50vw", marginBottom: 2 },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-multiline-static"
                  label="About me"
                  multiline
                  minRows={2}
                  maxRows={10}
                  defaultValue={state.user.aboutMe}
                />
              </Box>

              
              <TableTemplate props={recipesTableProps} />

              <EditButtons
                onSaveClick={onSaveClick}
                onResetClick={onResetClick}
                onDeleteClick={onDeleteClick}
                isFormValid={state.isFormValid}
              />
            </FormControl>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default Cook;
