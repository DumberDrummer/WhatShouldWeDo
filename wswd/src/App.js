import React, {  } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import ActivityMaintenance from './Components/ActivityMaintenance/ActivityMaintenance'
import { Tabs, AppBar, Tab, Box } from '@material-ui/core';
import ActivityFinder from './Components/ActivityFinder';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          {children}
        </Box>
      )}
    </div>
  );
} 
const App = () => {
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }
  const [value, setValue] = React.useState(0);
  return (
    <>
      <AppBar position="static">
        <Tabs variant='fullWidth' value={value} onChange={handleTabChange}>
          <Tab label="Find Something"/>
          <Tab label="Add Something"  />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ActivityFinder />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ActivityMaintenance />
      </TabPanel>
    </>
  )
}

export default App;
