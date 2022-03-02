import { useForm } from "antd/lib/form/Form";
import { useState } from "react";

export default function usePopup() {
  const [form] = useForm();
  const [visible, setVisible] = useState(false);
  const [action, setAction] = useState<"add" | "edit" | undefined>();
  const show = (action: "add" | "edit", data?: any) => {
    setVisible(true);
    setAction(action);
    form.setFieldsValue(data);
  };
  const close = () => {
    setVisible(false);
  };
  return { visible, showPopup: show, closePopup: close, form, action };
}
