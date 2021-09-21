import React, {useEffect} from "react";
import "./styles.css";
import initSqlJs from "sql.js";


export default class App extends React.Component {

  componentDidMount() {
    // sql.js needs to fetch its wasm file, so we cannot immediately instantiate the database
    // without any configuration, initSqlJs will fetch the wasm files directly from the same path as the js
    // see ../config-overrides.js

    Promise.all([initSqlJs()])
  }
  /**
   * Renders a single value of the array returned by db.exec(...) as a table
   */

  render() {
    return null
  }

}
