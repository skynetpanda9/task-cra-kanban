// /* eslint-disable no-unused-vars */
// import shortid from "shortid";

// export default function seed(store) {
//   console.log("Insert first list");
//   const firstListId = shortid.generate();
//   store.dispatch({
//     type: "ADD_COLUMN",
//     payload: { listId: firstListId, listTitle: "First list" },
//   });
//   store.dispatch({
//     type: "ADD_TASK",
//     payload: {
//       listId: firstListId,
//       cardId: shortid.generate(),
//       cardText: "First card",
//     },
//   });
//   store.dispatch({
//     type: "ADD_TASK",
//     payload: {
//       listId: firstListId,
//       cardId: shortid.generate(),
//       cardText: "Second card",
//     },
//   });
//   console.log("Insert second list");
//   const secondListId = shortid.generate();
//   store.dispatch({
//     type: "ADD_COLUMN",
//     payload: { listId: secondListId, listTitle: "Second list" },
//   });
//   store.dispatch({
//     type: "ADD_TASK",
//     payload: {
//       listId: secondListId,
//       cardId: shortid.generate(),
//       cardText: "Card 1",
//     },
//   });
//   store.dispatch({
//     type: "ADD_TASK",
//     payload: {
//       listId: secondListId,
//       cardId: shortid.generate(),
//       cardText: "Card 2",
//     },
//   });
// }
