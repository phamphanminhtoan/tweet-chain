import React from "react";
const { encodePaymentTransaction } = require("../../helpers/handle/payment");
import axios from "axios";
import { toastr } from "react-redux-toastr";

class Explore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>This is Explore Page</div>
         );
    }
}
 
export default Explore;