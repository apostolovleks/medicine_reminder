import React, { Component } from "react";
import { render } from "react-dom";
import Router from "./Router"
import { SnackbarProvider, closeSnackbar } from 'notistack'


export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {

    return (
      <>
        <SnackbarProvider
          hideIconVariant
          persist
          maxSnack={6}
          className="SnackbarItem-variantInfo"
          action={(snackbarId) => (
            <button className="btn-v" onClick={() => closeSnackbar(snackbarId)}>
              Done!
            </button>
          )}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }} />

        <Router />
      </>
    );
  }
}
const appDiv = document.getElementById("app");
render(<App />, appDiv);