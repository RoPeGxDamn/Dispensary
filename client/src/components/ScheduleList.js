import React, {useContext, useState, useEffect} from 'react';
import {List, Paper} from '@material-ui/core';
import {TicketItem} from './TicketItem'
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { fetchVisits } from '../http/visitAPI';

export const ScheduleList = observer(() => {
    const {entity} = useContext(Context)

    useEffect(() => {
        fetchVisits().then(data => {
             xgfdstr546
        })
    }, [])
  return (
    <List>
        {tickets.map((item) => <TicketItem ticket={item} key={item.id}/>)}
    </List>

  );
})
