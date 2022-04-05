import { Button, Card, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FC } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthActions from "../../hooks/useAuthActions";
import { appPaths } from "../../utils/path";
export const LoginPage: FC = () => {
  const [form] = useForm();
  const { signIn, loading } = useAuthActions();
  const navigate = useNavigate();
  const { state } = useLocation();
  const onFinish = (values: any) => {
    const from = (state as any)?.from;
    signIn(values, () => {
      if (from) {
        navigate(from);
      } else {
        navigate(appPaths.workspaces);
      }
    });
  };
  return (
    <Row justify="center">
      <Card
        style={{ marginTop: "10%", width: "30%", minWidth: "400px" }}
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
