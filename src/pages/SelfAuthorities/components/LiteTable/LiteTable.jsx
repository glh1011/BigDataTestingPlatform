import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Table } from '@icedesign/base';
import axios from 'axios';
import { connect } from 'react-redux';





class LiteTable extends Component {
  static displayName = 'LiteTable';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="lite-table">
        <IceContainer>
          {/* 对象转数组Array.from() */}
          <Table dataSource={Array.from(this.props.tableData)} hasBorder={false}>
            <Table.Column title="权限名称" dataIndex="name" width={100} />
            <Table.Column title="权限描述" dataIndex="description" width={100} />
            <Table.Column title="创建者" dataIndex="creator" width={100} />
          </Table>
        </IceContainer>
      </div>
    );
  }

  componentDidMount() {
    axios.get('/mock/selfAuthorities.json')
    .then((res)=>{
      console.log(res.data.data.authorities);
      const action = {
        type: 'dispaly_self_authorities',
        tableData: res.data.data.authorities
      }
      console.log(action);
      this.props.displaySelfAuthorities(action);
    })
    .catch(e => console.log("Oops, error", e))
  }

}

const mapStateToProps = (state) => {
  return {
    tableData: state.selfAuthorities.tableData
  }
}

const mapDispatch = (dispatch) => ({
  displaySelfAuthorities(action) {
    dispatch(action);
  }
})

export default connect(mapStateToProps, mapDispatch)(LiteTable)