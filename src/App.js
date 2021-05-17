import { useState, useEffect } from "react";
import "./Card.css";
import axios from "axios";
import cw from "./assets/cw.svg";
import man from "./assets/man.svg";
import woman from "./assets/woman.svg";
import growingMan from "./assets/growing-up-man.svg";
import growingWoman from "./assets/growing-up-woman.svg";
import mail from "./assets/mail.svg";
import map from "./assets/map.svg";
import padlock from "./assets/padlock.svg";
import phone from "./assets/phone.svg";
import loadingGif from "./assets/loading.gif";

function App() {
  const [info, setInfo] = useState([]);
  const [personal, setPersonal] = useState("name");
  const [information, setInformation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userList, setUserList] = useState([]);

  const fetchData = () => {
    setLoading(true);
    axios.get("https://randomuser.me/api/").then((res) => {
      console.log(res.data.results[0]);
      setInfo(res.data.results[0]);
      setInformation([
        res.data.results[0].name.title,
        res.data.results[0].name.first,
        res.data.results[0].name.last,
      ]);
      setPersonal("name");
      setLoading(false);
    });
  };

  const addUser = () => {
    if (userList.filter((user) => user.email == info?.email).length > 0) {
      alert("This person already added");
    } else {
      setUserList([
        ...userList,
        {
          name: info?.name?.first,
          email: info?.email,
          phone: info?.phone,
          age: info?.dob?.age,
        },
      ]);
    }
  };

  const handleClick = (information, personal) => {
    setInformation(information);
    setPersonal(personal);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <img src={cw} alt="clarusway" className="cw" />
      <div className="card">
        <div className="card-title-background"></div>
        {loading ? (
          <img className="loading" src={loadingGif} />
        ) : (
          <div>
            {" "}
            <img alt="img" src={info?.picture?.large} className="image" />
            <div className="personal-info">
              <div>
                <p>My {personal} is</p>
                <p>
                  {information?.map((info) => (
                    <span>{info + " "} </span>
                  ))}
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="icons">
          <acronym title="gender">
            <img
              src={info?.gender === "female" ? woman : man}
              alt="man-woman"
              onClick={() =>
                handleClick(
                  [info?.name?.title, info?.name?.first, info?.name?.last],
                  "name"
                )
              }
            />{" "}
          </acronym>
          <acronym title="email">
            <img
              src={mail}
              alt="man-woman"
              onClick={() => handleClick([info.email], "email")}
            />{" "}
          </acronym>
          <acronym title="age">
            <img
              src={info?.gender === "female" ? growingWoman : growingMan}
              alt="man-woman"
              onClick={() => handleClick([info?.dob?.age], "age")}
            />{" "}
          </acronym>
          <acronym title="street">
            <img
              src={map}
              alt="man-woman"
              onClick={() =>
                handleClick(
                  [
                    info?.location?.street?.number,
                    info?.location?.street?.name,
                  ],
                  "street"
                )
              }
            />{" "}
          </acronym>
          <acronym title="phone">
            <img
              src={phone}
              alt="man-woman"
              onClick={() => handleClick([info?.cell], "phone number")}
            />{" "}
          </acronym>
          <acronym title="password">
            <img
              src={padlock}
              alt="man-woman"
              onClick={() => handleClick([info?.login?.password], "password")}
            />{" "}
          </acronym>
        </div>
        <div className="buttons">
          <button onClick={fetchData}>NEW USER</button>
          <button onClick={addUser}>ADD USER</button>
        </div>
        <div className="list">
          {userList.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Age</th>
                </tr>
              </thead>
              <tbody>
                {userList?.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.age}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
export default App;
