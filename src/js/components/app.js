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

    this.state = {
      file: {}
    };
  }

  onCircle() {

  }

  onSquare() {

  }

  onCrop() {

  }

  onRotateLeft() {

  }

  onRotateRight() {

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

    let img = new Image();
    img.addEventListener('load', () => {
      let ctx = React.findDOMNode(this.refs.canvas).getContext('2d');
      let width = ctx.canvas.width  = window.innerWidth * 0.8;
      let height = ctx.canvas.height = window.innerHeight * 0.8;
      ctx.drawImage(img,
        width / 2 - img.width / 2, height / 2 - img.height / 2);
    }, false);
    img.src = file.preview;
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
        width: '200px',
        height: '200px',
        borderStyle: 'dashed',
        borderRadius: '10px',
        borderColor: 'gray',
        fontFamily: 'Helvetica Neue',
        fontWeight: '700'
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
