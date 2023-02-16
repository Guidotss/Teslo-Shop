import { FC, useReducer } from 'react';
import { UiContext,uiReducer } from './';

export interface UIProviderProps {
    children: React.ReactNode;
}

export interface UiState {
    isSidebarOpen: boolean;
}

const UI_INITIAL_STATE: UiState = {
    isSidebarOpen: false,
}

export const UiProvider: FC<UIProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

    const openSideMenu = () => {
        dispatch({ type: '[UI] - openSidebar' });
    }

    const closeSideMenu = () => {
        dispatch({ type: '[UI] - closeSidebar' });
    }

    return (
        <UiContext.Provider value={{
            ...state,

            openSideMenu,
            closeSideMenu,
         }}>
            {children}
        </UiContext.Provider>
    );
};
