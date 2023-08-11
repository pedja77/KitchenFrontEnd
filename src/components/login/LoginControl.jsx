import { useContext, useRef, useState } from "react";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import App from "../../App";
import { getUserRole, getUsername } from "../../utils/token";

const ROLE_PATH_MAP = new Map([
  ["ADMINISTRATOR", "/admin"],
  ["REGULARUSER", "/user"],
  ["COOK", "/cook"],
]);

export const LoginControl = ({ safePath, defaultPath, isInToolbar }) => {
  const { user, login, logout } = useContext(UserContext);
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const inputRef = useRef(true);

  const [error, setError] = useState(false);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleClose = () => {
    setOpen(false);
    setError(false);
  };

  const handleLogin = async () => {
    // e.preventDefault();
    const u = await login(username, password);
    console.log(u);
    if (u === null) {
      setError(true);
    } else {
      setError(false);
      setOpen(false);
      console.log(ROLE_PATH_MAP.get(u.role));
      nav(ROLE_PATH_MAP.get(u.role)); // hardcoded za probu bea ovoga fn primi defaultPath ali ga nekako resetuje na "/"
    }
  };
  return (
    <>
      <Button
        variant="outlined"
        onClick={(e) => {
          if (user === null) {
            setOpen(true);
          } else {
            logout();
            nav(safePath);
          }
        }}
        color={isInToolbar ? "secondary" : "primary"}
      >
        {user ? `Logout ${getUsername()}` : "Login"}
      </Button>
      <Dialog open={open} onClose={handleClose} onKeyPress={handleKeyPress}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <DialogContentText>Molimo unesite korisničko ime i lozinku.</DialogContentText>
          <TextField
            autoFocus // ne radi zapravo nista, nema promene bez obzira da li je aktivan ili zakomentarisan
            // inputRef={(i) => i && i.focus()}
            focused
            id="username"
            label="Korisničko ime"
            type="text"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="dense"
          />
          <TextField
            id="password"
            label="Lozinka"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="dense"
          />
          {error && <Typography sx={{ color: "red" }}>Pogrešno korisničko ime ili lozinka.</Typography>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginControl;
