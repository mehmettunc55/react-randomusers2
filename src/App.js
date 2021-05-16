import './Card.css';
import cw from "./assets/cw.svg"
import man from "./assets/man.svg"
import woman from "./assets/woman.svg"
import growingMan from "./assets/growing-up-man.svg"
import growingWoman from "./assets/growing-up-woman.svg"
import mail from "./assets/mail.svg"
import map from "./assets/map.svg"
import padlock from "./assets/padlock.svg"
import phone from "./assets/phone.svg"
import loadingGif from "./assets/loading.gif"
import {useState, useEffect} from 'react'
import axios from 'axios';


function App() {
  const [ info, setInfo ] = useState([])
  const [ personal, setPersonal ] = useState("name")
  const [ information, setInformation ] = useState([])
  const fetchData = () => {
    axios.get("https://randomuser.me/api/")
    .then((res) => {
      console.log(res.data.results[0])
      setInfo(res.data.results[0])
      setInformation([res.data.results[0].name.title, res.data.results[0].name.first, res.data.results[0].name.last])
      setPersonal("name")
    } )
  }
  const handleClick = (information, personal) => {
    setInformation(information)
    setPersonal(personal)
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="App">
      <img src={cw} alt="clarusway" className="cw" />
      <div className="card" >
        <div className="card-title-background"></div>
        <img alt="img" src={info?.picture?.large} className="image" />
        <div className="personal-info" >
        <p>My {personal} is </p>
        {<p>{information.map((info,index) => (
          <span key={index}>{info + " "} </span>
        ))} </p>}
        </div>
        <div className="icons">
          <acronym title="gender"><img src={info?.gender === "female" ? woman : man} alt="man-woman" onClick={ () => handleClick([info?.name?.title, info?.name?.first, info?.name?.last], "name" ) } /> </acronym>
          <acronym title="email"><img src={mail} alt="man-woman" onClick={() => handleClick([info.email], "email")} /> </acronym>
          <acronym title="age"><img src={info?.gender === "female" ? growingWoman : growingMan} alt="man-woman" onClick={() => handleClick([info?.dob?.age], "age")} /> </acronym>
          <acronym title="street"><img src={map} alt="man-woman" onClick={() => handleClick([info?.location?.street?.number, info?.location?.street?.name], "street")} /> </acronym>
          <acronym title="phone"><img src={phone} alt="man-woman" onClick={() => handleClick([info?.cell], "phone number")} /> </acronym>
          <acronym title="password"><img src={padlock} alt="man-woman"  onClick={() => handleClick([info?.login?.password], "password")}/> </acronym>
        </div>
        <div className="buttons">
          <button onClick={fetchData}>NEW USER</button>
          <button>ADD USER</button>
        </div>
      </div>
    </div>
  );
}
export default App;