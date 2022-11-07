import {organisation, organisationStore} from './../../@types/profile';

const initialState: organisationStore = {
  details: {id: '', name: '', image: '', sender_ids: []} as organisation,
};

export default initialState;
