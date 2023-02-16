import { createContext } from 'react';


interface UiContextProps {
    isSidebarOpen: boolean;
    openSideMenu: () => void;
    closeSideMenu: () => void;
}


export const UiContext = createContext({} as UiContextProps);