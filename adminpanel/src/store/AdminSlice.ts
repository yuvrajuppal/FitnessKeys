import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    Loginstate:false,
    adminName:''
};

const AdminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setLoginState(state, action) {
            state.Loginstate = action.payload;
           
            
        },
        setAdminName(state, action) {
            state.adminName = action.payload;
           console.log(Object.values(state));
        }
    }
});

export const { setLoginState, setAdminName } = AdminSlice.actions;
export default AdminSlice.reducer;