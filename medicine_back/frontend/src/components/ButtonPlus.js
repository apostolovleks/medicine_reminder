import React, { Component } from "react";


export default class ButtonPlus extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
                <div className='position_element_in_div'>
                    <button className="click_me" onClick={this.props.onPushButton}>
                        {this.props.label}
                    </button>
                </div>
        );
    }
}