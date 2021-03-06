/* react */
import React from 'react';
import Dropzone from 'react-dropzone';

/* other */
import FileSaver from 'filesaver.js';

/* components */
import ToolButton from './toolbutton';
import Canvas from './canvas';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);
    this.onSave = this.onSave.bind(this);

    this.state = {
      file: {}
    };
  }

  onDrop(files) {
    this.setState({
      file: files[0]
    });
  }

  onSave() {
    if (this.refs.canvas) {
      this.refs.canvas.toBlob(blob => {
        FileSaver.saveAs(blob, this.state.file.name);
      });
    }
  }

  render() {
    let style = {
      app: {
        display: 'flex',
        width: '100%',
        height: '100%'
      },
      container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#1E2224'
      },
      upload: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
      <Canvas
        ref='canvas'
        imageUrl={this.state.file.preview} />
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
            fontAwesome='save'
            onClick={this.onSave} />
        </div>
        <div
          ref='container'
          style={style.container}>
          {content}
        </div>
      </div>
    );
  }

}
