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
          style={{
            borderRadius: "7PX",
            borderColor: "white",
            backgroundColor: "transparent",
            color: "white",
          }}
          value={this.state.term}
          onChange={(event) => this.onIChange(event.target.value)}
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
