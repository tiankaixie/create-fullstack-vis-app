import * as React from "react";
import Main from "./Main";
import { connect } from "react-redux";
import { getData } from "../actions";


class Base extends React.Component {
    componentDidMount() {
        this.props.getData();
    }

    render() {
        return <Main globalHeight={this.props.globalHeight} />;
    }
}

export default connect(null, { getData })(Base);
