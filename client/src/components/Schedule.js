import React, {useContext, useState, useEffect} from 'react';
import {List} from '@material-ui/core';
import { ScheduleItem } from './ScheduleItem'
import { observer } from 'mobx-react-lite';
import { Context } from '../index'

export const Schedule = observer(() => {
  const { entity } = useContext(Context)
  return (
    <>
      <List style={{height: '70%', overflowY: 'scroll'}}>
      {entity.visits.map((item) => <ScheduleItem visit={item} key={item.id}/>)}
    </List>
    </>
  );
})
