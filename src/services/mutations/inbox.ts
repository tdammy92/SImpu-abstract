import {buildConversationUrl, client} from '../api/api-client';

//send message socials
export const sendMessageSocials = async (payload: any) => {
  const {
    message,
    params: {threadId, Auth, organisationId},
  } = payload;
  const url = buildConversationUrl(`conversations/message/${threadId}`);
  const response = await client(url, {
    method: 'POST',
    data: JSON.stringify(message),
    params: {Auth, organisationId},
  });
  return response.data;
};
//reply message socials
export const replyMessageSocials = async (payload: any) => {
  const {
    message,
    params: {messageId, Auth, organisationId},
  } = payload;
  const url = buildConversationUrl(`conversations/reply/${messageId}`);
  const response = await client(url, {
    method: 'POST',
    data: JSON.stringify(message),
    params: {Auth, organisationId},
  });
  return response.data;
};
//forward message socials
export const forwardMessageSocials = async (payload: any) => {
  const {
    body,
    params: {messageId, Auth, organisationId},
  } = payload;
  const url = buildConversationUrl(`conversations/forward/${messageId}`);
  const response = await client(url, {
    method: 'POST',
    data: body,
    params: {Auth, organisationId},
  });
  return response.data;
};

//reply message mail
export const replyMessageMail = async (payload: any) => {
  console.log('mail from mutation', JSON.stringify(payload, null, 2));

  const {message, messageId, Auth, organisationId} = payload;

  const url = buildConversationUrl(`conversations/reply/${messageId}`);
  const response = await client(url, {
    method: 'POST',
    data: message,
    params: {Auth, organisationId},
  });
  return response.data;
};

//forward message mail
export const forwardMessageMail = async (payload: any) => {
  const {
    body,
    params: {messageId, Auth, organisationId},
  } = payload;
  const url = buildConversationUrl(`conversations/forward/${messageId}`);
  const response = await client(url, {
    method: 'POST',
    data: body,
    params: {Auth, organisationId},
  });
  return response.data;
};

//send files
export const sendFiles = async (params: any) => {
  // console.log('files to upload', JSON.stringify(params, null, 2));
  const {file, Auth, organisationId, credentitalId} = params;

  const url = buildConversationUrl(`upload/${credentitalId}`);

  // console.log('upload url', url);
  const response = await client(url, {
    method: 'POST',
    data: file,
    params: {Auth, organisationId},
  });

  // console.log('response from file upload', response);
  return response.data;
};

//mark thread as read
export const markThreadAsRead = async (params: any) => {
  const {Auth, organisationId, threadId} = params;

  const url = buildConversationUrl(`threads/notifications/${threadId}`);

  const response = await client(url, {
    method: 'PATCH',
    data: {event: 'read'},
    params: {Auth, organisationId},
  });

  return response.data;
};

//mark as resolved
export const resolveConversation = async (params: any) => {
  const {Auth, organisationId, threadId} = params;

  const url = buildConversationUrl(`threads/resolve/${threadId}`);

  const response = await client(url, {
    method: 'PATCH',
    data: {request_rating: true},
    params: {Auth, organisationId},
  });

  return response.data;
};

//mark thread as read
export const startConversation = async (params: any) => {
  const {Auth, data, organisationId, credentialId, message} = params;
  const url = buildConversationUrl(`conversations/start/${credentialId}`);
  const response = await client(url, {
    method: 'POST',
    data: message,
    params: {Auth, organisationId},
  });

  return response.data;
};
