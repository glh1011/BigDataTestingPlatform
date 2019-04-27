/* eslint no-unused-expressions: 0 */
import React, { Component } from "react";
import { Icon, Input } from "@icedesign/base";
export default class CellEditor extends Component {
  static displayName = "CellEditor";

  constructor(props) {
    super(props);

    this.tempValue = "";
    this.state = {
      editMode: false,
      value: props.value || ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if ("value" in nextProps) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  editThisCell = () => {
    // 缓存数据以便回滚
    this.tempValue = this.state.value;

    this.setState({
      editMode: true
    });
  };

  onValueChange = value => {
    this.setState({
      value
    });
  };

  updateValue = () => {
    if (
      (this.props.valueKey == "disk" && this.state.value >= 50) ||
      (this.props.valueKey == "cpu" && this.state.value > 0) ||
      (this.props.valueKey == "mem" && this.state.value >= 4) ||  (this.props.valueKey == "num" && this.state.value > 0) 
    ) {
      this.setState({
        editMode: false
      });
      const { index, valueKey } = this.props;
      const { value } = this.state;

      this.props.onChange && this.props.onChange(index, valueKey, value);
    }
  };

  rollBackThisCell = () => {
    this.setState({
      value: this.tempValue,
      editMode: false
    });
    this.tempValue = "";
  };

  render() {
    const { value, editMode } = this.state;

    if (editMode) {
      return (
        <div className="celleditor">
          <Input
            required
            style={styles.cellInput}
            value={value}
            onChange={this.onValueChange}
          />
          <span
            style={styles.operationIcon}
            title="确定"
            onClick={this.updateValue}
          >
            <Icon size="xs" type="select" />
          </span>
          <span
            style={styles.operationIcon}
            title="撤销"
            onClick={this.rollBackThisCell}
          >
            <Icon size="xs" type="refresh" />
          </span>
          <div
            style={{
              display:
                this.props.valueKey == "disk" && value < 50 ? "block" : "none",
              color: "red"
            }}
          >
            硬盘资源的大小必须大于50G
          </div>
          <div
            style={{
              display:
                this.props.valueKey == "mem" && value < 4 ? "block" : "none",
              color: "red"
            }}
          >
            内存资源的大小必须大于4G
          </div>
          <div
            style={{
              display:
                !new RegExp("^[0-9]*$").test(value) || value <= 0
                  ? "block"
                  : "none",
              color: "red"
            }}
          >
            输入值为数字，且要大于0
          </div>
        </div>
      );
    }
    return (
      <div className="celleditor">
        <span>{value}</span>
        <span
          style={
            this.props.index > 1 ? styles.operationIcon : { display: "none" }
          }
          className="celleditor-trigger"
          title="编辑"
          onClick={this.editThisCell}
        >
          <Icon size="xs" type="edit" />
        </span>
      </div>
    );
  }
}

const styles = {
  cellInput: {
    width: "calc(100% - 44px)"
  },
  operationIcon: {
    marginLeft: "10px",
    color: "#999",
    cursor: "pointer"
  }
};
