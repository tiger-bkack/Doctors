import React from "react";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctor from "../components/TopDoctor";
import Painer from "../components/Painer";

const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctor />
      <Painer />
    </div>
  );
};

export default Home;
