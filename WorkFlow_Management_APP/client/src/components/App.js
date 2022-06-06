import GlobalStyle from "./GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataContextProvider } from "./DataContext";//Add the Context Provider to the entire application

import ResponsiveGrid from "./ResponsiveGrid";
import Homepage from "./Homepage";
import Header from "./Header";
import UserLogin from "./UserLogin";
import AdminLogin from "./AdminLogin";
import UserSignUp from "./UserSignUp";
import AdminHomepage from "./AdminHomepage";
import UserHomepage from "./UserHomepage";
import AdminProjects from "./AdminProjects";
import CurrentProject from "./CurrentProject";
import AdminNewTaskForm from "./AdminNewTaskForm";

const App = () => {
    return (
      <>
        <GlobalStyle />
        <BrowserRouter>
          <DataContextProvider>
            <Header />
            {/* <ResponsiveGrid/> */}
            <Routes>
              <Route path="/" exact element={<Homepage/>} />
              <Route path="/adminLogin" element={<AdminLogin/>} />
              <Route path="/userLogin" element={<UserLogin/>} />
              <Route path="/userSignUp" element={<UserSignUp/>} />
              <Route path="/adminHome" element={<AdminHomepage/>} />
              <Route path="/userHome/:_id" element={<UserHomepage/>} />
              <Route path="/adminHome/myProjects" element={<AdminProjects/>} />
              <Route path="/adminHome/myProjects/:_id" element={<CurrentProject/>} />
              <Route path="/adminHome/myProjects/:_id/newTask" element={<AdminNewTaskForm/>} />
              {/* <Route path="/products" element={<Products />} />
              <Route path="/items/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/grid" element={<ResponsiveGrid />} /> */}
            </Routes>
          </DataContextProvider>
        </BrowserRouter>
      </>
    );
  };
  
  export default App;