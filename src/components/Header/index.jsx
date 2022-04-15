import React from "react";
import { Layout } from "antd";
import "./index.css";

const { Header } = Layout;

const PageHeader = () => {
  return (
    <Header>
      <div className="header_container"> 
        <a title="Remix" className="header_home_link" href="">
          Remix Logo
        </a>
        <nav className="header_navigation">
          <ul className="navigation">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Remix Docs</a>
            </li>
            <li>
              <a href="">GitHub</a>
            </li>
        </ul>
        </nav>
      </div>
    </Header>
  );
};
  
export default PageHeader;
  