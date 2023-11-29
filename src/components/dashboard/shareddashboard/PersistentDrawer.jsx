import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import GridViewIcon from "@mui/icons-material/GridOn";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import DynamicFormIcon from "@mui/icons-material/DynamicForm";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import {
  Assessment,
  AssessmentOutlined,
  ListAltOutlined,
  People,
} from "@mui/icons-material";
import useCreator from "../../../hooks/useCreator";
import useAdmin from "../../../hooks/useAdmin";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
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
  })
);

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

export default function PersistentDrawerLeft() {
  const { user, loading, signOutUser } = useAuth();
  const [isCreator] = useCreator();
  const [isAdmin] = useAdmin();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const data=[
  //   { title:'Add Contest',icon: DynamicFormIcon, link:'/add-contest' }
  // ]

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} className="bg-slate-700">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className="uppercase" noWrap component="div">
            {user?.displayName}
          </Typography>
        </Toolbar>
      </AppBar>
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
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {/* user lists */}
        {user && !isCreator && !isAdmin && (
          <List onClick={handleDrawerClose}>
            <ListItem>
              <Link to={"/dashboard/my-profile"} className="flex items-center">
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                My Profile
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/dashboard/participated-contest"}
                className="flex items-center"
              >
                <ListItemIcon>
                  <ListAltOutlined />
                </ListItemIcon>
                My Participated Contests
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/dashboard/winning-contest"}
                className="flex items-center"
              >
                <ListItemIcon>
                  <AssessmentOutlined />
                </ListItemIcon>
                My Winning Contests
              </Link>
            </ListItem>
          </List>
        )}
        {/* creator lists */}
        {user && isCreator && (
          <List onClick={handleDrawerClose}>
            <ListItem>
              <Link to={"/dashboard/add-contest"} className="flex items-center">
                <ListItemIcon>
                  <DynamicFormIcon />
                </ListItemIcon>
                Add Contest
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/dashboard/created-contest"}
                className="flex items-center"
              >
                <ListItemIcon>
                  <ListAltOutlined />
                </ListItemIcon>
                My Created Contest
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/dashboard/submitted-contest"}
                className="flex items-center"
              >
                <ListItemIcon>
                  <AssessmentOutlined />
                </ListItemIcon>
                Submitted Contest
              </Link>
            </ListItem>
          </List>
        )}
        {user && isAdmin && (
          <List onClick={handleDrawerClose}>
            <ListItem>
              <Link
                to={"/dashboard/manage-users"}
                className="flex items-center"
              >
                <ListItemIcon>
                  <GroupIcon />
                </ListItemIcon>
                Manage Users
              </Link>
            </ListItem>
            <ListItem>
              <Link
                to={"/dashboard/manage-contests"}
                className="flex items-center"
              >
                <ListItemIcon>
                  <GridViewIcon />
                </ListItemIcon>
                Manage Contests
              </Link>
            </ListItem>
            {/* <ListItem>
              <Link
                to={"/dashboard/submitted-contest"}
                className="flex items-center"
              >
                <ListItemIcon>
                  <AssessmentOutlined />
                </ListItemIcon>
                Submitted Contest
              </Link>
            </ListItem> */}
          </List>
        )}
        <Divider />
        <List onClick={handleDrawerClose}>
          <ListItem>
            <Link to={"/"} className="flex items-center">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link to={"/all-contest"} className="flex items-center">
              <ListItemIcon>
                <GridViewIcon />
              </ListItemIcon>
              All Contest
            </Link>
          </ListItem>
          <ListItem onClick={signOutUser}>
            <Link to={"/login"} className="flex items-center">
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Log Out
            </Link>
          </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
