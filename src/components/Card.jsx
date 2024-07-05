import React from "react";
import Card from "@mui/material/Card";
import CircularProgress from "@mui/material/CircularProgress";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Sorting from "./Sorting";
import SelectedFilters from "./SelectedFilters";

function Cardbox({
  data,
  isLoading,
  showData,
  setDataShown,
  selectedFilters,
  handleState,
}) {
  const font = '"Rubik", sans-serif';
  const [search, setSearch] = useState("");

  const ListPoint = styled(ListItem)(({ theme }) => ({
    padding: theme.spacing(1),
    display: "flex",
    justifyContent: "space-between",
    color: theme.palette.text.secondary,
  }));
  const Heading = styled(Typography)(() => ({
    color: "#c0c0c0",
    textAlign: "start",
  }));
  const HeadingValue = styled(Typography)(() => ({
    color: "#fff",
    textAlign: "end",
    fontSize: { xs: "8px" },
  }));

 

  function handleSearch() {
    let newData = showData.filter((item) => {
      let searchName = item.name;
      return search.toLowerCase().trim() === ""
        ? item
        : searchName.toLowerCase().includes(search);
    });
    setDataShown(newData);
  }
  function handleChange(e) {
    setSearch(e.target.value);
    if (e.target.value === "") setDataShown(data);
  }

  return (
    <>
      <Grid container spacing={2} direction="column">
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            height: "50px",
            width: "100%",
          }}
        >
          <SelectedFilters selectedFilters={selectedFilters} handleState={handleState} />
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { md: "row", xs: "column" },
              margin:"0 25px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "100%",
              }}
            >
              <TextField
                id="outlined-basic"
                variant="outlined"
                onChange={handleChange}
                sx={{
                  width: { lg: "100%", xs: "200%", md: "60%" },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                sx={{
                  bgcolor: "#523b3b",
                  padding: "1rem 2rem",
                  fontSize: "0.8rem",
                  marginLeft: "2px",
                  "&:hover": {
                    backgroundColor: "#606060",
                  },
                }}
              >
                search
              </Button>
            </Box>

            <Box
              sx={{
                width: "100%",
              }}
            >
              <Sorting setDataShown={setDataShown} showData={showData} />
            </Box>
          </Box>
        </Grid>
      </Grid>

      {isLoading && (
        <Box
          sx={{
            minHeight: "100vh",
            fontFamily: `${font}`,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      <Box
        sx={{
          background: "white",
          minHeight: "100vh",
          borderRadius: { md: "1rem", xs: "0px" },
        }}
      >
        <Grid container spacing={{ lg: 1, md: 0.4, xs: 0.5 }} p={2}>
          {showData.length === 0 && (
            <Box
              sx={{
                minHeight: "100vh",
                fontFamily: `${font}`,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{ color: "black", textAlign: "center" }}
              >
                No Records Found.
              </Typography>
            </Box>
          )}
          {showData.length > 0 &&
            showData.map((element) => {
              return (
                <Grid
                  item
                  key={element.id}
                  xs={6}
                  // md={3}
                  md={4}
                  lg={3}
                >
                  <Card
                    sx={{
                      maxWidth: { xs: 400, md: 450 },
                      height: { xs: "500px", md: "500px", lg: "475px" },
                      paddingBottom:'0',
                      borderColor: "grey",
                      borderRadius: "12px",
                      margin:'15px',
                      backgroundColor: "#523b3b",
                      "&:hover": {
                        boxShadow:"0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)"
                  },
                    }}
                  >
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        alt="green iguana"
                        height="250"
                        image={element.image}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          color: "black",
                          bottom: 0,
                          height: "fit-content",
                          backgroundColor: "rgba(0, 0, 0, .6)",
                          width: "100%",
                        }}
                      >
                        <Box sx={{ marginLeft: "10px" }}>
                          <Typography
                            gutterBottom
                            component="div"
                            sx={{
                              color: "white",
                              textAlign: "left",
                              marginTop: "0.5rem",
                              fontFamily: `${font}`,
                              fontSize: "1rem",
                            }}
                          >
                            {element.name}
                          </Typography>
                          
                        </Box>
                      </Box>
                    </Box>
                    <CardContent>
                      <Stack
                        direction="column"
                        spacing={2}
                        divider={
                          <Divider
                            orientation="horizontal"
                            flexItem
                            sx={{ bgcolor: "#a7a7a7" }}
                            
                          />
                        }
                      >
                        
                        <ListPoint>
                          <Heading
                            gutterBottom
                            variant="caption"
                            component="div"
                          >
                            SPECIES
                          </Heading>
                          <HeadingValue
                            variant="caption"
                            color="text.secondary"
                          >
                            {element.species}
                          </HeadingValue>
                        </ListPoint>
                        <ListPoint>
                          <Heading
                            gutterBottom
                            variant="caption"
                            component="div"
                          >
                            GENDER
                          </Heading>
                          <HeadingValue
                            variant="caption"
                            color="text.secondary"
                          >
                            {element.gender}
                          </HeadingValue>
                        </ListPoint>
                        <ListPoint>
                          <Heading
                            gutterBottom
                            variant="caption"
                            component="div"
                          >
                            ORIGIN
                          </Heading>
                          <HeadingValue
                            variant="caption"
                            color="text.secondary"
                          >
                            {element.origin.name}
                          </HeadingValue>
                        </ListPoint>
                        
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
}

export default Cardbox;
