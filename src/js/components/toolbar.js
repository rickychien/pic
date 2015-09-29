/* react */
import React from 'react';

/* components */
import ToolButton from './toolbutton';

export default class Toolbar extends React.Component {

  constructor(props) {
    super(props);
  }

  _onDrop(files) {
    console.log('Received files: ', files);
  }

  render() {
    let style = {
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

    return (
      <div style={style.toolbar}>
        <ToolButton fontAwesome='picture-o' />
        <hr style={style.hr} />
        <ToolButton fontAwesome='circle-o' />
        <ToolButton fontAwesome='square-o' />
        <ToolButton fontAwesome='crop' />
        <ToolButton fontAwesome='rotate-left' />
        <ToolButton fontAwesome='rotate-right' />
        <ToolButton fontAwesome='save' />
      </div>
    );
  }

}
