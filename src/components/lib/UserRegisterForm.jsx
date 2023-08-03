import {
  Box,
  Container,
  Divider,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useFetcher, useLoaderData, useNavigate } from "react-router-dom";
import { useImmerReducer } from "use-immer";
import { useEffect } from "react";
import {
  isFormValid,
  validateFirstName,
  validateLastName,
  validateUsername,
  validateEmail,
  validatePassword,
  validateConfirmedPassword
} from "../../utils/validation";
import ValidatedTextField from "../lib/ValidatedTextField";
import AddNewButtons from "../lib/AddNewButtons";

const ValidationIndex = {
  firstName: validateFirstName,
  lastName: validateLastName,
  username: validateUsername,
  email: validateEmail,
  password: validatePassword,
  confirmedPassword: validateConfirmedPassword
};

const registrationReducer = (draft, action) => {
  switch (action.type) {
    case "input_changed": {
      draft.newUser[action.name] = action.value;
      break;
    }
    // case "remove_item": {
    //   const index = draft.subject[action.collection].findIndex(
    //     (c) => c.id === action.item.id
    //   );
    //   if (index !== -1) {
    //     draft.subject[action.collection].splice(index, 1);
    //   }
    //   break;
    // }
    // case "set_new_option": {
    //   draft[action.optionType] = action.option;
    //   break;
    // }
    // case "add_new_item": {
    //   draft.subject[action.collection].push(draft[action.item]);
    //   draft[action.item] = null;
    //   break;
    // }
    case "reset_form": {
      draft.subject = action.subject;
      draft.isFormValid = false;
      draft.errors = {};
      break;
    }
    // case "grade_changed": {
    //   console.log("students_by_grade_changed");
    //   draft.studentsByGrade = action.data;
    //   draft.subject.students = [];
    //   break;
    // }
    case "validate": {
      draft.errors[action.key] = ValidationIndex[action.key](
        draft.newUser[action.key]
      );
      draft.isFormValid = isFormValid(draft.errors, [
        "firstName",
        "lastName",
        "email",
        "username",
        "password"
      ]);
      break;
    }
    default: {
      throwError("Invalid action: ", action.type);
    }
  }
};

const UserRegisterForm = () => {
  const nav = useNavigate();
  const fetcher = useFetcher();

  const [state, dispatch] = useImmerReducer(registrationReducer, {
    newUser: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
    },
    errors: {},
    isFormValid: false,
  });

  // usePropChange(state.subject.grade, dispatch, "grade_changed");

  useEffect(() => {
    if (fetcher.data) {
      nav("/");
    }
  }, [fetcher.data]);

  // const handleRemoveItem = (e, item, collection) => {
  //   dispatch({
  //     type: "remove_item",
  //     item,
  //     collection,
  //   });
  // };

  // const handleSetNewOption = (e, v, optionType) => {
  //   dispatch({
  //     type: "set_new_option",
  //     option: v,
  //     optionType,
  //   });
  // };

  // const handleAddNewItem = (item, collection) => {
  //   dispatch({
  //     type: "add_new_item",
  //     item,
  //     collection,
  //   });
  // };

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
      subject: {
        usernameame: "",
        password: "",
        confirmedPassword: "",
        firstName: "",
        lastName: "",
        email: "",
      },
    });

  const onSaveClick = () => {
    let s = structuredClone(state.newUser);
    fetcher.submit(s, {
      method: "post",
      action: `/users/new`,
    });
  };

  const validationContext = {
    dispatch,
    generateOnChanged: handleInputChanged,
    state,
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minWidth: "90%",
      }}
    >
      <Typography variant="h3">Register</Typography>

      <form>
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <ValidatedTextField
            id={"firstName"}
            label={"First name"}
            type={"text"}
            required
            value={state.newUser.firstName}
            {...validationContext}
          />

          <ValidatedTextField
            id={"lastName"}
            label={"Last name"}
            type={"text"}
            required
            value={state.newUser.lastName}
            {...validationContext}
          />

          <ValidatedTextField
            id={"email"}
            label={"Email"}
            type={"email"}
            required
            value={state.newUser.email}
            {...validationContext}
          />

          <ValidatedTextField
            id={"username"}
            label={"username"}
            type={"text"}
            required
            value={state.newUser.username}
            {...validationContext}
          />

          <ValidatedTextField
            id={"password"}
            label={"Password"}
            type={"password"}
            required
            value={state.newUser.password}
            {...validationContext}
          />

          <ValidatedTextField
            id={"confirmedPassword"}
            label={"Confirm password"}
            type={"password"}
            required
            value={state.newUser.confirmedPassword}
            {...validationContext}
          />

          <AddNewButtons
            onResetClick={onResetClick}
            onSaveClick={onSaveClick}
            isFormValid={state.isFormValid}
          />
        </FormControl>
      </form>
    </Container>
  );
};

export default UserRegisterForm;
