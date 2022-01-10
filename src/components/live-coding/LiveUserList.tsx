import { List, Space } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { FC } from "react";
import { AiOutlineUser } from "react-icons/ai";
import useLiveCodingUsersCollection from "../../firebase/collections/useLiveCodingUsersCollection";
type LiveUserListProps = {
  workspaceId: string;
  liveCodingId: string;
};
const LiveUserList: FC<LiveUserListProps> = ({ workspaceId, liveCodingId }) => {
  const { users } = useLiveCodingUsersCollection(workspaceId, liveCodingId);
  return (
    <List
      header="Current Users"
      dataSource={users}
      renderItem={(item) => {
        return (
          <List.Item>
            <Space direction="horizontal">
              <Avatar size="small" icon={<AiOutlineUser />} />
              {item.userName}
            </Space>
          </List.Item>
        );
      }}
    ></List>
  );
};
export default LiveUserList;
