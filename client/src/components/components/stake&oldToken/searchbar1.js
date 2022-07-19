import React, { Component } from "react";
class StakeBar extends Component {
  constructor(props) {
    super(props);
    this.state = { term: "" };
  }
  render() {
    return (
      <React.Fragment>
        <input
          value={this.state.term}
          onChange={(event) => this.onIChange(event.target.value)}
          className="oldt-input"
        />
      </React.Fragment>
    );
  }
  onIChange(term) {
    this.setState({ term });
    this.props.onSTChange(term);
  }
}
export default StakeBar;
