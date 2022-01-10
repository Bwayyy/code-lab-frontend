import { Button, Card, Form, Input, message, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FirebaseError } from "firebase/app";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getErrorMessages } from "../../firebase/error-handling/getErrorMessages";
import useRegister from "../../hooks/useRegister";
import { appPaths } from "../../utils/path";
export const RegisterPage: FC = () => {
  const navigate = useNavigate();
  const { register, loading } = useRegister();
  const [form] = useForm();
  const onFinish = (values: any) => {
    register(values)
      .then(() => navigate(appPaths.login))
      .catch((err: FirebaseError) => {
        message.error(getErrorMessages(err));
      });
  };
  return (
    <Row justify="center">
      <Card
        title="Register"
        actions={[
          <Button
            type="primary"
            style={{ width: "100%" }}
            loading={loading}
            onClick={() => {
              form.submit();
            }}
          >
            Register
          </Button>,
          <Link to={appPaths.login}>
            <Button type="text" style={{ width: "100%" }}>
              Cancel
            </Button>
          </Link>,
        ]}
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
          <Form.Item
            name="userDisplayName"
            label="User Display Name"
            rules={[{ required: true }]}
          >
            <Input placeholder="Display Name in App" />
          </Form.Item>
        </Form>
      </Card>
    </Row>
  );
};
