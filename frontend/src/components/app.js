import React from "react";
import { AuthRoute,ProtectedRoute } from "../util/route_util";
import { Routes,Route } from "react-router-dom";
import MainPage from './main/main_page'
import LoginFormContainer from "./session/login_form_container";
const App = () => (
    <Routes>
        <Route exact path='/' element={
                <MainPage/>
        } />

        <Route exact path="/login" element={
            <AuthRoute>
                <LoginFormContainer/>
            </AuthRoute>
        }/>
    </Routes>
)
export default App;