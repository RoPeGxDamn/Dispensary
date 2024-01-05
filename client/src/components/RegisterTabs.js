import React, {useState} from 'react'
import {Tabs, Tab, Paper,Box, Typography } from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {PatientSignUp} from '../pages/PUBLIC/PatientSignUp'
import {SpecialistSignUp} from '../pages/PUBLIC/SpecialistSignUp'

function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
      >
        {value === index && (
          <Box p={2}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
    },
  }));

export const RegisterTabs = () => {
    const classes = useStyles()
    const [selectedTab, setSelectedTab] = useState(0)

    const handleChange = (event, newValue) => {
        if(event === 'clickaway') {
            return
        }
        setSelectedTab(newValue)
    }
    return (
        <div className={classes.root}>
            <Paper>
                <Tabs centered variant="fullWidth" value={selectedTab} onChange={handleChange}>
                    <Tab label="Пациент"/>
                    <Tab label="Специалист"/>
                </Tabs>
            </Paper>
            <TabPanel value={selectedTab} index={0}>
                <PatientSignUp/>
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                <SpecialistSignUp/>
            </TabPanel>
        </div>
    )
} 
