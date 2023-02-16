import { UiState } from './UiProvider';


type UiActionType = 
    | {type: '[UI] - openSidebar'}
    | {type: '[UI] - closeSidebar'};


export const uiReducer = (state: UiState, action: UiActionType): UiState => {
    switch (action.type) {
        case '[UI] - openSidebar':
            return {...state,  isSidebarOpen: true};
        case '[UI] - closeSidebar':
            return {...state, isSidebarOpen: false};
        default:
            return state;
    }
}