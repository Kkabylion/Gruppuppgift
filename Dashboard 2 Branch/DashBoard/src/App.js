import React, { useEffect, useState } from "react";
import skybg from './skybg.mp4';
import menu from './menu-button.png';
import github from './github.png';
import { TempChart } from './components/TempChart';
import { TempChart2 } from './components/TempChart2';
import {TempChart3} from "./components/TempChart3";
import { Link, Element } from 'react-scroll';





const Header = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
      <header className={`fade-in ${visible ? 'visible' : ''}`}>
        <div className="header-title">
          <h1>Temperatur Data</h1>
        </div>
      </header>
  );
};

const VideoBackground = () => {
    return (
        <div className="video-background">
            <video autoPlay loop muted>
                <source src={skybg} type="video/mp4" />
            </video>
            <div className="charts-container">
                <TempChart />
                <TempChart2 />
                <TempChart3 />
            </div>
        </div>
    );
};




const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
      <nav className={`navbar ${dropdownVisible ? 'show-dropdown' : ''}`}>
        <div className="menu-icon" onClick={toggleDropdown}>
          <img src={menu} alt="Menu" style={{ width: '50px', height: '50px'}} />
        </div>
        {dropdownVisible && (
            <ul className="dropdown-menu">
              <li className="list-item">
                <Link to="uppsala" smooth={true} duration={500}>
                  Uppsala
                </Link>
              </li>
              <li className="list-item">
                <Link to="stockholm-e" smooth={true} duration={500}>
                  Stockholm E
                </Link>
              </li>
              <li className="list-item">
                <Link to="stockholm-w" smooth={true} duration={500}>
                  Stockholm W
                </Link>
              </li>
            </ul>
        )}
        <div className="right-menu">
          <a href="https://github.com/Kkabylion/Gruppuppgift" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="Github" style={{ width: '30px', height: '30px'}} />
          </a>
        </div>
      </nav>
  );
};

function App() {
    return (
        <div>
            <Navbar />
            <VideoBackground />
            <Header />
        </div>
    );


}

export default App;
