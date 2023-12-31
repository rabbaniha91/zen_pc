import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme({
  typography: {
    fontFamily: " Vazirmatn, Nunito, sans-serif",
  },
});



const SortProducts = () => {
  const [sortSelect, setSortSelect] = React.useState("پیش فرض");

  const handleChange = (event) => {
    setSortSelect(event.target.value);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box defaultValue={sortSelect} sx={{ minWidth: 150 }}>
        <FormControl fullWidth>
          <InputLabel
            sx={{
              color: "#fff",
            }}
            id="demo-simple-select-label"
          >
            مرتب سازی
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sortSelect}
            label="مرتب سازی"
            onChange={handleChange}
            sx={{
              "& .MuiSelect-select": {
                backgroundColor: "#191414", // تغییر رنگ پس زمینه
                color: "white", // تغییر رنگ متن
                "&:focus": {
                  outline: "none", // حذف outline در حالت focus
                },
              },
            }}
          >
            <MenuItem className="menu-item" value={`پیش فرض`}>
              پیش فرض
            </MenuItem>
            <MenuItem className="menu-item" value={`گران تر`}>
              گران تر
            </MenuItem>
            <MenuItem className="menu-item" value={`ارزان تر`}>
              ارزان تر
            </MenuItem>
            <MenuItem className="menu-item" value={`محبوب تر`}>
              محبوب تر
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </ThemeProvider>
  );
};

export default SortProducts;
