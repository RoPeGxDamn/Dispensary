import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthStore from './store/AuthStore';
import EntityStore from './store/EntityStore'
import DataGridStore from './store/DataGridStore'
import TicketStore from './store/TicketStore'
import ProfileStore from './store/ProfileStore'
import BasketStore from './store/BasketStore'
import ScheduleStore from './store/ScheduleStore'
import AdminStore from './store/AdminStore'
import PopupStore from './store/PopupStore';
import SearchStore from './store/SearchStore';

export const Context = createContext(null)

ReactDOM.render(
  <Context.Provider value={{
    auth: new AuthStore(),
    entity: new EntityStore(),
    table: new DataGridStore(),
    ticket: new TicketStore(),
    profile: new ProfileStore(),
    basket: new BasketStore(),
    schedule: new ScheduleStore(),
    admin: new AdminStore(),
    popup: new PopupStore(),
    search: new SearchStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);
