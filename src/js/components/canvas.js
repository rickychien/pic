/* react */
import React from 'react';

/* other */
import { fabric } from 'fabric';

export default class Canvas extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let width = this.props.containerWidth;
    let height = this.props.containerHeight;

    let canvas = new fabric.Canvas(React.findDOMNode(this.refs.canvas));
    canvas.setWidth(width);
    canvas.setHeight(height);
    canvas.controlsAboveOverlay = true;

    fabric.Image.fromURL(this.props.imageUrl, (image) => {
      canvas.centerObject(image);
      canvas.add(image);
      canvas.moveTo(image, 0);
    });

    // Draw dark hollow overlay
    const color = '#312b2b';
    const imageSize = 512;
    const opacity = 0.8
    let topOverlay = new fabric.Rect({
      fill: color,
      width: width,
      height: height / 2 - imageSize / 2,
      opacity: opacity,
      evented: false,
      selectable: false
    });
    let downOverlay = new fabric.Rect({
      fill: color,
      top: height / 2 + imageSize / 2,
      width: width,
      height: height / 2 - imageSize / 2,
      opacity: opacity,
      evented: false,
      selectable: false
    });
    let rightOverlay = new fabric.Rect({
      fill: color,
      left: width / 2 + imageSize / 2,
      top: height / 2 - imageSize / 2,
      width: width - (width / 2 + imageSize / 2),
      height: imageSize,
      opacity: opacity,
      evented: false,
      selectable: false
    });
    let leftOverlay = new fabric.Rect({
      fill: color,
      top: height / 2 - imageSize / 2,
      width: width / 2 - imageSize / 2,
      height: imageSize,
      opacity: opacity,
      evented: false,
      selectable: false
    });

    canvas.add(topOverlay);
    canvas.add(downOverlay);
    canvas.add(rightOverlay);
    canvas.add(leftOverlay);
  }

  render() {
    return (
      <canvas ref='canvas' />
    );
  }

}
