/* react */
import React from 'react';

export default class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.drawImage = this.drawImage.bind(this);
    this.drawRotateImage = this.drawRotateImage.bind(this);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseOut = this.onMouseOut.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);

    this.drawImage(props.imageUrl);
    this.isMouseDown = false;
  }

  componentDidMount() {
    this.canvas = React.findDOMNode(this.refs.canvas);
  }

  drawImage(url) {
    let image = this.image = new Image();
    image.addEventListener('load', () => {
      let context = this.canvas.getContext('2d');
      let width = context.canvas.width  = window.innerWidth - 55;
      let height = context.canvas.height = window.innerHeight;
      let drawX = width / 2 - image.width / 2;
      let drawY = height / 2 - image.height / 2;
      context.drawImage(image, drawX, drawY);
    }, false);
    image.src = url;
  }

  onMouseUp(evt) {
    this.canvasMouseX = evt.clientX;
    this.canvasMouseY = evt.clientY;
    this.isMouseDown = false;
  }

  onMouseDown(evt) {
    this.lastX = evt.clientX;
    this.lastY = evt.clientY;
    this.isMouseDown = true;
  }

  onMouseOut(evt) {
    this.canvasMouseX = evt.clientX;
    this.canvasMouseY = evt.clientY;
    this.isMouseDown = false;
  }

  onMouseMove(evt) {
    let canvas = this.canvas;
    let context = this.canvas.getContext('2d');
    let canvasMouseX = this.canvasMouseX = evt.clientX;
    let canvasMouseY = this.canvasMouseY = evt.clientY;
    let lastX = this.lastX;
    let lastY = this.lastY;

    if (this.isMouseDown) {
      var dx = Math.abs(lastX - canvasMouseX);
      var dy = Math.abs(lastY - canvasMouseY);
      var midX = (lastX + canvasMouseX) / 2;
      var midY = (lastY + canvasMouseY) / 2;
      var r = Math.sqrt(dx * dx + dy * dy) / 2;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.beginPath();
      context.arc(midX, midY, r, 0, 2 * Math.PI, true);
      context.stroke();
    }
  }

  drawRotateImage(angle) {
    let context = React.findDOMNode(this.refs.canvas).getContext('2d');
    let canvas = context.canvas;
    let image = this.image;
    let width = canvas.width;
    let height = canvas.height;

    context.clearRect(0, 0 ,width, height);
    context.save();
    context.translate(width / 2, height / 2);
    context.rotate(angle * Math.PI / 180);
    context.drawImage(image, -(image.width / 2), -(image.height / 2));
    context.restore();
  }

  render() {
    return (
      <canvas ref='canvas'
        onMouseUp={this.onMouseUp}
        onMouseDown={this.onMouseDown}
        onMouseOut={this.onMouseOut}
        onMouseMove={this.onMouseMove} />
    );
  }

}
