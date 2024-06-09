import * as React from "react";
import { useState, useEffect } from "react";

import { Box, Button } from "@mui/material";
import JsonAPI from "./components/JsonAPI";
import WetherAPI from "./components/WetherAPI";
import DogAPI from './components/DogAPI';

function App() {
  const [tab, setTab] = useState(1);
  const [bgColor1, setBgColor1] = useState("");
  const [bgColor2, setBgColor2] = useState("");
  const [bgColor3, setBgColor3] = useState("");

  const handleTabChange = (tabNumber) => {
    localStorage.setItem('tab_no', tabNumber);
    setTab(tabNumber);
  };

  useEffect(() => {
    const localTab = parseInt(localStorage.getItem('tab_no'));
    if (localTab) {
      setTab(localTab);
    }
  }, []);

  useEffect(() => {
    switch (tab) {
      case 1:
        setBgColor1("#02284c78");
        setBgColor2("");
        setBgColor3("");
        break;
      case 2:
        setBgColor1("");
        setBgColor2("#09250c9c");
        setBgColor3("");
        break;
      case 3:
        setBgColor1("");
        setBgColor2("");
        setBgColor3("#270b2cab");
        break;
      default:
        break;
    }
  }, [tab]);

  const ShowTabData = () => {
    const localTab = parseInt(localStorage.getItem('tab_no'), 10);
    switch (localTab) {
      case 1:
        return <JsonAPI API={'JsonAPI'} JsonBgColor={'#001327'} NavValue={'User Data'} SearchPlaceholder={'Filter User ...'}/>;
      case 2:
        return <WetherAPI API={'WetherAPI'} WetherBgcolor={"#001002"} NavValue={'Wether Data'} SearchPlaceholder={'Search Location ...'}/>;
      case 3:
        return <DogAPI API={'DogAPI'} DogBgColor={"#18001c"} NavValue={'Dog Img'} SearchPlaceholder={'Search Dog Breed ...'}/>;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#101010",
        width: "100vw",
        height: "100dvh",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "92%",
          overflow: "scroll",
          "&::-webkit-scrollbar": {
            width: "0px",
            height: "0px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "transparent",
          },
          scrollbarWidth: "none",
          color: "white",
          display: "flex",
          justifyContent: "center",
          "@media (max-width: 375px)": {
            height: "87%",
          },
        }}
      >
        <Box sx={{ maxWidth: "850px",width:'100%', height: "87%", position:'fixed',marginTop:'70px'}}>
          {ShowTabData()}
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "8%",
          display: "flex",
          justifyContent: "center",
          alignItems: "top",
          paddingTop: "30px",
          "@media (max-width: 375px)": {
            height: "13%",
            alignItems: "center",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "end",
            gap: "8%",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            sx={{ color: "#499bed", bgcolor: bgColor1 }}
            onClick={() => handleTabChange(1)}
          >
            User API
          </Button>
          <Button
            variant="outlined"
            color="success"
            sx={{ color: "#42b648", bgcolor: bgColor2 }}
            onClick={() => handleTabChange(2)}
          >
            Weather API
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            sx={{ color: "#ca32e4", bgcolor: bgColor3 }}
            onClick={() => handleTabChange(3)}
          >
            Dog API
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
