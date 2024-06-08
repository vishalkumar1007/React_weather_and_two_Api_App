import React, { useEffect, useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, CssBaseline } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import axios from 'axios';

const Search = styled('div')(({ theme }) => ({
  width: '40%',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.20),
  },
  marginLeft: 0,
  marginRight:'50px',
  '@media (max-width: 600px)': {
    marginRight:'0px',
    width: '100%',
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  left: '7px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(TextField)(({ theme }) => ({
  color: 'white',
  width: '100%',
  '& .MuiInputBase-root': {
    color: 'white',
    height: '40px'
  },
  '& .MuiOutlinedInput-root': {
    padding: theme.spacing(0, 0, 0, 0),
    paddingLeft: `calc(1em + ${theme.spacing(0)})`,
    transition: theme.transitions.create('width'),
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),

      [theme.breakpoints.up('sm')]: {
        width: '32ch',
        '&:focus': {
          width: '70ch',
        },
      },
    },
  },
}));

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiAutocomplete-popup .MuiAutocomplete-listbox': {
    backgroundColor: 'black', 
  },
}));


function SearchWithOptions({ NavValue, SearchPlaceholder, BgColor, userFinalInput }) {
  const [BreedData, setBreedData] = useState([{ label: 'Nodata' }]);
  const [inputValue, setInputValue] = useState('');

  const fetchBreedData = () => {
    const BreedAPI = 'https://api.thecatapi.com/v1/breeds?api_key=live_5Rqq5v1Tfftx6wUxpK7iwFINZf9tFJ42gLvMkcm4Smb3flq359gRBF2Ce4rcHuc2';
    axios
      .get(BreedAPI)
      .then((response) => {
        const breedData = response.data.map(element => ({ label: element.id }));
        setBreedData(breedData);
      })
      .catch((error) => {
        if (error.response) {
          console.error(`HTTP error: ${error.response.status}`);
        } else if (error.request) {
          console.error("Request error: No response received");
        } else {
          console.error("Error:", error.message);
        }
      });
  };

  useEffect(() => {
    fetchBreedData();
  }, []);

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
  };

  useEffect(() => {
    const checkInputValid = (inputValue) => {
      const isValid = BreedData.some(ele => inputValue === ele.label);
        return isValid;
    };

    if (inputValue && checkInputValid(inputValue)) {
      userFinalInput(inputValue);
    }
  }, [inputValue, BreedData, userFinalInput]);

  return (
    <Box sx={{ flexGrow: 1, bgcolor: 'red' }}>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: BgColor }}>
          <IconButton edge="start" color="inherit" aria-label="open drawer" sx={{ mr: -0.5 }}></IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            {NavValue}
          </Typography>
          <Search>
            <CssBaseline />
            <Box sx={{ paddingLeft: '35px' }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledAutocomplete
                freeSolo
                options={BreedData.map(option => option.label)}
                value={inputValue}
                onInputChange={handleInputChange}
                renderInput={(params) => (
                  <StyledInputBase
                    {...params}
                    placeholder={SearchPlaceholder}
                    inputProps={{ ...params.inputProps, 'aria-label': 'search' }}
                  />
                )}
              />
            </Box>
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


export default SearchWithOptions;

