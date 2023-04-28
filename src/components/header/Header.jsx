import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {

    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();    

    const controlNavbar=()=>{
      const scrollY = window.scrollY
     
      if (scrollY>200) {
        if (scrollY>lastScrollY && !mobileMenu) {
          setShow("hide")
        }else{
          setShow("show")
        }
      }else{
        setShow("top")
      }
      setLastScrollY(scrollY)
    }

    useEffect(() => {
      window.scrollTo(0,0)
    }, [location])
    
    useEffect(() => {
      window.addEventListener('scroll',controlNavbar)
      return () => {
        window.removeEventListener('scroll', controlNavbar)
    }
    }, [lastScrollY])
    

    const openSearch = ()=>{
      setMobileMenu(false)
      setShowSearch(true)
    }

    const openMobileMenu=()=>{
      setMobileMenu(true)
      setShowSearch(false)
    }

    const searchQueryHandler=(e)=>{
      if (e.key==="Enter" && query.trim().length>0) {
        navigate(`/search/${query}`)
        setShowSearch(false)
      }
    }

    const navigationHandler=(type)=>{
      navigate(`/explore/${type}`)
      setMobileMenu(false)
    }

    return (
        <header className={`header ${mobileMenu?'mobileView':""} ${show}`}>
          <ContentWrapper>
            <div className="logo">
              <img src={logo} alt="movix" onClick={()=>navigate('/')} />
            </div>
            <ul className="menuItems">
              <li className="menuItem" onClick={()=>navigationHandler('movie')}>Movies</li>
              <li className="menuItem" onClick={()=>navigationHandler('tv')}>TV shows</li>
              <li className="menuItem"><HiOutlineSearch onClick={()=>setShowSearch(true)}/></li>
            </ul>
            <div className="mobileMenuItems">
              <HiOutlineSearch onClick={openSearch}/>
              {mobileMenu?(
                <VscChromeClose  onClick={()=>setMobileMenu(false)}/>
                ) : (
                <SlMenu onClick={openMobileMenu}/>
              )}
            </div>
            
          </ContentWrapper>

         {showSearch && <div className="searchBar">
            <ContentWrapper>
            <div className="searchInput">
                    <input type="text" placeholder='Search for movie or tv show...' onChange={(e)=>setQuery(e.target.value)} onKeyUp={searchQueryHandler} />
                    <VscChromeClose  onClick={()=>setShowSearch(false)}/>
            </div>
            </ContentWrapper>
          </div>}

        </header>
    );
};

export default Header;