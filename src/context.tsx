import { createContext, useContext, type ReactNode } from 'react';
import ScheduleStore from './store/scheduleStore';
import UserStore from './store/userStore';

export interface AppContext {
    schedules: ScheduleStore;
    user: UserStore;
}

export const Context = createContext<AppContext | null>(null);

const scheduleStore = new ScheduleStore();
const userStore = new UserStore();

export const useAppContext = (): AppContext => {
    const ctx = useContext(Context);
    if (!ctx) throw new Error('Context Error');
    return ctx;
}

export const ContextProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Context.Provider value={{
            schedules: scheduleStore,
            user: userStore
        }}>
            {children}
        </Context.Provider>
    );
};
