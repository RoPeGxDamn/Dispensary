import React from 'react'
import {Dialog, DialogTitle, DialogContent,Typography, IconButton, Box} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import { observer } from 'mobx-react-lite';

export default observer(function Popup(props) {
    
    const {title, children, openPopup, setOpenPopup} = props

    return (
        <Dialog open={openPopup} maxWidth="md">
            <DialogTitle>
                <Box style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Typography variant="h6" component="div">{title}</Typography>
                    <IconButton onClick={setOpenPopup}>
                        <CloseIcon/>
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
})