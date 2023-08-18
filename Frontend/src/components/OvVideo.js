import React, { Component } from "react";

export default class OpenViduVideoComponent extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
    this.guest = props.guest;
    this.rank = props.rank;
    this.gameStatus = props.gameStatus;
  }

  componentDidUpdate(props) {
    if (props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  componentDidMount() {

    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
    }
  }

  render() {
    return (
      <div>
        { this.guest ? (
          <video
            autoPlay={true}
            ref={this.videoRef}
          />) : null }

        { this.rank ? (
          <video 
            style={{ width: "280px", height: "27vh"}}
            autoPlay={true}
            ref={this.videoRef}
          />) : null } 
        
        { !this.guest && !this.rank && !this.gameStatus ? (
          <video
            style={{ width: "100%", height: "23vh" }}
            autoPlay={true}
            ref={this.videoRef}
          />) : null }

        { !this.guest && !this.rank && this.gameStatus ? (
          <video
          style={{ width: "200px", height: "20vh" }}
          autoPlay={true}
          ref={this.videoRef}
        />
        ) 
        : null }
      </div>
    );
  }
}
