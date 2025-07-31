import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ClubListPage from "./pages/ClubListPage";
import RegisterAthlete from "./pages/RegisterAthlete";
import RankingGuidePage from "./pages/RankingGuidePage";
import FormRegisterAthlete from "./pages/FormRegisterAthlete";
import Navbar from "./pages/NavBar";
import AthleteProfile from "./pages/AthleteProfile";
import OfficialTournament from "./pages/AmateurTournament";
import AthleteListPage from "./pages/AthleteListPage";
import SocialListPage from "./pages/SocialListPage";

function App(){
  return (
    <Router>
      <Routes>
        <Route path = "/*" element={<HomePage/>} />
        <Route path = "/clubs" element={<ClubListPage/>}/>
        <Route path = "/athlete" element={<RegisterAthlete/>}/>
        <Route path = "/ranking-guide" element={<RankingGuidePage/>}/>
        <Route path = "/form-register-athlete" element={<FormRegisterAthlete/>}/>
        <Route path = "/NavBar" element={<Navbar/>}/>
        <Route path = "/athlete/:id" element={<AthleteProfile/>}/>
        <Route path = "/amateur-tournament" element={<OfficialTournament/>}/>
        <Route path = "/athlete-list" element={<AthleteListPage/>}/>
        <Route path = "/social-list" element={<SocialListPage/>}/>
      </Routes>
    </Router>
  )
}

export default App;