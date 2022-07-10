// // import React from "react";

// const Comment = () => {
//   return (
//     <>
//       {/* first comment start here  */}
//       <div className="d-flex align-items-center my-1">
//         {data.user.image ? (
//           <img
//             src={`http://localhost:5000/home/${data.user.image}`}
//             alt="A"
//             className="rounded-circle me-2"
//             style={{
//               width: 38,
//               height: 38,
//               objectFit: "cover",
//             }}
//           />
//         ) : (
//           <>
//             <img
//               src={data.user.image}
//               alt="A"
//               className="rounded-circle me-2"
//               style={{
//                 width: 38,
//                 height: 38,
//                 objectFit: "cover",
//               }}
//             />
//           </>
//         )}
//         <div className="p-3 rounded-pill w-100 commet__input">
//           <div className="d-flex justify-content-end">
//             <i
//               className="fas fa-ellipsis-h"
//               type="button"
//               data-bs-toggle="dropdown"
//               aria-expanded="false"
//             />
//             <ul
//               className="dropdown-menu border-0 shadow"
//               aria-labelledby="post1Menu"
//             >
//               <li className="d-flex align-items-center">
//                 <a
//                   href="#"
//                   className="dropdown-item d-flex align-items-center justify-content-around fs-6"
//                 >
//                   Edit Comment
//                 </a>
//               </li>
//               <li className="d-flex align-items-center">
//                 <a
//                   href="#"
//                   className="dropdown-item d-flex align-items-center justify-content-around fs-6"
//                 >
//                   Delete Comment
//                 </a>
//               </li>
//             </ul>
//           </div>
//           <p className="fw-bold m-0">{data.user.username}</p>
//           <p className="m-0 bg-gray p-2 rounded">
//             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem
//             ipsum dolor, sit amet consectetur adipisicing elit.
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Comment;
