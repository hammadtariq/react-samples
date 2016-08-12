import React from 'react';
import {render} from 'react-dom';
import KanbanBoardContainer from './KanbanBoardContainer';

// let cardsList = [
// {
//   id: 1,
//   title: "Read the Book",
//   description: "I should read the whole book",
//   status: "in-progress",
//   color: '#BD8D31',
//   tasks: []
// },
// {
//   id: 2,
//   title: "Write some code",
//   description: "Code along with the samples in the book The complete source can be found at [github](https://github.com/pro-react)",
//   status: "todo",
//   color: '#3A7E28',
//   tasks: [
//     {
//       id: 1,
//       name: "ContactList Example",
//       done: true
//     },
//     {
//       id: 2,
//       name: "Kanban Example",
//       done: false
//     },
//     {
//       id: 3,
//       name: "My own experiments",
//       done: false
//     }
//   ]
// },
// ];
 
render(<KanbanBoardContainer/>, document.getElementById('root'));