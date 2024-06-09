import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { Input as BaseInput } from '@mui/base/Input';
import { styled } from '@mui/system';
import SearchBar from './SearchBar';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Typography } from '@mui/material';



function JsonAPI({ API, JsonBgColor, NavValue, SearchPlaceholder }) {

  const ref = useRef(null);
  const [searchValue, setSearchValue] = useState('');
  const [limit, setLimit] = useState(5);
  const [userApiData, setUserApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (searchValue === '') {
      setFilteredData(userApiData);
    } else {
      const filtered = userApiData.filter(user =>
        user.firstName.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchValue.toLowerCase()) ||
        user.email.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchValue, userApiData]);

  useEffect(() => {
    const fetchUserData = async (limit) => {
      const userAPI = `https://dummyjson.com/users?limit=${limit}`;
      try {
        const response = await axios.get(userAPI);
        setUserApiData(response.data.users);
        setFilteredData(response.data.users);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserData(limit);
  }, [limit]);

  const handleInput = (e) => {
    const value = e.target.value;
    if (value && value < 0) {
      e.target.value = 0;
    } else if (value && value > 100) {
      e.target.value = 100;
    }
  };
  return (
    <Box sx={{ pb: 7, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'end' }} ref={ref}>
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1 }}>
        <SearchBar API={API} NavValue={NavValue} SearchPlaceholder={SearchPlaceholder} BgColor={`${JsonBgColor}`} onValueChange={setSearchValue} onClickValue={setSearchValue} />
      </Box>
      <Box sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CssBaseline style={{ position: 'fixed' }} />
        <Box sx={{
          bgcolor: '#000a15', width: '90%', maxWidth: '550px', height: '86%', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '20px', borderRadius: '15px', flexDirection: 'column', overflow: 'hidden',
          '@media (max-width: 600px)': {
            top: 40,
            height: '85.5%',
            overflow: 'scroll',
          },
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          boxShadow: '0px 0px 15px #90989285',
        }}>
          <Box sx={{ width: '100%', height: '7%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <Box sx={{ paddingLeft: '20px', color: '#cfcfcf' }}> <Typography>User</Typography> </Box>
            <Box sx={{ color: '#cfcfcf' }}><Typography>Contact</Typography> </Box>
          </Box>
          <Box sx={{ height: '0.5px', width: '95%', bgcolor: '#1f2839', marginBottom: '3px' }}></Box>
          <Box sx={{
            width: '100%', height: '93%', display: 'flex', flexDirection: 'column', gap: '25px', overflowY: 'auto',
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            padding: '20px 0px',
            alignItems: 'center',
          }}>
            {filteredData.slice(0, limit).map((userData, index) => (
              <Box key={index} sx={UserCardMainStyle}>
                <Box sx={UserBoxStyle}>
                  <Box sx={UserImgStyle}>
                    <Box sx={UserImage}>
                      <img src={userData.image} alt="img" style={UserImage} />
                    </Box>
                  </Box>
                  <Box sx={UserDetailStyle}>
                    <Box sx={DetailStyle}>
                      <Typography sx={{ fontSize: '23px' }}>{userData.firstName} {userData.lastName}</Typography>
                    </Box>
                    <Box sx={DetailStyle}>
                      <Typography sx={{ fontSize: '13px', color: 'gray' }}>{userData.gender} | {userData.age} year</Typography>
                    </Box>
                  </Box>
                </Box>
                <Box sx={ContactBoxStyle}>
                  <Box sx={UserContactStyle}>
                    <Box sx={ContactStyle}>
                      <Typography sx={{ fontSize: '14px' }}>
                        {userData.email}
                      </Typography>
                    </Box>
                    <Box sx={ContactStyle}>
                      <Typography sx={{ fontSize: '12px', color: 'gray' }}>{userData.phone}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: '80px', height: '35px', position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Input type="number" aria-label="Demo input" placeholder="Limit." min="0" max="100" onInput={handleInput} onChange={(event) => setLimit(event.target.value)} />
      </Box>
    </Box>
  );
}


const Input = React.forwardRef(function CustomInput(props, ref) {
  return <BaseInput slots={{ input: InputElement }} {...props} ref={ref} />;
});


const InputElement = styled('input')(
  ({ theme }) => `
  width: 70px;
  // height:32px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
  padding: 6px 19px;
  border-radius: 8px;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background-color:#39404375;
  border: 1px solid gray;
  backdrop-filter: blur(20px);
  color:#bbbbbb;
  display: flex;
  flexDirection: column;
  justifyContent: center;
  &:hover {
    border-color: ${blue[400]};
  }

  &:focus {
    border-color: ${blue[400]};
    box-shadow: 0 0 0 1px #1976d2;
  }

  &:focus-visible {
    outline: 0;
  }
     &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display:none;
  }
`
);


const UserCardMainStyle = {
  width: '97%',
  height: '100px',
  bgcolor: '#0028524d',
  display: 'flex',
  gap: '5px',
  padding: '0px 10px',
  borderRadius: '15px',
  boxSizing: 'border-box',
  justifyContent: 'space-between',
};

const UserBoxStyle = {
  width: '55%',
  height: '100px',
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  boxSizing: 'border-box',
};

const UserImgStyle = {
  width: '30%',
  paddingBottom: '30%',
  position: 'relative',
  overflow: 'hidden',
  boxSizing: 'border-box',
};

const UserImage = {
  width: '100%',
  height: '100%',
  backgroundColor: 'gray',
  borderRadius: '50%',
  position: 'absolute',
  top: 0,
  left: 0,
  objectFit: 'cover',
  boxSizing: 'border-box',
  overflow:'hidden'
};

const UserDetailStyle = {
  width: '60%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'border-box',
};

const ContactBoxStyle = {
  width: '40%',
  height: '100px',
  boxSizing: 'border-box',
};

const DetailStyle = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: '100%',
  boxSizing: 'border-box',
};

const UserContactStyle = {
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxSizing: 'border-box',
};

const ContactStyle = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  width: '100%',
  boxSizing: 'border-box',
};


const blue = {
  100: '#DAECFF',
  200: '#80BFFF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};


export default JsonAPI;