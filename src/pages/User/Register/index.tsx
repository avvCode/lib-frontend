import Footer from '@/components/Footer';
import { userRegisterUsingPOST } from '@/services/lib-backend/userController';
import { Helmet, history } from '@@/exports';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { Button, Form, Input, message, Space } from 'antd';
import React from 'react';
import Settings from '../../../../config/defaultSettings';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const Register: React.FC = () => {
  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const [form] = Form.useForm();

  const onFinish = async (values: API.UserRegisterRequest) => {
    const res = await userRegisterUsingPOST(values);
    if (res.code === 0) {
      message.success('注册成功');
      history.push('/user/login');
    } else {
      message.error(res.message);
    }
  };
  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {'注册'}- {Settings.title}
        </title>
      </Helmet>

      <div
        style={{
          margin: '0 auto',
          flex: '1',
          padding: '32px 0',
        }}
      >
        <div
          style={{
            marginBottom: '30px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '35px',
            marginLeft: '100px',
          }}
        >
          注册
        </div>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            minWidth: 400,
            maxWidth: '75vw',
          }}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="姓名"
            rules={[
              {
                required: true,
                message: '请输入姓名',
              },
            ]}
          >
            <Input placeholder={'请输入正确的姓名'} />
          </Form.Item>
          <Form.Item
            name="idCard"
            label="身份证号"
            rules={[
              {
                required: true,
                message: '请输入身份证',
              },
            ]}
          >
            <Input placeholder={'请输入正确的身份证'} />
          </Form.Item>
          <Form.Item
            name="account"
            label="账号"
            rules={[
              {
                required: true,
                message: '请输入账号',
              },
            ]}
          >
            <Input placeholder={'设置您的账号'} />
          </Form.Item>

          <Form.Item
            name="password"
            label="密码"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
            hasFeedback
          >
            <Input.Password placeholder={'请设置您的密码'} />
          </Form.Item>

          <Form.Item
            name="checkPassword"
            label="确认密码"
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: '请确认您的密码!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('两次密码不匹配!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder={'请设置您的密码'} />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Space size="large">
              <Button type="primary" htmlType="submit">
                注册
              </Button>
              <Button type="default" htmlType="reset">
                清空
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
