import React, { Component } from 'react';

export default class OpenViduVideoComponent extends Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentDidUpdate(props) {
        if (props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
            console.log('여기는 업데이트')
        }
    }

    componentDidMount() {
        console.log(this.props, "진짜 확인")
        console.log(this.videoRef.current, "확인2")

        if (this.props && !!this.videoRef) {
            this.props.streamManager.addVideoElement(this.videoRef.current);
            console.log(this.videoRef.current, "확인3")
            console.log('여기는 마운트')
        }
    }

    render() {
        return <video autoPlay={true} ref={this.videoRef} />;
    }

}
