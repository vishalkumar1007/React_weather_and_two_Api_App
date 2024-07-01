import React from 'react';
import { Box, CssBaseline, Typography, } from '@mui/material';
import SearchBar from './SearchBar';
import axios from 'axios';
import { styled } from '@mui/system';
import { useState } from 'react';

const WeatherCard = styled('div')({
  backgroundColor: '#6e5ae6',
  padding: '1rem',
  borderRadius: '1.5rem',
  maxWidth: '20rem',
  margin: 'auto',
  color: 'white',
});

const weatherDataDummy = {
  location: {
    name: "Location",
    region: "State",
    country: "Country",
    localtime: "Date | time",
  },
  current: {
    cloud: 'x',
    last_updated: "Date | time",
    temp_c: "T",
    condition: {
      text: "Condition",
    },
    wind_kph: 'z',
    humidity: 'y',
    pressure_mb: 1006.0,
    vis_km: 5.0,
    air_quality: {
      co: "x",
      no2: "y",
      o3: "q",
      so2: "z",
    }
  }
};

const bgColorLight = '#26562a8a'

function WetherAPI({API, WetherBgcolor, NavValue, SearchPlaceholder}) {

  const [SearchValue, setSearchValue] = useState();
  const [finalInputValue, setFinalInputValue] = useState();
  const[wetherData, setWetherData] = useState(weatherDataDummy);


  React.useEffect(() => {
    if(SearchValue!=='' && SearchValue!==undefined){
    }
  }, [SearchValue, finalInputValue]);

  React.useEffect(() => {
    if (finalInputValue !== undefined) {
      fetchData(finalInputValue)
    }
  }, [finalInputValue]);

  const finalInputValuePush = (val) => {
    setFinalInputValue(val);
  }

  const updateSearchValue = (value) => {
    setSearchValue(value);
  }
  const fetchData = (location) => {
    const wetherApi = `http://api.weatherapi.com/v1/current.json?key=45ab987e8ded4202b87135302240606 &q=${location}&aqi=yes`;
    axios
      .get(wetherApi)
      .then((response) => {
        setWetherData(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(`HTTP error : ${error.response.status}`);
          alert(`HTTP error : ${error.response.status}`);
        } else if (error.request) {
          console.error("Request error : No response received");
          alert(`error.request : ${error.request}`);
        } else {
          console.error("Error :", error.message);
          alert(`error.message : ${error.messages}`);
        }
      });

  }

  return (
    <Box sx={{ width:'100%',height:'100%'}}>
      <Box sx={{width:'100%',height:'10%'}}>
        <SearchBar API={API} NavValue={NavValue} SearchPlaceholder={SearchPlaceholder} BgColor={`${WetherBgcolor}`} onValueChange={updateSearchValue} onClickValue={finalInputValuePush} />
      </Box>
      <CssBaseline />
      <Box sx={{width: '100%', height:'90%', display:'flex',justifyContent:'center',alignItems:'center',
      }}>
      <WeatherCard sx={{ width: '90%', maxWidth: '600px' , bgcolor:'#032105a3', boxShadow: '0px 0px 20px #90989285'}}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{wetherData.location.name}</Typography>
          </Box>
          <Typography variant="subtitle1">{wetherData.current.condition.text}</Typography>
          <Box sx={{ display: 'flex', spaceX: 2 }}>
            <Box sx={{display:'flex'}}>
              <Typography variant="h2" sx={{ fontWeight: 'bold' }}>{wetherData.current.temp_c}°</Typography>
              <Typography variant="h5" sx={{alignSelf:'flex-end'}}>C</Typography>
            </Box>
            <Box sx={{ display:'flex', width:'100%', justifyContent:'end', alignItems:'center'}}>
                <Typography sx={{color:'#d7d7d7'}}>{wetherData.location.region} | {wetherData.location.country}</Typography>
            </Box>
          </Box>
          <Typography variant="subtitle1" py={2} sx={{fontWeight:'100'}}>{wetherData.location.localtime}</Typography>
          <Box sx={{ display: 'flex',justifyContent:'space-around', gap:'30px' , overflowX:'scroll' , 
              '&::-webkit-scrollbar': {
                display: 'none',
              },
          }}>
            <WeatherInfo icon={<UmbrellaIcon />} value={`${wetherData.current.cloud}%`} label="Cloud" />
            <WeatherInfo icon={<DropletsIcon />} value={`${wetherData.current.humidity}%`} label="Humidity" />
            <WeatherInfo icon={<WindIcon />} value={`${wetherData.current.wind_kph}km/h`} label="Wind Speed" />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 4 }}>
            <Box sx={{width:'100%', display:'flex', flexDirection:'column', gap:'10px'}} >
              <Typography variant="subtitle1" sx={{fontWeight:'400'}}>Air Quality</Typography>
              <Box sx={{ width:'100%',display: 'flex',justifyContent:'space-between', gap:'60px' , overflowX:'scroll' ,
                '&::-webkit-scrollbar': {
                  display: 'none',
                },
              }} >
                <QualityInfo  value={`AQI ${wetherData.current.air_quality.co}% CO2`} />
                <QualityInfo value={`AQI ${wetherData.current.air_quality.no2}% NO2`} />
                <QualityInfo value={`AQI ${wetherData.current.air_quality.so2}% SO2`} />
                <QualityInfo value={`AQI ${wetherData.current.air_quality.o3}% O2`} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0 }}>
            <Box sx={{width:'100%', display:'flex', flexDirection:'column', gap:'10px'}} >
              <Box>
                <Typography sx={{fontSize:'10px',color:'#d7d7d7'}}>Last update {`: ${wetherData.current.last_updated}`}</Typography>
              </Box>
            </Box>
          </Box>
          
        </WeatherCard>
      </Box>
    </Box>
  );
}


function WeatherInfo({ icon, value, label }) {
  return (
    <Box sx={{bgcolor:`${bgColorLight}`, padding:'10px 10px',borderRadius:'10px', boxSizing:'border-box', textAlign: 'center' , minWidth: '100px' ,maxWidth:'104px'}}>
      {icon}
      <Typography variant="subtitle2" mt={0.5}>{value}</Typography>
      <Typography variant="caption">{label}</Typography>
    </Box>
  );
}

// Quality Info component
function QualityInfo({ label, value }) {
  return (
    <Box sx={{bgcolor:`${bgColorLight}`, padding:' 10px 5px' ,borderRadius:'10px', boxSizing:'border-box', textAlign: 'center' , display:'flex',flexDirection:'column' , alignItems:'center' , gap:'10px' ,minWidth: '80px' ,maxWidth:'84px',
    '@media (max-width: 600px)': {
      maxWidth:'80px'
    }
    }}>
      <Typography variant="subtitle2">{label}</Typography>
      <LeafIcon sx={{display:'flex' , justifyContent:'center'}}/>
      <Typography variant="caption">{value}</Typography>
    </Box>
  );
}

function DropletsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z" />
      <path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}


function UmbrellaIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12a10.06 10.06 1 0 0-20 0Z" />
      <path d="M12 12v8a2 2 0 0 0 4 0" />
      <path d="M12 2v1" />
    </svg>
  );
}

function WindIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
}


export default WetherAPI;