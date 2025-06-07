import { createTheme } from "@material-ui/core/styles";

// Função para criar um tema personalizado com base no modo (claro/escuro) e localização
const createAppTheme = (mode, locale) => {
  return createTheme(
    {
      palette: {
        type: mode,
        mode: mode,
        primary: {
          main: "#fbcc3c",
          light: "#ffdf6f",
          dark: "#e0b035",
          contrastText: "#333333"
        },
        secondary: {
          main: "#4a6da7",
          light: "#6b8fd9",
          dark: "#2a4d77",
          contrastText: "#ffffff"
        },
        error: {
          main: "#f44336",
          light: "#e57373",
          dark: "#d32f2f"
        },
        warning: {
          main: "#ff9800",
          light: "#ffb74d",
          dark: "#f57c00"
        },
        info: {
          main: "#2196f3",
          light: "#64b5f6",
          dark: "#1976d2"
        },
        success: {
          main: "#4caf50",
          light: "#81c784",
          dark: "#388e3c"
        },
        background: {
          default: mode === "light" ? "#f8f9fa" : "#121212",
          paper: mode === "light" ? "#ffffff" : "#1e1e1e",
        },
        text: {
          primary: mode === "light" ? "#333333" : "#ffffff",
          secondary: mode === "light" ? "#666666" : "#b0b0b0",
        },
        // Cores personalizadas para a aplicação
        textPrimary: mode === "light" ? "#333333" : "#ffffff",
        borderPrimary: mode === "light" ? "#fbcc3c" : "#fbcc3c",
        dark: { main: mode === "light" ? "#333333" : "#f0f0f0" },
        light: { main: mode === "light" ? "#f9f9f9" : "#1a1a1a" },
        tabHeaderBackground: mode === "light" ? "#f8f9fa" : "#2a2a2a",
        optionsBackground: mode === "light" ? "#ffffff" : "#2c2c2c",
        options: mode === "light" ? "#ffffff" : "#2c2c2c",
        fontecor: mode === "light" ? "#fbcc3c" : "#fbcc3c",
        fancyBackground: mode === "light" ? "#f8f9fa" : "#1e1e1e",
        bordabox: mode === "light" ? "#e6e8eb" : "#444",
        newmessagebox: mode === "light" ? "#f0f4fa" : "#2e2e2e",
        inputdigita: mode === "light" ? "#ffffff" : "#333333",
        contactdrawer: mode === "light" ? "#ffffff" : "#2a2a2a",
        announcements: mode === "light" ? "#f4f4f4" : "#2e2e2e",
        login: mode === "light" ? "#ffffff" : "#1c1c1c",
        announcementspopover: mode === "light" ? "#ffffff" : "#333333",
        chatlist: mode === "light" ? "#f8f9fa" : "#2b2b2b",
        boxlist: mode === "light" ? "#f0f2f5" : "#2b2b2b",
        boxchatlist: mode === "light" ? "#f0f2f5" : "#2a2a2a",
        total: mode === "light" ? "#ffffff" : "#1c1c1c",
        messageIcons: mode === "light" ? "#777777" : "#f0f0f0",
        inputBackground: mode === "light" ? "#ffffff" : "#2c2c2c",
        barraSuperior: mode === "light"
          ? "linear-gradient(135deg, #fbcc3c 0%, #ffdf6f 100%)"
          : "#2a2a2a",
        boxticket: mode === "light" ? "#f8f9fa" : "#2e2e2e",
        campaigntab: mode === "light" ? "#f9f9f9" : "#2e2e2e",
        mediainput: mode === "light" ? "#f4f4f4" : "#1c1c1c",
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: {
          fontWeight: 600,
          fontSize: "2.5rem",
        },
        h2: {
          fontWeight: 600,
          fontSize: "2rem",
        },
        h3: {
          fontWeight: 600,
          fontSize: "1.75rem",
        },
        h4: {
          fontWeight: 600,
          fontSize: "1.5rem",
        },
        h5: {
          fontWeight: 600,
          fontSize: "1.25rem",
        },
        h6: {
          fontWeight: 600,
          fontSize: "1rem",
        },
        subtitle1: {
          fontSize: "1rem",
          fontWeight: 500,
        },
        subtitle2: {
          fontSize: "0.875rem",
          fontWeight: 500,
        },
        body1: {
          fontSize: "1rem",
        },
        body2: {
          fontSize: "0.875rem",
        },
        button: {
          textTransform: "none",
          fontWeight: 500,
        },
      },
      shape: {
        borderRadius: 8,
      },
      shadows: [
        "none",
        "0 2px 4px rgba(0,0,0,0.05)",
        "0 4px 8px rgba(0,0,0,0.05)",
        "0 6px 12px rgba(0,0,0,0.08)",
        "0 8px 16px rgba(0,0,0,0.08)",
        "0 12px 24px rgba(0,0,0,0.12)",
        ...Array(19).fill("none"),
      ],
      overrides: {
        MuiButton: {
          root: {
            borderRadius: 8,
            textTransform: "none",
            fontWeight: 500,
            padding: "8px 16px",
          },
          contained: {
            boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
            "&:hover": {
              boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
            },
          },
          containedPrimary: {
            backgroundImage: `linear-gradient(135deg, #fbcc3c 0%, #ffdf6f 100%)`,
            "&:hover": {
              backgroundImage: `linear-gradient(135deg, #e0b035 0%, #fbcc3c 100%)`,
            },
          },
        },
        MuiPaper: {
          rounded: {
            borderRadius: 12,
          },
          elevation1: {
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
          },
          elevation2: {
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          },
          elevation3: {
            boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
          },
        },
        MuiCard: {
          root: {
            borderRadius: 12,
            overflow: "hidden",
          },
        },
        MuiCardHeader: {
          root: {
            padding: "16px 24px",
          },
        },
        MuiCardContent: {
          root: {
            padding: "16px 24px",
            "&:last-child": {
              paddingBottom: 24,
            },
          },
        },
        MuiInputBase: {
          root: {
            borderRadius: 8,
          },
        },
        MuiOutlinedInput: {
          root: {
            borderRadius: 8,
          },
        },
        MuiTableCell: {
          root: {
            padding: "12px 16px",
          },
          head: {
            fontWeight: 600,
            backgroundColor: mode === "light" ? "#f8f9fa" : "#2a2a2a",
          },
        },
        MuiTableRow: {
          root: {
            "&:hover": {
              backgroundColor: mode === "light" ? "rgba(0, 0, 0, 0.02)" : "rgba(255, 255, 255, 0.02)",
            },
          },
        },
        MuiDrawer: {
          paper: {
            borderRight: mode === "light" ? "1px solid rgba(0, 0, 0, 0.08)" : "1px solid rgba(255, 255, 255, 0.08)",
          },
        },
        MuiDivider: {
          root: {
            backgroundColor: mode === "light" ? "rgba(0, 0, 0, 0.08)" : "rgba(255, 255, 255, 0.08)",
          },
        },
        MuiListItem: {
          root: {
            "&$selected": {
              backgroundColor: mode === "light" ? "rgba(251, 204, 60, 0.15)" : "rgba(251, 204, 60, 0.15)",
              "&:hover": {
                backgroundColor: mode === "light" ? "rgba(251, 204, 60, 0.25)" : "rgba(251, 204, 60, 0.25)",
              },
            },
          },
        },
        MuiTab: {
          root: {
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
          },
        },
        MuiChip: {
          root: {
            borderRadius: 16,
          },
        },
      },
    },
    locale
  );
};

export default createAppTheme;
