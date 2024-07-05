import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import { useState } from "react";

export default function SortData({ showData, setDataShown }) {
  const [sort, setSort] = useState("");

  function handleSort(arg) {
    let sortData = [...showData];

    if (arg === "ASC") {
      sortData.sort((a, b) => {
        return a.id - b.id;
      });
    } else if (arg === "DSC") {
      sortData.sort((a, b) => {
        return a.id - b.id;
      });
      sortData.reverse();
    }

    setDataShown(sortData);
    setSort(arg);
  }

  return (
    <Box sx={{ display: "flex", justifyContent: { md: "flex-end", sx: "flex-start" } }}>
      <Box sx={{ width: { lg: "50%", xs: "100%" } }}>
        <FormControl sx={{ width: "100%" }}>
          <TextField
            select
            label="Sort by Id"
            id="demo-simple-select"
            value={sort}
            onChange={(e) => handleSort(e.target.value)}
          >
            <MenuItem value="ASC">Ascending</MenuItem>
            <MenuItem value="DSC">Descending</MenuItem>
          </TextField>
        </FormControl>
      </Box>
    </Box>
  );
}
