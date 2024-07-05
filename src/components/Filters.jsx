import * as React from "react";
import Box from "@mui/material/Box";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import UnfoldLessIcon from "@mui/icons-material/UnfoldLess";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";

export default function Filters({ state, handleChange }) {
  const font = '"Margarine", sans-serif';
  const MainHeadings = styled(Typography)(() => ({
    fontFamily: font,
    textAlign: "left",
    paddingBottom: "0.5rem",
    paddingTop: "12px",
    marginBottom: "1rem",
    fontSize: "1.5rem",
  }));
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const visibleFilter = open || width > 899;

  return (
    <>
      <Box>
        <Box sx={{ margin: "1rem" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <MainHeadings>Filters</MainHeadings>
            
            <UnfoldLessIcon
              onClick={() => setOpen((prev) => !prev)}
              sx={{
                display: { md: "none", xs: "none" },
                backgroundColor: "black",
                color: "white",
                padding: "0.5rem",
                borderRadius: "15px",
                paddingTop:"50px"
                
              }}
            />
          </Box>
          <Box sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop:"35px"
            }}></Box>
          {visibleFilter ? (
            <>
              <Stack spacing={2} sx={{
                    borderRadius:"5px",
                    background:"#F8F9F9",
                    border: "1px solid #523b3b",
              }}>
                

                <Box
                  sx={{
                    display: "flex",
                    padding: "1rem",
                  }}
                >
                  <FormControl
                    sx={{ textAlign: "left" }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Species</FormLabel>
                    <FormGroup>
                      {Object.keys(state.species).map((i) => {
                        return (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                checked={state.species[i]}
                                onChange={(e) => handleChange("species", i)}
                                name={i}
                              />
                            }
                            label={i}
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    padding: "1rem",
                  }}
                >
                  <FormControl
                    sx={{ textAlign: "left" }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Gender</FormLabel>
                    <FormGroup>
                      {Object.keys(state.gender).map((i) => {
                        return (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                checked={state.gender[i]}
                                onChange={(e) => handleChange("gender", i)}
                                name={i}
                              />
                            }
                            label={i}
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    padding: "1rem",
                  }}
                >
                  <FormControl
                    sx={{ textAlign: "left" }}
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Origin</FormLabel>
                    <FormGroup>
                      {Object.keys(state.origin).map((i) => {
                        return (
                          <FormControlLabel
                            key={i}
                            control={
                              <Checkbox
                                checked={state.origin[i]}
                                onChange={(e) => handleChange("origin", i)}
                                name={i}
                              />
                            }
                            label={
                              <Typography
                                variant="body2"
                                sx={{ wordBreak: "break-word" }}
                              >
                                {i}
                              </Typography>
                            }
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </Box>
                
              </Stack>
            </>
          ) : null}
        </Box>
      </Box>
    </>
  );
}
