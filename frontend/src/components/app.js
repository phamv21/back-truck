import React from "react";
import { AuthRoute,ProtectedRoute } from "../util/route_util";
import { Routes,Route } from "react-router-dom";
import MainPage from './main/main_page'
import LoginFormContainer from "./session/login_form_container";
import NavbarContainer from "./nav/navbar_container";
import SignupFormContainer from "./session/signup_form_container";
const App = () => (
    <div>
       <NavbarContainer/> 
       
       <Routes>
            <Route exact path='/' element={
                    <MainPage/>
            } />
            {/* login route */}
            <Route exact path="/login" element={
                <AuthRoute>
                    <LoginFormContainer/>
                </AuthRoute>
            }/>
            {/* signup form */}
            <Route exact path="/signup" element={
                <AuthRoute>
                    <SignupFormContainer/>
                </AuthRoute>
            }/>


        </Routes>
    </div>
    
)
export default App;