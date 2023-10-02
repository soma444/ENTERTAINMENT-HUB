import * as React from 'react';
import { useEffect } from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import TvIcon from '@mui/icons-material/Tv';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';

import WhatshotIcon from '@mui/icons-material/Whatshot';
import { useNavigate } from "react-router-dom";

const RootBox = styled(Box)({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  backgroundColor: '#2d313a', // Set the background color to black
  zIndex: 100,
});

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) {
      navigate("/");
    } else if (value === 1) {
      navigate("/movies");
    } else if (value === 2) {
      navigate("/series");
    } else if (value === 3) {
      navigate("/search");
    }
  }, [value, navigate]);

  return (
    <RootBox>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{ backgroundColor: 'black' }} // Set the background color to black
      >
        <BottomNavigationAction
          style={{ color: "white" }} // Set the icon color to white
          label="Trending"
          icon={<WhatshotIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }} // Set the icon color to white
          label="Movies"
          icon={<MovieIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }} // Set the icon color to white
          label="TV Series"
          icon={<TvIcon />}
        />
        <BottomNavigationAction
          style={{ color: "white" }} // Set the icon color to white
          label="Search"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </RootBox>
  );
}



