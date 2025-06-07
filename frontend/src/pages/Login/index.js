import React, { useState, useContext } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

import {
  EmailOutlined,
  LockOutlined,
  ArrowForwardIos,
  Visibility,
  VisibilityOff,
  LanguageOutlined,
} from "@material-ui/icons";

import { i18n } from "../../translate/i18n";

import { AuthContext } from "../../context/Auth/AuthContext";
import logo from "../../assets/logo.png";

import LanguageControl from "../../components/LanguageControl";
import Copyright from "../../components/Copyright";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(to bottom right, #f5f7fa, #f0f2f5)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden"
  },
  langButton: {
    position: "absolute",
    top: 20,
    left: 20,
    minWidth: "auto",
    padding: 8
  },
  card: {
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
    background: "#FFFFFF",
    border: "none",
    width: "100%",
    overflow: "visible",
    maxWidth: 400
  },
  cardContent: {
    padding: theme.spacing(4, 3)
  },
  logoContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: theme.spacing(1)
  },
  logoText: {
    fontWeight: 500,
    fontSize: "1rem",
    color: theme.palette.text.secondary,
    marginTop: theme.spacing(1)
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  },
  labelText: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5),
    display: "block"
  },
  inputContainer: {
    position: "relative",
    marginBottom: theme.spacing(3)
  },
  inputRoot: {
    borderRadius: 8,
    borderColor: "#E0E0E0",
    height: 40,
    marginTop: 0,
    marginBottom: 0
  },
  inputFocused: {
    borderColor: theme.palette.primary.main
  },
  inputIcon: {
    color: theme.palette.primary.main,
    fontSize: "1.2rem"
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    background: "#FFCC33",
    borderRadius: 8,
    height: 40,
    fontWeight: 500,
    textTransform: "none",
    color: "rgba(0, 0, 0, 0.7)"
  },
  checkboxLabel: {
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    marginLeft: -8
  },
  checkbox: {
    color: theme.palette.primary.main,
    padding: 4,
    "&.Mui-checked": {
      color: theme.palette.primary.main
    }
  },
  forgotPassword: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: "0.75rem",
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  },
  link: {
    color: theme.palette.primary.main,
    transition: "all 0.3s ease",
    fontWeight: 500,
    "&:hover": {
      color: theme.palette.primary.dark,
      textDecoration: "none"
    }
  },
  languageControl: {
    position: "absolute",
    top: 20,
    left: 20,
    "z-index": 10
  },
  languageButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 1)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    }
  },
  copyright: {
    color: theme.palette.text.secondary,
    fontSize: "0.75rem",
    marginTop: theme.spacing(3)
  },
  registerText: {
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary,
    fontSize: "0.75rem"
  }
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { handleLogin } = useContext(AuthContext);
  
  const [user, setUser] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Languages menu
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChangeInput = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handlSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleLogin(user);
      history.push("/chat");
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    setMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setMenuOpen(false);
  };
  
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  
  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };
  
  return (
    <div className={classes.root}>
      <IconButton
        className={classes.langButton}
        color="inherit"
        onClick={handleOpenMenu}
      >
        <LanguageOutlined />
      </IconButton>
      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        keepMounted
        open={menuOpen}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={() => i18n.setLanguage("pt-BR")}>Português</MenuItem>
        <MenuItem onClick={() => i18n.setLanguage("en")}>English</MenuItem>
        <MenuItem onClick={() => i18n.setLanguage("es")}>Español</MenuItem>
      </Menu>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.logoContainer}>
              <img src={logo} alt="Logo" className={classes.logo} />
              <Typography component="h1" variant="h5" style={{ fontWeight: 600 }}>
                WhatSpark
              </Typography>
              <Typography variant="body2" className={classes.logoText}>
                Login
              </Typography>
            </div>
            
            <form className={classes.form} noValidate onSubmit={handlSubmit}>
              <div className={classes.inputContainer}>
                <Typography className={classes.labelText}>
                  {i18n.t("login.form.email")} *
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChangeInput}
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                      focused: classes.inputFocused,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailOutlined className={classes.inputIcon} />
                      </InputAdornment>
                    ),
                  }}
                  placeholder="Email"
                />
              </div>
              
              <div className={classes.inputContainer}>
                <Typography className={classes.labelText}>
                  {i18n.t("login.form.password")} *
                </Typography>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={user.password}
                  onChange={handleChangeInput}
                  InputProps={{
                    classes: {
                      root: classes.inputRoot,
                      focused: classes.inputFocused,
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlined className={classes.inputIcon} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          edge="end"
                          size="small"
                        >
                          {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="••••••••"
                />
              </div>
              
              <FormControlLabel
                control={
                  <Checkbox
                    value="remember"
                    color="primary"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                    className={classes.checkbox}
                    size="small"
                  />
                }
                label={i18n.t("login.form.rememberme")}
                className={classes.checkboxLabel}
              />
              <Typography variant="body2" align="center" style={{marginTop: 8}}>
                <Link href="#" className={classes.forgotPassword}>
                  {i18n.t("login.buttons.forgotPassword")}
                </Link>
              </Typography>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                {i18n.t("login.buttons.loginSubmit")}
                {loading && (
                  <div style={{ 
                    width: 16, 
                    height: 16, 
                    border: "2px solid rgba(255,255,255,0.3)",
                    borderTop: "2px solid white",
                    borderRadius: "50%",
                    marginLeft: 8,
                    animation: "spin 1s linear infinite"
                  }}></div>
                )}
                {!loading && <ArrowForwardIos style={{ fontSize: 12, marginLeft: 8 }} />}
              </Button>
              
              <Typography className={classes.registerText} align="center">
                {i18n.t("login.info.register")}{" "}
                <Link
                  component={RouterLink}
                  to="/signup"
                  className={classes.link}
                >
                  {i18n.t("login.buttons.register")}
                </Link>
              </Typography>
            </form>
          </CardContent>
        </Card>
        <Box mt={5}>
          <Typography variant="caption" align="center" style={{ color: "#FFCC33", display: "block" }}>
            Copyright © Whaticket {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
