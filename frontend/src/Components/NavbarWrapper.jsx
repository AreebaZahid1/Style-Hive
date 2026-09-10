import React from "react";
import Navbar from "./Navbar";

function NavbarWrapper({ children }) {
  return (
    <>
      <Navbar />

      <main>
        {children}
      </main>
    </>
  );
}

export default NavbarWrapper;