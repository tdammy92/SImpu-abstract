export type senderIdsType = {
  bind_id: string;
  id: string;
  is_default: boolean;
  name: string;
};

export type organisation = {
  id: string | null;
  name?: string;
  image?: string;
  sender_ids?: senderIdsType[];
};

export type organisationStore = {
  details: organisation;
};
