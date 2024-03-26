import React, { useEffect, useState, useRef } from "react";
import { BarLoader, BeatLoader } from "react-spinners";
import Card from "./copmonents/Card";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const [pending, setPending] = useState(false);

  const nameRef = useRef("");
  const priceRef = useRef(0);
  const desceRef = useRef("");
  const statusRef = useRef("Active");

  useEffect(() => {
    setIsLoading(true);
    fetch("https://auth-rg69.onrender.com/api/products/all", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  function valiDate() {
    return true;
  }

  function handleClick(e) {
    e.preventDefault();
    const isValid = valiDate();
    setPending(true);
    if (isValid) {
      const phones = {
        name: nameRef.current.value,
        price: priceRef.current.value,
        description: desceRef.current.value,
        status: statusRef.current.value,
        category_id: 2,
      };
      fetch("https://auth-rg69.onrender.com/api/products", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(phones),
      })
        .then((res) => res.json())
        .then((data) => {
          let copied = JSON.parse(JSON.stringify(users));
          copied.push(data);
          setUsers(copied);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          nameRef.current.value = "";
          priceRef.current.value = "";
          desceRef.current.value = "";
          statusRef.current.value = "";
          setPending(false);
        });
    }
  }
  function handleDelete(id) {
    let isDelete = confirm("Rostan ham o'chirmoqchimisiz");
    if (isDelete && id) {
      fetch(`https://auth-rg69.onrender.com/api/products/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.massage == "Mahsulot muvaffaqiyatli o'chirildi") {
            let copied = JSON.parse(JSON.stringify(users));
            copied = copied.filter((el) => {
              return el.id != id;
            });
            setUsers(copied);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      <div className="container">
        <h1 className="my-4 text-center">Phones</h1>
        <form className="d-flex w-50 gap-2 flex-column mx-auto">
          <input
            ref={nameRef}
            type="text"
            className="form-control"
            placeholder="Enter name..."
          />
          <input
            ref={priceRef}
            type="number"
            className="form-control"
            placeholder="Enter price..."
          />
          <textarea
            ref={desceRef}
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Enter description"
          ></textarea>
          <select ref={statusRef} className="form-control">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <button
            disabled={pending ? true : false}
            onClick={handleClick}
            className="btn btn-success"
          >
            {pending ? "Loading..." : " SAVE"}
          </button>
        </form>
        <div className="wrapper">
          {loading && <BarLoader color="red" size={20}></BarLoader>}
          {!loading &&
            users.map((el, index) => {
              return (
                <Card deleteItem={handleDelete} key={index} phones={el}></Card>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default App;
