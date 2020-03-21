import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Form,
  Input,
  Icon
} from 'antd';

function AddForm(props) {

  let FormData;

  // props.form
  const { getFieldDecorator, validateFields, getFieldValue, setFieldsValue } = props.form;
  // dispatch to props
  const { } = props;
  // state to props
  const { creator } = props;
  // 获得当前用户
  const creatorJS = creator ? creator.toJS() : [];

  return (
    <Form>
      <Form.Item>
        {getFieldDecorator('name', {
          initialValue: ''
        })(
          <Input placeholder="输入员工类别名" />,
        )}
      </Form.Item>
      <Form.Item>
        {getFieldDecorator('describe', {
          initialValue: ''
        })(
          <Input placeholder="输入类别描述" />,
        )}
      </Form.Item>
    </Form>
  )
}


const mapStateToProps = (state) => ({
  creator: state.getIn(['userList', 'userItem','user'])
})

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const WrappedNormalAddForm = Form.create()(AddForm);
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(WrappedNormalAddForm))