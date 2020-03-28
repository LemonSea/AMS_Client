import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import {
  HeaderWrapper,
  Logo,
  Nav,
  NavItem,
  Addition,
  Button,
  SearchWrapper,
  NavSearch,
  SearchBox,
  SearchForm,
  PositionSel,
  BtnSearch
} from './style';

const Header = (props) => {
  return (
    <div>
      <HeaderWrapper>
        <Logo href='/' />
        <Nav>
          <NavItem className='left'></NavItem>
          <NavItem className='left'>首页</NavItem>
          <NavItem className='left'>服务人员</NavItem>
          <NavItem className='left'>服务公司</NavItem>
          <NavItem className='right'>我要开公司</NavItem>
        </Nav>
        <Addition>
          <Button className='login'>登录</Button>
          <Button>注册</Button>
        </Addition>
      </HeaderWrapper>
      <SearchWrapper >
        <SearchBox>
          <CSSTransition
            in={props.focused}
            timeout={200}
            classNames="show"
          >
          <SearchForm
            className={props.focused ? 'focused' : ''}
            onMouseEnter={props.handleInputFocus}
            onMouseLeave={props.handleInputBlur}
          >
            <PositionSel>
              服务类型
            <span className="iconfont">&#xe630;</span>
            </PositionSel>
            <NavSearch
            ></NavSearch>
            <BtnSearch>搜索</BtnSearch>
          </SearchForm>
          </CSSTransition>
        </SearchBox>
      </SearchWrapper>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    focused: state.focused
  }
}
const mapDispathToProps = (dispatch) => {
  return {
    handleInputFocus() {
      const action = {
        type:'search_focus'
      };
      dispatch(action)
    },
    handleInputBlur() {
      const action = {
        type:'search_blur'
      };
      dispatch(action)
    }
  }
}

export default connect(mapStateToProps, mapDispathToProps)(Header);