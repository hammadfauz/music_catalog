import React from 'react';

class AsyncComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Component : null
    }
  }

  componentWillMount() {
    const self = this;
    if (!self.state.Component) {
      self.props.getComponent().then(Component => {
        AsyncComponent.Component = Component;
        self.setState({ Component });
      });
    }
  }

  render () {
    const { Component } = this.state;
    if (Component) {
      return <Component {...this.props} />
    }
    return null;
  }
};

export default AsyncComponent;
