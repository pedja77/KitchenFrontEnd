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
  import { useEffect, useState } from "react";
  import {
    isFormValid,
    validateFirstName,
    validateLastName,
    validateUsername,
    validateEmail,
    validatePassword,
    validateConfirmedPassword,
  } from "../../utils/validation";
  import ValidatedTextField from "../lib/ValidatedTextField";
  import AddNewButtons from "../lib/AddNewButtons";
  
  const ValidationIndex = {
    firstName: validateFirstName,
    lastName: validateLastName,
    username: validateUsername,
    email: validateEmail,
    // password: validatePassword,
    // confirmedPassword: validateConfirmedPassword,
  };
  
  const registrationReducer = (draft, action) => {
    switch (action.type) {
      case "input_changed": {
        draft.user[action.name] = action.value;
        break;
      }
      case "reset_form": {
        draft.user = action.user;
        draft.isFormValid = false;
        draft.errors = {};
        break;
      }
      case "validate": {
        // if (action.key === "confirmedPassword") {
        //   draft.errors[action.key] = ValidationIndex[action.key](
        //     draft.user[action.key],
        //     draft.user.password
        //   );
        // } else 
        if (action.key === "username") {
          draft.errors[action.key] = ValidationIndex[action.key](
            draft.user[action.key],
            draft.usernames
          );
        // } else if (action.key === "password") {
        //   draft.errors[action.key] = ValidationIndex[action.key](
        //     draft.user[action.key],
        //     draft.password
        //   );
        } else if (action.key === "firstName") {
          draft.errors[action.key] = ValidationIndex[action.key](
            draft.user[action.key],
            draft.firstName
          );
        } else if (action.key === "lastName") {
          draft.errors[action.key] = ValidationIndex[action.key](
            draft.user[action.key],
            draft.lastName
          );
        } else if (action.key === "email") {
          draft.errors[action.key] = ValidationIndex[action.key](
            draft.user[action.key],
            draft.email
          );
        } else {
          draft.errors[action.key] = ValidationIndex[action.key](
            draft.user[action.key]
          );
        }
        draft.isFormValid = isFormValid(draft.errors, [
          "firstName",
          "lastName",
          "email",
          "username",
        //   "password",
        //   "confirmedPassword",
        ]);
        break;
      }
      default: {
        throwError("Invalid action: ", action.type);
      }
    }
  };
  
  const UserEditForm = ({props}) => {
    const nav = useNavigate();
    const fetcher = useFetcher();
    const [user, usernames] = useLoaderData();
  
    const [oldUser, setOldUser] = useState(structuredClone(user));
  
    const [state, dispatch] = useImmerReducer(registrationReducer, {
      user: structuredClone(user),
      usernames: structuredClone(usernames),
      errors: {},
      isFormValid: true,
    //   usernames,
    });
  
    // useEffect(() => {
    //   if (fetcher.data) {
    //     nav("/");
    //   }
    // }, [fetcher.data]);
  
    const handleInputChanged = (e) => {
        console.log("input changed", e.target.name)
      dispatch({
        type: "input_changed",
        value: e.target.value,
        name: e.target.name,
      });
    };
  
    const onResetClick = () =>
      dispatch({
        type: "reset_form",
        user: structuredClone(oldUser)
      });
  
    const onSaveClick = () => {
      let s = structuredClone(state.user);
      fetcher.submit(s, {
        method: "put",
        action: `/register`,
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
          width: "90%"
        }}
      >
        <Typography>Id: {state.user.id}</Typography>
  
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
              value={state.user.firstName}
              {...validationContext}
            />
  
            <ValidatedTextField
              id={"lastName"}
              label={"Last name"}
              type={"text"}
              required
              value={state.user.lastName}
              {...validationContext}
            />
  
            <ValidatedTextField
              id={"email"}
              label={"Email"}
              type={"email"}
              required
              value={state.user.email}
              {...validationContext}
            />
  
            <ValidatedTextField
              id={"username"}
              label={"username"}
              type={"text"}
              required
              value={state.user.username}
              {...validationContext}
            />
  
            {/* <ValidatedTextField
              id={"password"}
              label={"Password"}
              type={"password"}
              required
              value={state.user.password}
              {...validationContext}
            />
  
            <ValidatedTextField
              id={"confirmedPassword"}
              label={"Confirm password"}
              type={"password"}
              required
              value={state.user.confirmedPassword}
              {...validationContext}
            /> */}

            {state.user.role === "REGULARUSER" && <Typography>Lista korisnikovih ogranicenja</Typography>}

            {state.user.role === "REGULARUSER" && <Typography>Lista korisnikovih omiljenih recepata</Typography>}
  
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
  
  export default UserEditForm;
  