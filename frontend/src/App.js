import React from "react";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { BrowserRouter as Router } from "react-router-dom";
import Routers from "./Routers";
import { setBaseuRL } from "./actions/auth";

const App = () => {
  setBaseuRL();
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routers />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
