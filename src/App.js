import React from "react";
import axios from "axios";
import "./App.css";
import { useEffect, useState } from "react";
import {
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBBtn,
  MDBBtnGroup,
} from "mdb-react-ui-kit";
function App() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const sortOptions = ["customer", "country", "date"];
  useEffect(() => {
    loadUsersData();
  }, []);
  const loadUsersData = async () => {
    return await axios
      .get("http://localhost:5000/users")
      .then((response) => setData(response.data))
      .catch((err) => console.log(err));
  };
  console.log("data", data);
  const handleReset = () => {
    loadUsersData();
  };
  const handleSearch = async (e) => {
    e.preventDefault();
    return await axios
      .get(`http://localhost:5000/users?q=${value}`)
      .then((response) => {
        setData(response.data);
        setValue("");
      })
      .catch((err) => console.log(err));
  };

  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    return await axios
      .get(`http://localhost:5000/users?_sort=${value}&_order=disc`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = async (value) => {
    return await axios
      .get(`http://localhost:5000/users?status=${value}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <MDBContainer className="back">
      <div className="top">
        <div className="search">
          <form
            style={{
              margin: "auto",
              padding: "15px",
              maxWidth: "400px",
              alignContent: "center",
            }}
            className="d-flax input-group w-auto"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              className="form-control"
              placeholder="Search Name ..."
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <MDBBtn type="submit" color="dark">
              Search
            </MDBBtn>

            <MDBBtn className="mx-2" color="info" onclick={() => handleReset}>
              Reset
            </MDBBtn>
          </form>
        </div>
        <div className="filter">
          <MDBRow>
            <MDBCol size="8">
              <h5>Sort By:</h5>

              <select
                style={{ width: "50%", borderRadius: "2px", height: "35px" }}
                onChange={handleSort}
                value={sortValue}
              >
                <option>Please Select Value</option>
                {sortOptions.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </MDBCol>
            <MDBCol size="4">
              <h5>Filter By Status:</h5>
              <MDBBtnGroup>
                <MDBBtn
                  style={{ backgroundColor: "#99ff99", color:"black" }}
                   onClick={() => handleFilter("Delivered")}
                >
                  Delivered
                </MDBBtn>
                <MDBBtn
                  style={{ backgroundColor: "#ff9999" , color:"black" }}
                  onClick={() => handleFilter("Prepared")}
                >
                  Prepared
                </MDBBtn>
                <MDBBtn
                  style={{ backgroundColor: " #b3c6ff", color:"black"  }}
                  onClick={() => handleFilter("Completed")}
                >
                  Completed
                </MDBBtn>
              </MDBBtnGroup>
            </MDBCol>
          </MDBRow>
        </div>
      </div>
      <div classname="mdcontainer">
        <hr />
        <MDBRow>
          <MDBCol size="20">
            <MDBTable>
              <MDBTableHead className="headcolor">
                <tr>
                  <th scope="col">ORDER ID</th>
                  <th scope="col">CUSTOMER</th>
                  <th scope="col">ADDRESS</th>
                  <th scope="col">PRODUCT</th>
                  <th scope="col">Date Order</th>
                  <th scope="col">STATUS</th>
                </tr>
              </MDBTableHead>
              {data.length === 0 ? (
                <MDBTableBody className="align-center mb-0">
                  <tr>
                    <td className="text-center mb-0">no data found</td>
                  </tr>
                </MDBTableBody>
              ) : (
                data.map((item, index) => (
                  <MDBTableBody key={index}>
                    <tr>
                      <th scope="row">{item.order_id}</th>
                      <td>{item.customer}</td>
                      <td>
                        {item.country}
                        <span>{item.address}</span>
                      </td>
                      <td>
                        {item.product_title}
                        <span>{item.product_description}</span>
                      </td>
                      <td>{item.date}</td>
                      <td>{item.status}</td>
                    </tr>
                  </MDBTableBody>
                ))
              )}
            </MDBTable>
          </MDBCol>
        </MDBRow>
      </div>
    </MDBContainer>
  );
}

export default App;
