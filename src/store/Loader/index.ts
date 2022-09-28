import { createSlice } from "@reduxjs/toolkit";
import { LoadingState } from "src/@types/store";


const initialState = {
    Isloading:false
}  as LoadingState




const loadingSlice = createSlice({
    name: 'loader',
    initialState,
    reducers: {
      showLoader(state:LoadingState) {
        state.Isloading = true
      },
      hideLoader(state:LoadingState) {
        state.Isloading = false
      },
    
    },
  })


  export const { showLoader, hideLoader} = loadingSlice.actions
  export default loadingSlice.reducer
