import React from "react";
import { AuthRoute,ProtectedRoute } from "../util/route_utl";
import { Routes,Route } from "react-router-dom";
import MainPage from './main/main_page'
const App = () => (
    <Routes>
        <Route exact path='/' element={
            <AuthRoute>
                <MainPage/>
            </AuthRoute>
        } />
    </Routes>
)
