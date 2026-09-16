import { createContext, useContext, type ReactNode } from 'react';
import ScheduleStore from './store/scheduleStore';

export interface AppContext {
    schedules: ScheduleStore;
}

export const Context = createContext<AppContext | null>(null);

export const useAppContext = (): AppContext => {
    const ctx = useContext(Context);
    if (!ctx) throw new Error('Context Error');
    return ctx;
}

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Context.Provider value={{
            schedules: new ScheduleStore()
        }}>
            {children}
        </Context.Provider>
    );
};
