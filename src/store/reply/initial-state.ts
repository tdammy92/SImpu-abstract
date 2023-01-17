import {replyStoreState} from './../../@types/store';
import {replyType, quotedType} from './../../@types/inbox';

const initialState: replyStoreState = {
  reply: {
    type: '',
    author: null,
    entity: null,
    id: 0,
    uuid: '',
    account_id: null,
    show_in_thread: null,
    created_datetime: '',
    updated_datetime: null,
    author_id: '',
    author_type: '',
    content_id: '',
    content_type: '',
    quoted: null,
  },
  replyIsActive: false,
};

export default initialState;
