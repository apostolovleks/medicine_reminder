import React, { Component } from "react";

export default class Avatar extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className='position_element_in_div position_avatar'>
                <img src="/static/images/avatar_2.jpg"
                    alt="Space Cat's avatar"
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        objectFit: 'cover'
                    }} />

                <div className='position_element_in_div'>
                    <p className="input_name">User name</p>
                </div>
            </div>
        );
    }
}