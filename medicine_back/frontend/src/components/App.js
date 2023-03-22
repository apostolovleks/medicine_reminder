import React, { Component } from "react";
import { render } from "react-dom";
import Button from '@mui/material/Button';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <Button variant="contained">Hello World</Button>
    </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);