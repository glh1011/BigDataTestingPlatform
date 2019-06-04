import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Balloon, Icon } from '@icedesign/base';
import IceImg from '@icedesign/img';
import Layout from '@icedesign/layout';
import Menu from '@icedesign/menu';
import FoundationSymbol from 'foundation-symbol';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { headerMenuConfig } from '../../../../menuConfig';
import Logo from '../Logo';

import './scss/dark.scss';
import './scss/light.scss';

class Header extends PureComponent {
  render() {
    const { theme, isMobile, className, style } = this.props;
    // console.info(this.props);

    return (
      <Layout.Header
        theme={theme}
        className={cx('ice-design-layout-header', className)}
        style={{ ...style }}
      >
        <Logo />

        <div className="ice-design-layout-header-menu">
          {/* Header 菜单项 begin */}
          {headerMenuConfig && headerMenuConfig.length > 0 ? (
            <Menu mode="horizontal" selectedKeys={[]}>
              {headerMenuConfig.map((nav, idx) => {
                const linkProps = {};
                if (nav.newWindow) {
                  linkProps.href = nav.path;
                  linkProps.target = '_blank';
                } else if (nav.external) {
                  linkProps.href = nav.path;
                } else {
                  linkProps.to = nav.path;
                }
                return (
                  <Menu.Item key={idx}>
                    {linkProps.to ? (
                      <Link {...linkProps}>
                        {nav.icon ? (
                          <FoundationSymbol type={nav.icon} size="small" />
                        ) : null}
                        {!isMobile ? nav.name : null}
                      </Link>
                    ) : (
                        <a {...linkProps}>
                          {nav.icon ? (
                            <FoundationSymbol type={nav.icon} size="small" />
                          ) : null}
                          {!isMobile ? nav.name : null}
                        </a>
                      )}
                  </Menu.Item>
                );
              })}
            </Menu>
          ) : null}
          {/* Header 菜单项 end */}

          {/* Header 右侧内容块 */}
          <Balloon
            trigger={
              <div className="ice-design-header-userpannel">
                <IceImg
                  height={40}
                  width={40}
                  src="https://img.alicdn.com/tfs/TB1L6tBXQyWBuNjy0FpXXassXXa-80-80.png"
                  // src="/public/timg.jpg"
                  className="user-avatar"
                />
                <div className="user-profile">
                  <span className="user-name">{this.props.name}</span>
                </div>
                <Icon
                  type="arrow-down-filling"


                  size="xxs"
                  className="icon-down"
                />
              </div>
            }
            closable={false}
            className="user-profile-menu"
          >
            <ul>
              <li className="user-profile-menu-item">
                <Link to="/userManagement/userInfo">
                  <FoundationSymbol type="person" size="small" />
                  个人信息
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/userManagement/changeSelfPwd">
                  <FoundationSymbol type="repair" size="small" />
                  重设密码
                </Link>
              </li>
              <li className="user-profile-menu-item">
                <Link to="/login">
                  <FoundationSymbol type="compass" size="small" />
                  退出
                </Link>
              </li>
            </ul>
          </Balloon>
        </div>
      </Layout.Header>
    );
  }
}

export default connect(state => state.login.loginUser)(Header);
