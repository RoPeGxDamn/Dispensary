import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { PatientGrid } from './PatientGrid';
import { SpecialistGrid } from './SpecialistGrid';
import DiagnosisTable from './DiagnosisTable';
import VisitTable from './VisitTable';
import AnnouncementTable from './AnnouncementTable';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '70px 10px 10px 80px',
    flexGrow: 1,
    width: '95%',
    backgroundColor: theme.palette.background.paper,
    height: '600px',
    overflowY: 'scroll'
  },
}));

export default function AdminTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          <Tab label="Пациенты" {...a11yProps(0)} />
          <Tab label="Специалисты" {...a11yProps(1)} />
          <Tab label="Диагнозы" {...a11yProps(2)} />
          <Tab label="Посещения" {...a11yProps(3)} />
          <Tab label="Объявления" {...a11yProps(4)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PatientGrid/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SpecialistGrid/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DiagnosisTable/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <VisitTable/>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <AnnouncementTable/>
      </TabPanel>
    </div>
  );
}