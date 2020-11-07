import React, { Component, useRef, useState } from "react";
import "../styles/App.css";
class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      x: 0,
      y: 0,
      left: "0px",
      top: "0px",
      renderBall: false
    };
    this.handleArrowClick = this.handleArrowClick.bind(this);
    this.startGame = this.startGame.bind(this);
    this.renderChoice = this.renderChoice.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
  componentDidMount() {
    document.addEventListener("keydown", this.handleArrowClick);
  }

  componentWillUnmount() {
    clearInterval(this.id);
    document.removeEventListener("keydown", this.handleArrowClick);
  }

  renderChoice() {
    let mystyle = {
      left: this.state.left,
      top: this.state.top
    };
    if (this.state.renderBall) {
      return <div className="ball" style={mystyle}></div>;
    } else
      return (
        <button onClick={this.startGame} className="start">
          start
        </button>
      );
  }
  startTimer() {
    this.id = setInterval(() => {
      this.setState((prevState) => ({
        time: prevState.time + 1
      }));
    }, 1000);
  }

  startGame() {
    if (!this.state.renderBall) {
      this.setState({ renderBall: true }, () => {
        this.startTimer();
      });
    }
  }
  handleArrowClick(event) {
    if (this.state.x === 250 && this.state.y === 250) {
      clearInterval(this.id);
    }
    if (event.keyCode === 39) {
      let nx = Number(this.state.x + 5);
      let Ball = {
        left: `${nx}px`,
        top: `${this.state.y}px`
      };
      this.setState({ x: nx, left: Ball.left, top: Ball.top });
    } else if (event.keyCode === 40) {
      let ny = Number(this.state.y + 5);
      let Ball = {
        left: `${this.state.x}px`,
        top: `${ny}px`
      };
      this.setState({ y: ny, left: Ball.left, top: Ball.top });
    } else if (event.keyCode === 37) {
      let nx = Number(this.state.x - 5);
      let Ball = {
        left: `${nx}px`,
        top: `${this.state.y}px`
      };
      this.setState({ x: nx, left: Ball.left, top: Ball.top });
    } else if (event.keyCode === 38) {
      let ny = Number(this.state.y - 5);
      let Ball = {
        left: `${this.state.x}px`,
        top: `${ny}px`
      };
      this.setState({ y: ny, left: Ball.left, top: Ball.top });
    }
  }
  render() {
    return (
      <>
        <div className="playground">{this.renderChoice()}</div>;
        <div className="heading-timer">
          {this.state.x === 250 && this.state.y === 250
            ? this.state.prev
            : this.state.time}
        </div>
        <div className="hole"></div>
      </>
    );
  }
}

export default Timer;
