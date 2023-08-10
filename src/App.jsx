import { createContext, useMemo, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { NavLink, Outlet, useLoaderData, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MuiAppBar from "@mui/material/AppBar";
import Close from "@mui/icons-material/Close";

import { ThemeProvider, styled, useTheme, createTheme } from "@mui/material/styles";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useLogin } from "./hooks/useLogin";
import LoginControl from "./components/login/LoginControl.jsx";

import Home from "./components/home/Home";
import { getUser, getUserRole } from "./utils/token";

// import { ThemeProvider } from 'styled-components';
/*
Ova komponenta predstavlja 'pocetnu stranicu' za nasu aplikaciju posto smo definisali da ce njen sadrzaj da se prikaze kada pokrenom aplikaciju (path='/'). Na ovoj stranici ce biti prikazan navbar sa leve strane i on ce uvek da bude prikazani, nece se menjati kada izaberemo neku opciju tj uvek ce biti prisutan na ekranu. Pored navbara ostatak prostora ce zauzimati kontrola koja se zove <Outlet> i ona sluzi da se prikazuje sadrzaj u zavisnosti od rute na kojoj se nalazimo, a rute smo definisali u children atributu (ugnjezdene rute). 
*/

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const UserContext = createContext(null);

function App() {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [isDarkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const recipes = useLoaderData();

  const [user, login, logout] = useLogin();

  // Proveriti jos da li je isDarkMode u listi zavisnosti?????
  const lightTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "light",
          primary: {
            main: "#bf360c",
          },
          secondary: {
            main: "#ffffff",
          },
          divider: "#00300d",
          text: {
            primary: "#00000",
            secondary: "#424242",
          },
        },
      }),
    [isDarkMode]
  );

  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: "dark",
        },
      }),
    [isDarkMode]
  );

  const handlerDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleThemeChange = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      {console.log("location", location)}
      <UserContext.Provider value={{ user, login, logout }}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <MuiAppBar position="fixed" open={openDrawer} sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }} //, ...(openDrawer && { display: 'none' }) }}
                onClick={handlerDrawer}
              >
                {openDrawer ? <Close /> : <MenuIcon />}
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 0, marginRight: "16px" }}>
                Hell's Kitchen
              </Typography>

              <Box>
                <List sx={{ display: "flex", flexDirection: "row" }}>
                  <ListItem disablePadding>
                    <ListItemButton component={NavLink} to="/">
                      <ListItemText primary="Home" />
                    </ListItemButton>
                  </ListItem>
                  {getUser() && getUserRole() === "ADMINISTRATOR" && (
                    <ListItem disablePadding>
                      <ListItemButton component={NavLink} to="/admin">
                        <ListItemText primary="Dashboard" />
                      </ListItemButton>
                    </ListItem>
                  )}
                  {getUser() && getUserRole() === "COOK" && (
                    <ListItem disablePadding>
                      <ListItemButton component={NavLink} to="/cook">
                        <ListItemText primary="My Recipes" />
                      </ListItemButton>
                    </ListItem>
                  )}
                  {getUser() && getUserRole() === "REGULARUSER" && (
                    <ListItem disablePadding>
                      <ListItemButton component={NavLink} to="/user">
                        <ListItemText primary="My Recipes" />
                      </ListItemButton>
                    </ListItem>
                  )}
                </List>
              </Box>
              <Box sx={{ marginLeft: "auto" }}>
                <LoginControl safePath="/" defaultPath="/" isInToolbar={true} />
                {!getUser() && (
                  <Button
                    variant="outlined"
                    // onClick={(e) => {}}
                    color="secondary"
                    component={NavLink}
                    to="/register"
                  >
                    Register
                  </Button>
                )}
              </Box>
            </Toolbar>
          </MuiAppBar>
          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={openDrawer}
          >
            <Toolbar />
            <DrawerHeader sx={{ display: "flex", justifyContent: "end" }}>
              <IconButton onClick={handlerDrawer}>
                {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>
            <Divider />
            {/* <List>
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/subjects">
                  <ListItemText primary="Predmeti" />
                </ListItemButton>
              </ListItem>
              <Divider />
              <ListItem disablePadding>
                <ListItemButton component={NavLink} to="/teachers">
                  <ListItemText primary="Nastavnici" />
                </ListItemButton>
              </ListItem>
              <Divider />
            </List> */}
            <FormGroup sx={{ marginLeft: 3 }}>
              <FormControlLabel
                control={<Switch checked={isDarkMode} onChange={handleThemeChange} />}
                label={isDarkMode ? "Light mode" : "Dark mode"}
              />
            </FormGroup>
          </Drawer>
          <Main open={openDrawer}>
            <DrawerHeader />
            <Outlet />
            {/* Prikazujemo Home komponentu samo kad smo na ruti koja se zove "/" */}
            {location.pathname === "/" && <Home />}
          </Main>
        </Box>
        {/* <pre>
                {JSON.stringify(recipes, null, 4)}
              </pre> */}
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
