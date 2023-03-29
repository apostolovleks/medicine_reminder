import React, {Component} from "react";
import { BrowserRouter, Routes, Route, Link, Redirect } from "react-router-dom";
import SignUp from "./SignUp";
import Home from "./Home";

export default class Router extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        return (

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/auth" element={<SignUp />} />
            </Routes>
          </BrowserRouter>
          );
    }
}