import {FilterMesageStore} from '../../@types/store';

const initialState: FilterMesageStore = {
  filterMessageType: [
    'Email:to',
    'Email:from',
    'Email:cc',
    'Email:bcc',
    'Email:subject',
    // 'Recipient',
    'Conversation ID',
  ],
  selectedFilter: null,
};

export default initialState;
