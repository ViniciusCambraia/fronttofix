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
  card: {
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: 12,
    background: "rgba(255, 255, 255, 0.95)",
    backdropFilter: "blur(10px)",
    border: "none",
    width: "100%",
    overflow: "visible",
    transition: "all 0.3s ease",
    "&:hover": {
      boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)"
    }
  },
  cardContent: {
    padding: theme.spacing(5)
  },
  logoContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: theme.spacing(3),
    gap: theme.spacing(1)
  },
  logoBox: {
    width: 40,
    height: 40,
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  logoInner: {
    width: 20,
    height: 20,
    background: "white",
    borderRadius: 4
  },
  logoText: {
    fontWeight: 700,
    fontSize: "1.5rem",
    color: theme.palette.text.primary
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(2)
  },
  labelText: {
    fontSize: "0.875rem",
    fontWeight: 500,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(0.5)
  },
  inputContainer: {
    position: "relative",
    marginBottom: theme.spacing(2)
  },
  inputRoot: {
    borderRadius: 8,
    borderColor: theme.palette.primary.light,
    transition: "all 0.3s ease",
    height: 48,
    "&:hover": {
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
    }
  },
  inputFocused: {
    boxShadow: `0 3px 12px rgba(${theme.palette.primary.main}, 0.15)`,
    borderColor: theme.palette.primary.main
  },
  inputIcon: {
    color: theme.palette.primary.main
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    background: `linear-gradient(to right, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
    boxShadow: `0 4px 15px rgba(${theme.palette.primary.main}, 0.3)`,
    borderRadius: 8,
    height: 48,
    transition: "all 0.3s ease",
    fontWeight: 600,
    "&:hover": {
      boxShadow: `0 6px 20px rgba(${theme.palette.primary.main}, 0.4)`,
      transform: "translateY(-2px)"
    }
  },
  checkboxLabel: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary
  },
  checkbox: {
    color: theme.palette.primary.main,
    "&.Mui-checked": {
      color: theme.palette.primary.main
    }
  },
  forgotPassword: {
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: "0.875rem",
    textDecoration: "none",
    transition: "all 0.3s ease",
    "&:hover": {
      color: theme.palette.primary.dark,
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
    marginTop: theme.spacing(3),
    color: theme.palette.text.secondary,
    fontSize: "0.875rem"
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

  const handleOpenMenu = e => {
    setAnchorEl(e.currentTarget);
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
      <div className={classes.languageControl}>
        <IconButton
          className={classes.languageButton}
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
          PaperProps={{
            style: {
              borderRadius: 8,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            },
          }}
        >
          <LanguageControl />
        </Menu>
      </div>
      
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <div className={classes.logoContainer}>
              <div className={classes.logoBox}>
                <div className={classes.logoInner}></div>
              </div>
              <Typography component="h1" variant="h5" className={classes.logoText}>
                WhatSpark
              </Typography>
            </div>
            
            <Typography variant="body2" style={{ marginBottom: 16 }}>
              {i18n.t("login.title")}
            </Typography>
            
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
                  placeholder={i18n.t("login.form.email")}
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
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  placeholder="••••••••"
                />
              </div>
              
              <Grid container alignItems="center" justifyContent="space-between">
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value="remember"
                        color="primary"
                        checked={rememberMe}
                        onChange={handleRememberMe}
                        className={classes.checkbox}
                      />
                    }
                    label={i18n.t("login.form.rememberme")}
                    className={classes.checkboxLabel}
                  />
                </Grid>
                <Grid item>
                  <Link href="#" className={classes.forgotPassword}>
                    {i18n.t("login.buttons.forgotPassword")}
                  </Link>
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={loading}
              >
                {loading ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ 
                      width: 16, 
                      height: 16, 
                      border: "2px solid rgba(255,255,255,0.3)",
                      borderTop: "2px solid white",
                      borderRadius: "50%",
                      animation: "spin 1s linear infinite"
                    }}></div>
                    {i18n.t("login.buttons.loginSubmit")}...
                  </div>
                ) : (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    {i18n.t("login.buttons.loginSubmit")}
                    <ArrowForwardIos style={{ fontSize: 12 }} />
                  </div>
                )}
              </Button>
              
              <Typography className={classes.registerText}>
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
        <Box mt={3}>
          <Copyright className={classes.copyright} />
        </Box>
      </Container>
    </div>
  );
};

export default Login;
