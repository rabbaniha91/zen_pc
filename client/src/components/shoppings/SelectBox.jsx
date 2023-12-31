import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { object } from "yup";

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

const SelectBox = ({ list, title, name, onBlur, onChange, value, error }) => {
  const [noun, setNoun] = useState("");
  const [id, setId] = useState("");
  useEffect(() => {
    if (list?.length > 0) {
      setNoun(Object.keys(list[0])[0]);
      setId(Object.keys(list[0])[1]);
    }
  }, [list]);


  return (
    <>
      <ThemeProvider theme={theme}>
        <Box defaultValue={""} sx={{ minWidth: 400 }}>
          <FormControl fullWidth>
            <InputLabel
              sx={{
                color: "#fff",
              }}
              id="demo-simple-select-label"
            >
              {title}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              name={name}
              onBlur={onBlur}
              label={title}
              onChange={onChange}
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
            >
              {name &&
                id &&
                list?.length > 0 &&
                list?.map((item) => (
                  <MenuItem
                    key={item[id]}
                    value={item[id]}
                  >
                    {item[noun]}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default SelectBox;
