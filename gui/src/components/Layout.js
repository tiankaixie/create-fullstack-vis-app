import * as React from "react";
import MenuBar from "./MenuBar";
import Home from "./Home";
import {connect} from "react-redux";
import {getData} from "../actions";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import About from "./About";
import UIComponents from "./UIComponents";
import VISComponents from "./VISComponents";

const mapStateToProps = (state) => {
  return {};
};

class Layout extends React.Component {
  componentDidMount() {
    this.props.getData("graphBasic");
  }
  render() {
    return (
      <BrowserRouter>
        <MenuBar />
        <Switch>
          <Route path="/" exact component={UIComponents}>
          </Route>
          <Route path="/viscomponents" exact component={VISComponents}>
          </Route>
          <Route path="/about" exact component={About}>
          </Route>

        </Switch>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, { getData })(Layout);
