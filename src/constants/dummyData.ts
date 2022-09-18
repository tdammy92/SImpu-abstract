const userOne =
  'https://pbs.twimg.com/profile_images/1343686835155968003/kBJ0nF91_400x400.jpg';

const userTwo =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQtcG0LyqxqGrh9Sk26iCjR5WoWhE7BVFx_Q&usqp=CAU';
const userThree =
  'https://media-exp1.licdn.com/dms/image/C5603AQFsYXEHhmEuxg/profile-displayphoto-shrink_800_800/0/1604472622836?e=1666828800&v=beta&t=EcGn5oGDAsoFLIZAF_3YBv7QNjE39anXD7WJvqnXRvk';
const userFour =
  'https://media-exp1.licdn.com/dms/image/C4D03AQGh_IDtPB8qoA/profile-displayphoto-shrink_800_800/0/1520650378082?e=1666828800&v=beta&t=OoiAFqiAaPI8QRc5tiQNSCKDXw7NC05JUg5b15_3s3s';
const userFive =
  'https://media-exp1.licdn.com/dms/image/C4E03AQFgKNlIPyGFvA/profile-displayphoto-shrink_800_800/0/1655743817049?e=1666828800&v=beta&t=eYHmGGxoGi5MTgLcgfT12LPXgfrwTNWJ9rngq3DaP4U';
const userSix =
  'https://media-exp1.licdn.com/dms/image/C4E03AQFv7MLdqnZQcA/profile-displayphoto-shrink_800_800/0/1655896038473?e=1667433600&v=beta&t=d_Lpy8xPUXKpT9VjJz3KBvn7jKbmi0f9pet7BrtXyuI';

export default [
  {
    id: '1',
    name: 'Taiwo Damilola',
    lastMesssage: `Hey There!`,
    avatar: userOne,
    channelType: 'whatsapp',
    time: '2022-09-05T16:28:16.960Z',
    chats: [
      {
        author: {id: '1'},
        createdAt: '2019-06-14T07:20:16Z',
        id: '11',
        text: 'am at you location',
        type: 'text',
        IsRead: true,
      },
      {
        author: {id: '1234'},
        createdAt: '2020-04-14T07:20:16Z',
        id: '12',
        text: 'Completed your task',
        type: 'text',
        IsRead: false,
      },
      {
        author: {id: '1'},
        createdAt: '2021-09-14T07:20:16Z',
        id: '13',
        text: 'lets have a meeting by 12pm',
        type: 'text',
        IsRead: true,
      },
    ],
  },
  {
    id: '2',
    name: 'Jane Doe',
    lastMesssage: `When are you paying my money ???`,
    avatar: userTwo,
    channelType: 'instagram',
    time: '2021-12-14T07:20:16Z',
    chats: [
      {
        author: {id: '1234'},
        createdAt: '2019-04-14T07:20:16Z',
        id: '11',
        text: 'am at you location',
        type: 'text',
        IsRead: false,
      },
      {
        author: {id: '2'},
        createdAt: '2020-05-14T07:20:16Z',
        id: '12',
        text: 'Completed your task',
        type: 'text',
        IsRead: false,
      },
      {
        author: {id: '2'},
        createdAt: '2022-09-14T07:20:16Z',
        id: '13',
        text: 'lets have a meeting by 12pm',
        type: 'text',
        IsRead: true,
      },
    ],
  },

  {
    id: '3',
    name: 'Maxwell Iheagwara',
    lastMesssage: `Have tested its okay!`,
    avatar: userThree,
    channelType: 'twitter',
    time: '2021-11-14T07:20:16Z',
    chats: [
      {
        author: {id: '3'},
        createdAt: '2019-01-14T07:20:16Z',
        id: '11',
        text: 'am at you location',
        type: 'text',
        IsRead: false,
      },
      {
        author: {id: '1234'},
        createdAt: '2020-08-14T07:20:16Z',
        id: '12',
        text: 'Completed your task',
        type: 'text',
        IsRead: true,
      },
      {
        author: {id: '3'},
        createdAt: '2021-11-20T07:20:16Z',
        id: '13',
        text: 'lets have a meeting by 12pm',
        type: 'text',
        IsRead: false,
      },
    ],
  },
  {
    id: '4',
    name: 'Tioluwani Kolawole',
    lastMesssage: `Merged your PR!`,
    avatar: userFour,
    channelType: 'messenger',
    time: '2021-09-14T07:20:16Z',
    chats: [
      {
        author: {id: '4'},
        createdAt: '2022-11-14T07:20:16Z',
        id: '11',
        text: 'am at you location',
        type: 'text',
        IsRead: false,
      },
      {
        author: {id: '4'},
        createdAt: '2020-11-04T07:20:16Z',
        id: '12',
        text: 'Completed your task',
        type: 'text',
        IsRead: true,
      },
      {
        author: {id: '1234'},
        createdAt: '2019-05-14T07:20:16Z',
        id: '13',
        text: 'lets have a meeting by 12pm',
        type: 'text',
        IsRead: true,
      },
    ],
  },
  {
    id: '5',
    name: 'Nimi Martins',
    lastMesssage: `Working on dashboard design!`,
    avatar: userFive,
    channelType: 'whatsapp',
    time: '2021-11-14T07:20:16Z',
    chats: [
      {
        author: {id: '5'},
        createdAt: '2019-08-01T07:20:16Z',
        id: '11',

        text: 'am at you location',
        type: 'text',
        IsRead: false,
      },
      {
        author: {id: '1234'},
        createdAt: '2020-03-05T07:20:16Z',
        id: '12',
        text: 'Completed your task',
        type: 'text',
        IsRead: false,
      },
      {
        author: {id: '5'},
        createdAt: '2021-08-14T07:20:16Z',
        id: '13',
        text: 'lets have a meeting by 12pm',
        type: 'text',
        IsRead: true,
      },
    ],
  },
  {
    id: '6',
    name: 'Inioluwa A',
    lastMesssage: `Welcome to Simpu!`,
    avatar: userSix,
    channelType: 'whatsapp',
    time: '2021-11-14T07:20:16Z',
    chats: [
      {
        author: {id: '6'},
        createdAt: '2019-08-01T07:20:16Z',
        id: '11',

        text: 'am at you location',
        type: 'text',
        IsRead: false,
      },
      {
        author: {id: '1234'},
        createdAt: '2020-04-11T07:20:16Z',
        id: '12',
        text: 'Completed your task',
        type: 'text',
        IsRead: false,
      },
      {
        author: {id: '6'},
        createdAt: '2021-08-14T07:20:16Z',
        id: '13',
        text: 'lets have a meeting by 12pm',
        type: 'text',
        IsRead: true,
      },
    ],
  },
];
