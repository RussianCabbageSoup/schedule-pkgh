import { createContext } from 'react';
import ScheduleStore from './store/scheduleStore';

const scheduleStore = new ScheduleStore();

export const Context = createContext(null);

export const ContextProvider = ({ children }) => {
    return (
        <Context.Provider value={{
            schedules: scheduleStore
        }}>
            {children}
        </Context.Provider>
    );
};
