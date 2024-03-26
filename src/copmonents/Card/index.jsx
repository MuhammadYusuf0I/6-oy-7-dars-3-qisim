import { FaRegTrashAlt } from "react-icons/fa";

function Card(props) {
  const { name, price, descripton, status, id } = props.phones;
  const { deleteItem } = props;

  return (
    <div className="card" style={{ width: "25rem" }}>
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{price}</h6>
        <h6 className="card-subtitle mb-2 text-body-secondary"> {status}</h6>
        <p className="card-text">{descripton}</p>
        <FaRegTrashAlt
          onClick={() => {
            deleteItem(id);
          }}
          style={{ color: "red", cursor: "pointer" }}
        />
      </div>
    </div>
  );
}
// function Card() {
//   return (
//     <div className=" card  " style={{ width: "18rem" }}>
//       <div className="card-body">
//         <h5 className="card-title">samsung</h5>
//         <h6 className="card-subtitle mb-2 text-body-secondary">200$</h6>
//         <h6 className="card-subtitle mb-2 text-body-secondary"> aktiv</h6>
//         <p className="card-text">alo</p>
//       </div>
//     </div>
//   );
// }

export default Card;
