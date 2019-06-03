import React, { Component } from 'react';

export default class AblityItems extends Component {
  static displayName = 'AblityItems';

  static propTypes = {};

  static defaultProps = {};

  render() {
    return (
      <div className="hy-ability" style={style.hyAbilityStyles}>
        <div className="hy-ability-item" style={style.hyAbilityItemStyle}>
          <img
            alt=""
            src={require('../../../public/welcome1.svg')}
            style={style.hyAbilityItemImgStyle}
          />
          <h3 style={style.hyAbilityItemTitleStyle}>登录成功</h3>
          <p style={style.hyAbilityItemSubtitleStyle}>
            欢迎您使用大数据测评平台
          </p>
        </div>

        {/* <div className="hy-ability-item" style={style.hyAbilityItemStyle}>
          <img
            alt=""
            src={require('../../../public/welcome2.svg')}
            style={style.hyAbilityItemImgStyle}
          />
          <h3 style={style.hyAbilityItemTitleStyle}>政策扶持</h3>
          <p style={style.hyAbilityItemSubtitleStyle}>
            物料、返佣、品牌支持、运营收益
          </p>
        </div> */}

        {/* <div className="hy-ability-item" style={style.hyAbilityItemStyle}>
          <img
            alt=""
            src={require('../../../public/welcome3.svg')}
            style={style.hyAbilityItemImgStyle}
          />
          <h3 style={style.hyAbilityItemTitleStyle}>资源整合</h3>
          <p style={style.hyAbilityItemSubtitleStyle}>
            门禁停车、智能家居、生活服务
          </p>
        </div> */}
      </div>
    );
  }
}

const style = {
  hyAbilityStyles: {
    textAlign: 'center',
    background: '#fff',
    padding: '40px 0',
  },
  hyAbilityItemStyle: {
    display: 'inline-block',
    width: '360px',
    margin: '35px 0',
    verticalAlign: 'top',
  },
  hyAbilityItemImgStyle: {
    height: '62px',
  },
  hyAbilityItemTitleStyle: {
    fontSize: '20px',
    lineHeight: '26px',
    color: '#333',
    fontWeight: '400',
    margin: '18px 0 10px',
  },
  hyAbilityItemSubtitleStyle: {
    fontSize: '16px',
    color: '#999',
    lineHeight: '21px',
  },
};