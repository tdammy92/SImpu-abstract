export type senderIdsType = {
  bind_id: string;
  id: string;
  is_default: boolean;
  name: string;
};

export type organisationType = {
  id: string;
  name?: string;
  image?: string;
  sender_ids?: senderIdsType[];
};
