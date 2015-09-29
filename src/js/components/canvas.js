/* react */
import React from 'react';

export default class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.drawImage = this.drawImage.bind(this);
    this.drawRotateImage = this.drawRotateImage.bind(this);

    this.drawImage(props.imageUrl);
  }

  drawImage(url) {
    let image = this.image = new Image();
    image.addEventListener('load', () => {
      let context = React.findDOMNode(this.refs.canvas).getContext('2d');
      let width = context.canvas.width  = window.innerWidth - 55;
      let height = context.canvas.height = window.innerHeight;
      let drawX = width / 2 - image.width / 2;
      let drawY = height / 2 - image.height / 2;
      context.drawImage(image, drawX, drawY);
    }, false);
    image.src = url;
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
      <canvas ref='canvas'></canvas>
    );
  }

}
