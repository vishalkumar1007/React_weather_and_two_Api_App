import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
// import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import SearchWithOptions from './SearchWithOptions'

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.20),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '32ch',
      '&:focus': {
        width: '40ch',
      },
    },
  },
}));

export default function SearchBar({API, BgColor, NavValue, onValueChange, onClickValue, SearchPlaceholder,userFinalInput }) {
  const [searchValue, setSearchValue] = useState('');
  const [finalInput, setFinalInput] = useState('');

  const userSearch = (val) => {
    setSearchValue(val);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setFinalInput(searchValue);
    }
  };

  useEffect(() => {
    onValueChange(searchValue);
  }, [searchValue, onValueChange]);

  useEffect(() => {
    if (finalInput) {
      onClickValue(finalInput);
    }
  }, [finalInput, onClickValue]);

  const userInput = (val)=>{
    userFinalInput(val);
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ bgcolor: BgColor }}>
          <IconButton edge="start" color="inherit" aria-label="open drawer" sx={{ mr: -0.5 }}></IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
            {NavValue}
          </Typography>
          {
          API==='DogAPI' ? (
            <SearchWithOptions BgColor={BgColor} SearchPlaceholder={SearchPlaceholder} userFinalInput = {userInput}/> 
          ) : (
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder={SearchPlaceholder}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(event) => userSearch(event.target.value)}
                onKeyDown={handleKeyDown}
              />
            </Search>
          )
        }
        </Toolbar>
      </AppBar>
    </Box>
  );
}