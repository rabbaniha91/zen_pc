import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: " Vazirmatn, Nunito, sans-serif",
  },
  palette: {
    primary: {
      main: "#1db954",
    },
    mode: "dark",
  },
});

const InputFiled = ({ title, name, onBlur, onChange, value, error }) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minWidth: 400 }} noValidate autoComplete="off">
        <FormControl fullWidth>
          <TextField
            name={name}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            id="outlined-basic"
            label={title}
            variant="outlined"
            error={error}
            sx={{
              "& .MuiSelect-select": {
                background: "linear-gradient(145deg, #171212, #1b1515)",
                boxShadow: "12px 12px 24px #0a0808, -12px -12px 24px #282020",
                color: "white",
                "&:focus": {
                  outline: "none",
                },
              },
            }}
          />
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default InputFiled;
