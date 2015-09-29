/* react */
import React from 'react';

export default class ToolButton extends React.Component {

  constructor(props) {
    super(props);
  }

  onClick() {

  }

  render() {
    let size = this.props.size || 25;
    let color = this.props.color || '#E0E0E0';
    let fontAwesome = `fa fa-${this.props.fontAwesome}`;
    let style = {
      button: {
        display: 'block',
        margin: '35% auto',
        textAlign: 'center',
        fontSize: `${size}px`,
        color: color,
        borderStyle: 'none',
        borderColor: '#1E2224',
        backgroundColor: '#1E2224',
        cursor: 'pointer'
      }
    };

    return (
      <button type='button' style={style.button} onClick={this.onClick}>
        <i className={fontAwesome}></i>
      </button>
    );
  }

}
