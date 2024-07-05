import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "./Card";
import axios from "axios";
import Filters from "./Filters";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';

function Layout() {
  const [data, setData] = useState([]);
  const [showData, setDataShown] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [collectedKey, setCollectedKeys] = useState({});

  const [state, setState] = useState({
    origin: {
      "Earth (C-137)": false,
      unknown: false,
      "Earth (Replacement Dimension)": false,
      Abadango: false,
    },
    species: {
      Human: false,
      Alien: false,
    },
    gender: {
      Male: false,
      Female: false,
      unknown: false,
    },
    status: {
      Alive: false,
      unknown: false,
      Dead: false,
    },
  });

  const handleChange = (identifier, namevalue) => {
    setState((prevState) => ({
      ...prevState,
      [identifier]: {
        ...prevState[identifier],
        [namevalue]: !prevState[identifier][namevalue],
      },
    }));
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://rickandmortyapi.com/api/character/")
      .then((response) => {
        setData(response.data.results);
        setDataShown(response.data.results);
        setIsLoading(false);
      })
      .catch((e) => {
        alert(e.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    function collectSelectedKeys() {
      let collectedTrueKeys = {
        originTrue: [],
        speciesTrue: [],
        genderTrue: [],
        statusTrue: [],
      };
      const { origin, species, gender, status } = state;

      for (let key in origin) {
        if (origin[key]) {
          if (!collectedTrueKeys.originTrue.includes(key)) {
            collectedTrueKeys.originTrue.push(key);
          }
        }
      }

      for (let key in species) {
        if (species[key]) {
          collectedTrueKeys.speciesTrue.push(key);
        }
      }

      for (let key in gender) {
        if (gender[key]) {
          collectedTrueKeys.genderTrue.push(key);
        }
      }

      for (let key in status) {
        if (status[key]) {
          collectedTrueKeys.statusTrue.push(key);
        }
      }

      let { genderTrue, originTrue, speciesTrue, statusTrue } = collectedTrueKeys;
      let filteredData = [...data];

      if (genderTrue.length > 0) {
        filteredData = filteredData.filter((el) =>
          genderTrue.includes(el.gender),
        );
      }

      if (originTrue.length > 0) {
        filteredData = filteredData.filter((el) =>
          originTrue.includes(el.origin.name),
        );
      }

      if (speciesTrue.length > 0) {
        filteredData = filteredData.filter((el) =>
          speciesTrue.includes(el.species),
        );
      }

      if (statusTrue.length > 0) {
        filteredData = filteredData.filter((el) =>
          statusTrue.includes(el.status),
        );
      }

      setDataShown(filteredData);
      setCollectedKeys(collectedTrueKeys);
    }

    collectSelectedKeys();
  }, [state, data]);

  return (
    <Box>
      <Box >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ color: 'black', textAlign: 'center', flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              RICK AND MORTY SHOW
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container direction="row">
        <Grid item xs={12} md={2}>
          <Filters state={state} handleChange={handleChange} />
        </Grid>
        <Grid item xs={12} md={10} sx={{ height: "100vh" }}>
          <Card
            data={data}
            isLoading={isLoading}
            showData={showData}
            setDataShown={setDataShown}
            state={state}
            selectedFilters={collectedKey}
            handleState={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Layout;
