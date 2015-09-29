/* react */
import React from 'react';
import Dropzone from 'react-dropzone';

/* other */
import FileSaver from 'filesaver.js';

/* components */
import ToolButton from './toolbutton';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.onCircle = this.onCircle.bind(this);
    this.onSquare = this.onSquare.bind(this);
    this.onCrop = this.onCrop.bind(this);
    this.onRotateLeft = this.onRotateLeft.bind(this);
    this.onRotateRight = this.onRotateRight.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this._drawRotateImage = this._drawRotateImage.bind(this);

    this.state = {
      file: {}
    };

    this.image = new Image();
    this.imageAngle = 0;
  }

  onCircle() {

  }

  onSquare() {

  }

  onCrop() {

  }

  onRotateLeft() {
    this.imageAngle -= 90;
    this._drawRotateImage(this.imageAngle);
  }

  onRotateRight() {
    this.imageAngle += 90;
    this._drawRotateImage(this.imageAngle);
  }

  _drawRotateImage(angle) {
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

  onSave() {
    let file = this.state.file;
    return fetch(file.preview)
    .then(response => {
      return response.blob();
    })
    .then(blob => {
      FileSaver.saveAs(blob, file.name);
    });
  }

  onDrop(files) {
    let file = files[0];

    this.setState({
      file: file
    });

    let image = this.image;
    image.addEventListener('load', () => {
      let context = React.findDOMNode(this.refs.canvas).getContext('2d');
      let width = context.canvas.width  = window.innerWidth - 55;
      let height = context.canvas.height = window.innerHeight;
      let drawX = width / 2 - image.width / 2;
      let drawY = height / 2 - image.height / 2;
      context.drawImage(image, drawX, drawY);
    }, false);
    image.src = file.preview;
  }

  render() {
    let style = {
      app: {
        display: '-webkit-flex; display: flex',
        width: '100%',
        height: '100%'
      },
      container: {
        display: '-webkit-flex; display: flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitAlignItems: 'center',
        WebkitJustifyContent: 'center',
        width: '100%',
        height: '100%'
      },
      upload: {
        display: '-webkit-flex; display: flex',
        alignItems: 'center',
        justifyContent: 'center',
        WebkitAlignItems: 'center',
        WebkitJustifyContent: 'center',
        margin: '0 auto',
        width: '400px',
        height: '400px',
        borderStyle: 'dashed',
        borderRadius: '10px',
        borderColor: 'gray',
        fontFamily: 'Helvetica Neue',
        fontSize: '25px',
        fontWeight: '700',
        color: 'gray'
      },
      toolbar: {
        background: '#1E2224',
        width: '55px',
        height: '100%'
      },
      hr: {
        margin: '0 10%',
        borderColor: '#32323E'
      }
    };
    let content = this.state.file.preview ? (
      <canvas ref='canvas'></canvas>
    ) : (
      <Dropzone onDrop={this.onDrop} style={style.upload}>
        <div>Drag & drop picture</div>
      </Dropzone>
    );

    return (
      <div style={style.app}>
        <div style={style.toolbar}>
          <ToolButton fontAwesome='picture-o' />
          <hr style={style.hr} />
          <ToolButton
            fontAwesome='circle-o'
            onClick={this.onCircle} />
          <ToolButton
            fontAwesome='square-o'
            onClick={this.onSquare} />
          <ToolButton
            fontAwesome='crop'
            onClick={this.onCrop} />
          <ToolButton
            fontAwesome='rotate-left'
            onClick={this.onRotateLeft} />
          <ToolButton
            fontAwesome='rotate-right'
            onClick={this.onRotateRight} />
          <ToolButton
            fontAwesome='save'
            onClick={this.onSave} />
        </div>
        <div style={style.container}>
          {content}
        </div>
      </div>
    );
  }

}
