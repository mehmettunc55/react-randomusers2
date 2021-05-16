import React, {useState, useEffect} from 'react'
import './Card.css'
import axios from 'axios';
import man from "./assets/man.svg";
import email from "./assets/mail.svg";
import growingupman from "./assets/growing-up-man.svg";
import map from "./assets/map.svg";
import phone from "./assets/phone.svg";
import padlock from "./assets/padlock.svg";


function Card() {
const [itemList, setItemList] = useState([]);

const getItems=()=> {
    axios
    .get('https://randomuser.me/api/')
    .then((resp)=>setItemList(resp.data.results));
}

useEffect(()=>{
    getItems()
},[]);
const names=()=>{
  
}

return (
    <div className="card-container" >
      {itemList?.map((user, index) => (
          
        <div key={index} className="card-box" >
          <img src={user.picture.large} alt="pic" className="picture" />
          
          <p className="info-text">
          {user.name.title} {user.name.first} {user.name.last}
          {user.email}
          {user.dob.age}
          {user.location.city} {user.location.country}
          {user.login.password}
          </p>
         
          <div className='icondiv'>
            <img src={man} alt="logo" className="icons" onClick={names}/>
        
            <img src={email} alt="logo" className="icons" />
                
            <img src={growingupman} alt="logo" className="icons" />
                
            <img src={map} alt="logo" className="icons" />
                      
            <img src={phone} alt="logo" className="icons" />
                
            <img src={padlock} alt="logo" className="icons" />
                 
          </div>
          <button onClick={getItems}>NEW USER</button>
        </div>
        
      ))}
    </div>
  );
}

export default Card


{/* <ul>
                <li className='icon'>
                    <a href={}>{user.name.title} {user.name.first} {user.name.last}
                    </a>
                </li>
            </ul> */}