import React, {useContext, useState, useEffect} from 'react';
import {Box, List, Paper} from '@material-ui/core';
import {TicketItem} from './TicketItem'
import { observer } from 'mobx-react-lite';

export const TicketList = observer(({tickets}) => {
  return (
    <List style={{minHeight: '300px'}}>
        {tickets.length === 0 ? (<Box style={{width: '100%', height: '300px', textAlign: 'center', letterSpacing: '2px', paddingTop: '130px'}}>Заказанных талонов нет</Box>) : (<></>)}
        {tickets.map((item) => <TicketItem ticket={item} key={item.id}/>)}
    </List>
  );
})
