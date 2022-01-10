import { useForm } from "antd/lib/form/Form";
import { useState } from "react";

export default function usePopup() {
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const show = (data = undefined) => {
    setVisible(true);
    form.setFieldsValue(data);
  };
  const close = () => {
    setVisible(false);
  };
  return { visible, showPopup: show, closePopup: close, form };
}
