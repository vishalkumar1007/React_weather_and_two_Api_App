import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { styled } from '@mui/system';
import SearchBar from './SearchBar';
import axios from 'axios';
import { useEffect, useState } from 'react';
import nodataImage from '../img/nodata.svg';

function DogAPI({ API, DogBgColor, NavValue, SearchPlaceholder }) {
  const [SearchValue, setSearchValue] = useState('');
  const [DogApiData, setDogApiData] = useState('no data');

  useEffect(() => {
    if (SearchValue !== '') {
      const fetchBreedData = async () => {
        console.log("value :", SearchValue);
        const DogAPI = `https://api.thecatapi.com/v1/images/search?limit=10&breed_ids=${SearchValue}&api_key=live_5Rqq5v1Tfftx6wUxpK7iwFINZf9tFJ42gLvMkcm4Smb3flq359gRBF2Ce4rcHuc2`;
        await axios
          .get(DogAPI)
          .then((response) => {
            const dogData = response.data.map(element => ({ url: element.url })); // Corrected this line
            setDogApiData(dogData);
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
      fetchBreedData();
    }
  }, [SearchValue]);

  const updateSearchValue = (value) => {
    setSearchValue(value);
  };

  const finalUserInput = (val) => {
    setSearchValue(val);
    console.log('this is dogAPi : ', val);
  };

  return (
    <Box sx={{ pb: 7 }}>
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1 }}>
        <SearchBar API={API} NavValue={NavValue} SearchPlaceholder={SearchPlaceholder} BgColor={`${DogBgColor}`} onValueChange={updateSearchValue} onClickValue={finalUserInput} userFinalInput={finalUserInput} />
      </Box>
      <CssBaseline />
      <Box sx={{
        position: 'absolute', top: 110, left: 0, width: '100%',
        '@media (max-width: 600px)': {
          top: 200,
        }
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '10px', boxSizing: 'border-box' }}>
          <DogCard>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {DogApiData === 'no data' ? (
                <Box sx={{ width: '400px', height: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
                  <img src={nodataImage} alt="No Dog images, search please" />
                </Box>
              ) : (DogApiData.map((element, index) => (
                <SmallCard key={index} sx={{ boxShadow: '0px 0px 15px #140018' }}>
                  <img src={element.url} alt={`Dog ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px' }} />
                </SmallCard>

              )))}
            </Box>
          </DogCard>
        </Box>
      </Box>
    </Box>
  );
}

// DogCard styled component
const DogCard = styled('div')({
  background: 'linear-gradient(50deg, #32013aab, #35043d, #32013aab)',
  padding: '1rem',
  borderRadius: '1.5rem',
  maxWidth: '650px',
  height: '436px', // Adjust the height as needed
  margin: '10px', // Add margin for shadow space
  color: 'white',
  overflow: 'auto', // Enables scrolling
  scrollbarWidth: 'none', // Firefox
  '-ms-overflow-style': 'none', // Internet Explorer 10+
  '&::-webkit-scrollbar': {
    display: 'none', // Safari and Chrome
  },
  boxShadow: '0px 0px 15px #90989285',
});

// SmallCard styled component
const SmallCard = styled('div')({
  width: '180px',
  height: '180px',
  backgroundColor: '#5e006ef7',
  margin: '12px 5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
});

// Icons

export default DogAPI;
