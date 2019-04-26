import React, { Component } from "react";

export default class MainData extends Component {
  static displayName = "MainData";

  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={styles.wrapper}>
        <div style={styles.content}>
          <div style={styles.contentItem}>
            <div style={styles.contentNum}>
              <span style={styles.bigNum}>{this.props.cpu}</span>
              {/* <span style={styles.symbol}>+</span> */}
            </div>
            <div style={styles.contentDesc}>— CPU —</div>
          </div>
          <div style={styles.contentItem}>
            <div style={styles.contentNum}>
              <span style={styles.bigNum}>{this.props.mem}G</span>
              {/* <span style={styles.symbol}>+</span> */}
            </div>
            <div style={styles.contentDesc}>— 内存 —</div>
          </div>
          <div style={styles.contentItem}>
            <div style={styles.contentNum}>
              <span style={styles.bigNum}>{this.props.disk}G</span>
              {/* <span style={styles.symbol}>+</span> */}
            </div>
            <div style={styles.contentDesc}>— 硬盘资源 —</div>
          </div>
        </div>
      </div>
    );
  }
}

const styles = {
  wrapper: {
    background: "#F4F4F4"
  },
  content: {
    width: "100%",
    height: 220,
    maxWidth: 1024,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    margin: "0 auto"
  },
  contentItem: {},
  contentNum: {
    display: "flex",
    alignItems: "center"
  },
  bigNum: {
    color: "#333",
    fontSize: 68
  },
  symbol: {
    color: "#333",
    fontSize: 40,
    marginLeft: 10
  },
  contentDesc: {
    color: "#666666",
    fontSize: 16,
    textAlign: "center",
    marginTop: 6
  }
};
