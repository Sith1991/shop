import React from 'react';
import {connect} from "react-redux";
import {Main} from "./index";

const MainContainer = () => {

    return (
       <Main />
    )
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);