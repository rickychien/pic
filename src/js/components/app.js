/* react */
import React from 'react';
import Dropzone from 'react-dropzone';

/* components */
import Toolbar from './toolbar';

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.onDrop = this.onDrop.bind(this);

    this.state = {
      file: {}
    };
  }

  onDrop(files) {
    this.setState({
      file: files[0]
    });
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
      }
    };
    let content = this.state.file.preview ? (
      <div>
        <img src={this.state.file.preview} />
      </div>
    ) : (
      <Dropzone onDrop={this.onDrop} style={style.upload}>
        <div>Drag & drop picture</div>
      </Dropzone>
    );

    return (
      <div style={style.app}>
        <Toolbar />
        <div style={style.container}>
          {content}
        </div>
      </div>
    );
  }

}
