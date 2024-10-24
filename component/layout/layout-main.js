import React from "react";
import Navbar from "@/component/navbar";
import Header from "@/component/navbar/header";
import Language from "@/component/language";
import Footer from "@/component/navbar/footer";

export default function LayoutMain({ children }) {
  return (
    <>
      <Header />
      <main>
        <Navbar />
        <div className="main-div">{children}</div>
      </main>
      <Footer />
      <Language />
    </>
  );
}
