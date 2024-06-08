import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

// import List from '@mui/material/List';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import ListItemText from '@mui/material/ListItemText';
// import Avatar from '@mui/material/Avatar';

import SearchBar from './SearchBar';


function JsonAPI({API, JsonBgColor , NavValue , SearchPlaceholder}) {

  const ref = React.useRef(null);
  const [SearchValue,setSearchValue] = React.useState();

  React.useEffect(() => {
    console.log('Json APi',SearchValue)
  }, [SearchValue]);

  const updateSearchValue = (value)=>{
    setSearchValue(value)
  }
  const finalUserInput = (val)=>{
    setSearchValue(val);
  }

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
      <Box sx={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1 }}>
        <SearchBar API={API} NavValue={NavValue} SearchPlaceholder={SearchPlaceholder} BgColor={`${JsonBgColor}`}  onValueChange={updateSearchValue} onClickValue={finalUserInput}/>
      </Box>
      <Box sx={{ marginTop: '55px' }}>
        <CssBaseline  style={{ position: 'fixed' }} />
        
      </Box>
    </Box>
  );
}

export default JsonAPI;