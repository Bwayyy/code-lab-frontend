import { Button, Card, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAuthActions from "../../hooks/useAuthActions";
import { appPaths } from "../../utils/path";
export const LoginPage: FC = () => {
  const [form] = useForm();
  const { signIn, loading } = useAuthActions();
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    signIn(values, () => navigate(appPaths.workspaces));
  };
  return (
    <Row justify="center">
      <Card
        title="Login"
        actions={[
          <Button
            type="primary"
            loading={loading}
            style={{ width: "100%" }}
            onClick={() => {
              form.submit();
            }}
          >
            Login
          </Button>,
          <Link to="/register">
            <Button type="text" style={{ width: "100%" }}>
              Register
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
        </Form>
      </Card>
    </Row>
  );
};
