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
      console.log("여기는 업데이트");
    }
  }

  componentDidMount() {
    console.log(this.props, "진짜 확인");
    console.log(this.videoRef.current, "확인2");

    if (this.props && !!this.videoRef) {
      this.props.streamManager.addVideoElement(this.videoRef.current);
      console.log(this.videoRef.current, "확인3");
      console.log("여기는 마운트");
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
            style={{ width: "280px", height: "100%"}}
            autoPlay={true}
            ref={this.videoRef}
          />) : null } 
        
        { !this.guest && !this.rank && !this.gameStatus ? (
          <video
            style={{ width: "100%", height: "100%" }}
            autoPlay={true}
            ref={this.videoRef}
          />) : null }

        { !this.guest && !this.rank && this.gameStatus ? (
          <video
          style={{ width: "150px", height: "auto" }}
          autoPlay={true}
          ref={this.videoRef}
        />
        ) 
        : null }
      </div>
    );
  }
}
