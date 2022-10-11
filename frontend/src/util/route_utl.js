import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";


const Auth = ({children,loggedIn}) => {
    if(loggedIn){
        return (<Navigate to ='/' replace/>)
    }else{
        return children
    }
}

const Protected = ({children,loggedIn}) => {
    if(loggedIn){
        return children
    }else{
        return(<Navigate to="/login" replace />)
    }
}

const mapStateToProps = state => (
    {
        loggedIn: Boolean(state.session.currentUserId),
    }
)

export const AuthRoute = connect(mapStateToProps)(Auth);
export const ProtectedRoute = connect(mapStateToProps)(Protected);



