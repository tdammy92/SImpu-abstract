import {replyStoreState, messageStoreState} from './../../@types/store';
import {replyType, quotedType, messageType} from './../../@types/inbox';

const initialState: messageStoreState = {
  message: {
    type: '',
    author: null,
    entity: null,
    id: 0,
    uuid: '',
    account_id: null,
    show_in_thread: null,
    created_datetime: '',
    updated_datetime: '',
    author_id: '',
    author_type: '',
    content_id: '',
    content_type: '',
  },
  messageType: 'reply',
  receiver: '',
};

export default initialState;
