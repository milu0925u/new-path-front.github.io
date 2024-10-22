import React from "react";
import Navbar from "@/component/navbar";
import Header from "@/component/navbar/header";
import Language from "@/component/language";
import Footer from "@/component/navbar/footer";

export default function LayoutMain({ children }) {
  return (
    <div className="main-container">
      <Header />
      <main>
        <Navbar />
        <div className="main-content">{children}</div>
      </main>
      <Footer />
      <Language />
    </div>
  );
}
