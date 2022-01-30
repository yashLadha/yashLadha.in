import ProfileImage from "./ProfileImage";
import NavBar from "./NavBar";
import Content from "./Content";
import Footer from "./Footer";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container mx-auto sm:w-1/2">
        <ProfileImage />
        <NavBar />
      </div>
      <div className="w-full">
        <Content />
      </div>
      <div className="w-full">
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
