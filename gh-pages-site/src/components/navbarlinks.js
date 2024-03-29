import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const NavItem = styled(Link)`
  text-decoration: none;
  color: #111;
  display: inline-block;
  white-space: nowrap;
  margin: 0 0.6vw;
  transition: all 200ms ease-in;
  position: relative;


  :after {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 0%;
    content: ".";
    color: transparent;
    background: goldenrod;
    height: 1px;
    transition: all 0.4s ease-in;
  }

  :hover {
    color: goldenrod;
    ::after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    padding: 10px 0;
    font-size: 1.5rem;
    z-index: 6;
  }
`
const NavbarLinks = () => {
  return (
    <>
      <NavItem to="/">Home</NavItem>
      <NavItem to="/workshop_01">WS 01</NavItem>
      <NavItem to="/workshop_02">WS 02</NavItem>
      <NavItem to="/workshop_03">WS 03</NavItem>
      <NavItem to="/workshop_04">WS 04</NavItem>
      <NavItem to="/workshop_06">WS 06</NavItem>
      <NavItem to="/workshop_07">WS 08</NavItem>
      <NavItem to="/workshop_08">WS 09</NavItem>
      <NavItem to="/workshop_09">Optional 10</NavItem>
      <NavItem to="/workshop_10">Optional 11</NavItem>
      
    </>
  )
}

export default NavbarLinks