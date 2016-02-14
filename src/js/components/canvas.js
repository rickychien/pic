/* react */
import React from 'react';

/* other */
import 'blueimp-canvas-to-blob';
import { fabric } from 'fabric';

export default class Canvas extends React.Component {

  constructor(props) {
    super(props);

    this.toBlob = this.toBlob.bind(this);
  }

  componentDidMount() {
    const size = 256;
    let canvas = this.canvas =
      new fabric.Canvas(React.findDOMNode(this.refs.canvas));
    canvas.setWidth(size);
    canvas.setHeight(size);
    canvas.backgroundColor = 'gray';

    fabric.Image.fromURL(this.props.imageUrl, (image) => {
      image.scaleToWidth(size);
      image.lockMovementX = true;
      image.lockRotation = true;
      image.lockScalingX = true;
      image.lockScalingY = true;
      image.lockUniScaling = true;
      let scaledHeight = image.scaleY * image.height;
      if (scaledHeight < size) {
        canvas.setHeight(scaledHeight);
        image.lockMovementY = true;
        image.selectable = false;
      } else {
        canvas.setHeight(size);
      }
      canvas.centerObject(image);
      canvas.add(image);
      canvas.moveTo(image, 0);
    });
  }

  toBlob(callback) {
    React.findDOMNode(this.refs.canvas).toBlob(callback);
  }

  render() {
    return (
      <canvas
        ref='canvas'
        width='512'
        height='512' />
    );
  }

}
