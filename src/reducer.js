export const initialState = {
    user: null,
    playlists: [],
    playing: false,
    item: null,
    // token: "BQBlRsAUYp1_VwRW7W8B3rhYzj91cg5s5a717XhVY-TbBUVMkYBafAog5QMwMXlVvKxjzGEp0Z5HuNr4hWdHsBScn6NoRXOXI5CNPr5qVdl06hbAN42_Bty9oWIABiGjppmtJPkRVlJrFdeOsH7hKClw0zqgRanID_niDVY2EWiuMXZ_K_jFg6uHUr_Z"
}  // empty data layer

const reducer = (state, action) => {
    console.log(action); // helps debug
    // Action -> type, [payload]
    switch(action.type) { 
        case 'SET_USER' : 
            return {
                ...state, // keep curr state
                user : action.user, // update action
            };
        case 'SET_TOKEN' :
            return {
                ...state,
                token : action.token,
            };
        case 'SET_PLAYLISTS' :
            return {
                ...state,
                playlists: action.playlists,
            };
        case 'SET_DISCOVER_WEEKLY' :
            return {
                ...state,
                discover_weekly: action.discover_weekly,
            };
        default: 
            return state; // no changes
    }
}
export default reducer;