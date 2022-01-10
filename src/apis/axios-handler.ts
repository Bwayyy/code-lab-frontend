import { message } from "antd";
import { AxiosError } from "axios";

export const handleError = ({ response }: AxiosError) => {
  message.error(response?.data.message);
};
