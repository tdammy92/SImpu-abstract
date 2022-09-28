import { InboxStoreState } from 'src/@types/store';
import { InboxId } from "src/@types/store";


const initialState:InboxStoreState = {
    inbox: {} as InboxId,
    channels:[]
    
  };
  
  export default initialState;