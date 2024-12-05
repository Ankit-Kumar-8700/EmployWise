import {createSlice} from "@reduxjs/toolkit";

const initialState={
    serverLink:"https://reqres.in",
    mode:"light",
    currPage:1,
    token:null,
    totalPages:1,
    per_page: 0,
    total: 0,
    users: []
};

export const authSlice = createSlice({
    name: "Employees Assignment",
    initialState,
    reducers: {
      setMode: (state) => {
        state.mode = state.mode==="light" ? "dark" : "light";
      },
      setLogin: (state, action) => {
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);
      },
      setLogout: (state) => {
        state.token = null;
        localStorage.removeItem('token');
      },
      setNewPage: (state, action) => {
        state.users = action.payload.data;
        state.currPage=action.payload.page;
        state.totalPages=action.payload.total_pages;
        state.per_page=action.payload.per_page;
        state.total=action.payload.total;
      },
      setUsers: (state,action) => {
        state.users = action.payload;
      },
      setPage: (state,action) => {
        state.currPage=action.payload;
      },
      setTotalPages: (state,action) => {
        state.totalPages=action.payload.total_pages;
      }
    },
  });
  
  export const { setMode, setLogin, setLogout, setNewPage, setUsers, setPage, setTotalPages } =
    authSlice.actions;
  export const authReducer= authSlice.reducer;