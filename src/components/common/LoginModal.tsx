import { Form, Input, Modal } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC } from "react";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { closeLogin } from "../../reducers/globalSlice";
export const LoginModal: FC = () => {
  const dispatch = useDispatch();
  const [form] = useForm();
  const { signIn, loading } = useAuth();
  const onFinish = (values: any) => {
    signIn(values);
  };
  return (
    <Modal
      maskClosable={false}
      visible={true}
      onCancel={() => {
        dispatch(closeLogin());
      }}
      title="Login"
      okText="Login"
      onOk={() => form.submit()}
      okButtonProps={{ loading }}
      destroyOnClose
    >
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item name="email" label="Email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true }]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};
