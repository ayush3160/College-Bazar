import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
  name: 'authProps',
  initialState: {
    value: {
        name : '',
        userId : '',
        token : '',
        loggedIn : false
    },
  },
  reducers: {
    setAuthProps : (state,action) => {
        state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAuthProps } = authSlice.actions

export default authSlice.reducer