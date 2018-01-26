import React from 'react';

class Button extends React.Component {
  constructor (props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    if (typeof this.props.onClick === 'function') {
      this.props.onClick();
    }
  }

  render () {
    let styles = {
      main : {
        backgroundColor : this.props.primary?
          '#2196f3':this.props.secondary?
            '#c0ca33':'#ffffff',
        color : this.props.primary||this.props.secondary?
          '#ffffff':'#000000',
        border : this.props.primary||this.props.secondary?
          'none':'1px solid #cacaca',
        borderBottom : this.props.primary?
          '3px solid #217fc9':this.props.secondary?
            '3px solid #9e9d24':'3px solid #cacaca',
        borderRadius : '2px',
        padding : '8px 14px',
        cursor : 'pointer',
        outline : 'none'
      }
    };
    styles.main = Object.assign({},this.props.style,styles.main);
    return (<button style={styles.main}
      title={this.props.title||''}
      onClick={this.handleClick}>
      {this.props.label}
    </button>);
  }
}

export default Button;
