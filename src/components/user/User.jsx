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
  redirect,
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

const User = ({ props }) => {
  const [userData, allFactors] = useLoaderData();
  const [factors, setFactors] = useState(structuredClone(allFactors));
  console.log("allFactors", allFactors);
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
    factors: structuredClone(factors).map((e) => e.name),
    // newRecipe: null,
    isFormValid: true,
  });
  console.log("fetcher.data from User", fetcher.data);
  useEffect(() => {
    if (fetcher.data) {
      console.log("fetcher.data from User in effect", fetcher.data);
      nav("/admin/users");
    }
  }, [fetcher.data]);

  const handleRemoveItem = (e, item, collection) => {
    dispatch({
      type: "remove_item",
      item,
      collection,
    });
    const removedItemId = allFactors.find(e => e.name === item).id;
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

  const onDeleteClick = async () => {
    fetcher.submit(
      {},
      {
        method: "delete",
        action: `/admin/users/${state.user.id}`,
      }
    );

    // nav("/admin/users", {state: {reload: true}});
  };

  const onSaveClick = async () => {
    // let s = structuredClone(state.teacher);
    // s.items = JSON.stringify(state.teacher.subjects);
    // fetcher.submit(s, {
    //   method: "put",
    //   action: `/teachers/${state.teacher.id}`,
    // });
    // // nav("/teachers");
  };

  const likedRecipesTableProps = {
    tableLabel: "Liked recipes",
    tableHeaders: ["Id", "Title", "Cook"],
    tableData: state.user.myCookbook,
    tdConfig: ["id", "title", "cook"],
    removeFn: handleRemoveItem,
    collectionName: "myCookbook",
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
  const addItemProps = {
    itemName: "Limiting Factor",
    newItemName: "newFactor",
    newItem: state.newFactor,
    options: state.factors,
    collection: "myLimitigFactors",
    forFilterOptions: state.user.myLimitigFactors,
    labelOptions: ["limitingFactor"],
    handleSetNewOption,
    handleAddNewItem,
  };

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
        {console.log("UserEditForm render", state.user)}

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

              <AddDeleteItemsChips
                usersLimitingFactors={state.user.myLimitigFactors}
                addItemProps={addItemProps}
                handleRemoveItem={handleRemoveItem}
              />

              <TableTemplate props={likedRecipesTableProps} />

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

export default User;

// import {
//   Box,
//   Container,
//   Divider,
//   FormControl,
//   MenuItem,
//   Select,
//   Typography,
// } from "@mui/material";
// import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
// import { useImmerReducer } from "use-immer";
// import { useEffect, useState } from "react";
// import {
//   isFormValid,
//   validateFirstName,
//   validateLastName,
//   validateUsername,
//   validateEmail,
//   validatePassword,
//   validateConfirmedPassword,
// } from "../../utils/validation";
// import ValidatedTextField from "../lib/ValidatedTextField";
// import AddNewButtons from "../lib/AddNewButtons";

// const ValidationIndex = {
//   firstName: validateFirstName,
//   lastName: validateLastName,
//   username: validateUsername,
//   email: validateEmail,
//   // password: validatePassword,
//   // confirmedPassword: validateConfirmedPassword,
// };

// const registrationReducer = (draft, action) => {
//   switch (action.type) {
//     case "input_changed": {
//       draft.user[action.name] = action.value;
//       break;
//     }
//     case "reset_form": {
//       draft.user = action.user;
//       draft.isFormValid = false;
//       draft.errors = {};
//       break;
//     }
//     case "validate": {
//       // if (action.key === "confirmedPassword") {
//       //   draft.errors[action.key] = ValidationIndex[action.key](
//       //     draft.user[action.key],
//       //     draft.user.password
//       //   );
//       // } else
//       if (action.key === "username") {
//         draft.errors[action.key] = ValidationIndex[action.key](
//           draft.user[action.key],
//           draft.usernames
//         );
//         // } else if (action.key === "password") {
//         //   draft.errors[action.key] = ValidationIndex[action.key](
//         //     draft.user[action.key],
//         //     draft.password
//         //   );
//       } else if (action.key === "firstName") {
//         draft.errors[action.key] = ValidationIndex[action.key](
//           draft.user[action.key],
//           draft.firstName
//         );
//       } else if (action.key === "lastName") {
//         draft.errors[action.key] = ValidationIndex[action.key](
//           draft.user[action.key],
//           draft.lastName
//         );
//       } else if (action.key === "email") {
//         draft.errors[action.key] = ValidationIndex[action.key](
//           draft.user[action.key],
//           draft.email
//         );
//       } else {
//         draft.errors[action.key] = ValidationIndex[action.key](
//           draft.user[action.key]
//         );
//       }
//       draft.isFormValid = isFormValid(draft.errors, [
//         "firstName",
//         "lastName",
//         "email",
//         "username",
//         //   "password",
//         //   "confirmedPassword",
//       ]);
//       break;
//     }
//     default: {
//       throwError("Invalid action: ", action.type);
//     }
//   }
// };

// const UserEditForm = ({ props }) => {
//   const nav = useNavigate();
//   const fetcher = useFetcher();
//   const [user, usernames] = useLoaderData();

//   const [oldUser, setOldUser] = useState(structuredClone(user));

//   const [state, dispatch] = useImmerReducer(registrationReducer, {
//     user: structuredClone(user),
//     usernames: structuredClone(usernames),
//     errors: {},
//     isFormValid: true,
//     //   usernames,
//   });

//   // useEffect(() => {
//   //   if (fetcher.data) {
//   //     nav("/");
//   //   }
//   // }, [fetcher.data]);

//   const handleInputChanged = (e) => {
//     console.log("input changed", e.target.name);
//     dispatch({
//       type: "input_changed",
//       value: e.target.value,
//       name: e.target.name,
//     });
//   };

//   const onResetClick = () =>
//     dispatch({
//       type: "reset_form",
//       user: structuredClone(oldUser),
//     });

//   const onSaveClick = () => {
//     let s = structuredClone(state.user);
//     fetcher.submit(s, {
//       method: "put",
//       action: `/register`,
//     });
//   };

//   const validationContext = {
//     dispatch,
//     generateOnChanged: handleInputChanged,
//     state,
//   };

//   return (
//     <Container
//       sx={{
//         display: "flex",
//         flexDirection: "row",
//         justifyContent: "center",
//         // alignItems: "center",
//         minWidth: "90%",
//         width: "100%",
//       }}
//     >
//       <Box>
//         <Typography>Id: {state.user.id}</Typography>

//         <form>
//           <FormControl
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "space-between",
//             width: '50vh'
//           }}
//           >
//             <ValidatedTextField
//               id={"firstName"}
//               label={"First name"}
//               type={"text"}
//               required
//               value={state.user.firstName}
//               {...validationContext}
//             />

//             <ValidatedTextField
//               id={"lastName"}
//               label={"Last name"}
//               type={"text"}
//               required
//               value={state.user.lastName}
//               {...validationContext}
//             />

//             <ValidatedTextField
//               id={"email"}
//               label={"Email"}
//               type={"email"}
//               required
//               value={state.user.email}
//               {...validationContext}
//             />

//             <ValidatedTextField
//               id={"username"}
//               label={"username"}
//               type={"text"}
//               required
//               value={state.user.username}
//               {...validationContext}
//             />

//             {/* <ValidatedTextField
//               id={"password"}
//               label={"Password"}
//               type={"password"}
//               required
//               value={state.user.password}
//               {...validationContext}
//             />

//             <ValidatedTextField
//               id={"confirmedPassword"}
//               label={"Confirm password"}
//               type={"password"}
//               required
//               value={state.user.confirmedPassword}
//               {...validationContext}
//             /> */}

//             {state.user.role === "REGULARUSER" && (
//               <Typography>Lista korisnikovih ogranicenja</Typography>
//             )}

//             {state.user.role === "REGULARUSER" && (
//               <Typography>Lista korisnikovih omiljenih recepata</Typography>
//             )}

//             <AddNewButtons
//               onResetClick={onResetClick}
//               onSaveClick={onSaveClick}
//               isFormValid={state.isFormValid}
//             />
//           </FormControl>
//         </form>
//       </Box>
//     </Container>
//   );
// };

// export default UserEditForm;
