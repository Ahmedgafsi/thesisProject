"use client"
import Image from 'next/image';
import axios from 'axios';
import "../../styles/rooms.css";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/authcontex/Authcontex';

export default function House() {
  const [data, setData] = useState<any>([]);
  const router = useRouter();
  const pathname = usePathname()
  const id = pathname.slice(pathname.length-1)

  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const {token}=useAuth()
  const { logOut } = useAuth();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
};


  
  const toOneRoom = (id:number)=>{
    router.push(`/oneRoom/${id}`)
  }
  useEffect(() => {
    axios.get(`http://localhost:8080/rooms/hotel/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleImageClick = (id: number) => {
    router.push(`/oneRoom/${id}`);
  };

  return (
    <body>
     <nav id="navBar" className='navbar-white'>
    <Image className="logo" src="/img/logotr.png" width={120} height={120} alt="dtg" quality={75} priority={false}/>
    <ul className='nav-links'>
        <li><a href="/" className="active">Home</a></li>
        <li><a href="/contactus" className="active">Contact Us</a></li>
      
    </ul>
    {!token ? (
            <a href="/auth" className="register-btn">
             
              Register Now
            </a>
          ) : (
            <div className="toggle-container">
              <div className="toggle-option active">
                <img
                  className="noti"
                  src="https://th.bing.com/th/id/OIP.EkL3E_EYbt08OV84-Dm2GwAAAA?rs=1&pid=ImgDetMain"
                  alt="notification"
                />
              </div>
              <div className="toggle-option" onClick={toggleDropdown}>
                <img
                  className="usee"
                  src="https://img.icons8.com/ios-glyphs/30/000000/user--v1.png"
                  alt="User"
                />
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <ul>
                    <li>
                      <a href="/editprofile">Edit Profile</a>
                    </li>
                   
                    <li>
                      <a href="/auth" onClick={()=>{logOut()}}>Logout</a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
    </nav>

      <div className="container2">
        <div className="search-bar">
          <div id='for'>
            <div className='location-input'>
              <label>location</label>
              <input type="text" placeholder='where are you going?' />
            </div>
            <div>
              <label>Check In</label>
              <input type="text" placeholder='Add Date?' />
            </div>
            <div>
              <label>Guest</label>
              <input type="text" placeholder='Add Guest?' />
            </div>
            <button><Image id='im' src="/img/search.png" alt='image house' width={20} height={20} /></button>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='list-container'>
          <div className="left-col">
            <p>{data.length}+ Options</p>
            <h1>Recommended Places </h1>
            {data.map((el: any) => (
              <div className='house' key={el.id} onClick={()=>{toOneRoom(el.id)}} style={{cursor:"pointer"}}>
                <div className="house-img" onClick={() => handleImageClick(el.id)}>
                  <img src={el.image2}  width={330} height={200} alt="" />
                </div>
                <div className="house-info">
                  <p>{el.name}</p>
                  <h3>{el.description}</h3>
                  <p>{el.bedroom} Bedroom / {el.baths} Bathroom / {el.beds} Beds / Wifi / Kitchen</p>
                  <br />
                  <i><Image src="/img/star.png" alt='image house' width={20} height={20} /></i>
                  <div className="house-price">
                    <p>{el.guests} Guest</p>
                    <h4>$ {el.nightPrice} <span>/ day</span></h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='right-col'>
            <div className="sidebar">
              <h2>Select Filters</h2>
              <h3>Property type</h3>
              <div className="filter">
                <input type="checkbox" /> <p>House</p><span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Hostel</p><span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Flat</p><span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Villa</p><span>(0)</span>
              </div>
              <div className="filter">
                <input type="checkbox" /> <p>Guest suite</p><span>(0)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pagination">
          <Image className='arroo' src="/img/arrow.png" alt='arrow' width={15} height={20} />
          <span className='curreent'>1</span>
          <Image id='rightarro' className='arroo' src="/img/arrow.png" alt='arrow' width={15} height={20} />
        </div>

        <div className='footer'>
          <a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
          <a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
          <a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
          <a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
          <a href="https://www.youtube.com/"><i className='fab fa-facebook-f'></i></a>
          <hr />
          <p>Copyright 2021</p>
        </div>
      </div>
    </body>
  );
}
