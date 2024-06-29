"use client"


import React, { useState } from "react";
import "../styles/contactus.css"
import axios from "axios";
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authcontex/Authcontex";


export default function ContactForm  (){
const[first,setfirst]=useState<string>("")
const[last,setlast]=useState<string>("")
const[phone,setphone]=useState<string>("")
const[text,settext]=useState<string>("")
const[email,setemail]=useState<string>("")
const { logOut } = useAuth();
const router = useRouter();

const sendReclamation=()=>{
  axios.post(`http://localhost:8080/api/reclamation/send`,{
    email:email,
    content:text,
    phoneNumber:phone,
    lastName:last,
    firstName:first
  }).then((resp)=>{
    console.log(resp)
  }).catch((err)=>{
    console.log(err)
  })



}





    return (<>
    <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <a href="/" className="navbar-link">
              Home
            </a>
          </li>
          <li className="navbar-item">
            <a href="/editprofile" className="navbar-link">
              Edit Profile
            </a>
          </li>
          <li className="navbar-item">
            <a onClick={()=>{logOut()}} className="navbar-link">
              Logout
            </a>
          </li>
        </ul>
      </nav>
        <div className="contactContainer">
              <div className="videoContainer">
            <video className="backgroundVideo" autoPlay muted loop>
              <source src="https://cdn.pixabay.com/video/2019/04/23/23011-332483109_large.mp4" type="video/mp4" />
              Contact Us
            </video>
            <div className="videoTextOverlay">
          <h3>Conatct Us </h3>
        </div>
          </div>
          <div className="contentWrapper">
            <div className="contactDetails">
              <h1 className="word">Let's talk with us</h1>
              <p>
                Questions, comments, or suggestions? <br />Simply fill in the form and we will be in touch shortly.
              </p>
              <address>
            <div className="addressItem">
              <Image className="imgicon" src="/img/map.png" width={20} height={20} alt="dtg" />
              <b>5020 Monastir Rue Basatin, 67, sousse Kantaoui.</b>
            </div>
            <div className="addressItem">
              <Image className="imgicon" src="/img/phone.png" width={20} height={20} alt="dtg" />
              <b>+216 55 600 939</b>
            </div>
            <div className="addressItem">
              <Image className="imgicon" src="/img/email.png" width={20} height={20} alt="dtg" />
              <b>Contact.travel@agency.com</b>
            </div>
          </address>
            </div>
            <div className="formContainer">
              <h2>Contact Us</h2>
              <div className="contactForm">
                <div className="inputGroup">
                  <input type="text" name="firstName" placeholder="First Name*" required  onChange={(e)=>{setfirst(e.target.value)}}/>
                  <input type="text" name="lastName" placeholder="Last Name*" required onChange={(e)=>{setlast(e.target.value)}}/>
                </div>
                <input type="email" name="email" placeholder="Email*" required onChange={(e)=>{setemail(e.target.value)}} />
                <input type="tel" name="phone" placeholder="Phone Number*" required  onChange={(e)=>{setphone(e.target.value)}}/>
                <textarea name="message" placeholder="Your message..." required onChange={(e)=>{settext(e.target.value)}}></textarea>
                <button type="submit" className="submitButton" onClick={()=>{sendReclamation()}}>Send Message</button>
              </div>
            </div>
          </div>
        
        </div>
        </>
      );
    }
    
    