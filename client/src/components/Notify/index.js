import { BellOutlined, FolderOutlined } from "@ant-design/icons";
import { Avatar, Badge, Button, Dropdown, Space } from "antd";
import "./Notify.scss";

function Notify() {
  const items = [
    {
      label: (
        <>
          <div className="notify__item">
            <div className="notify__item-icon">
              <FolderOutlined />
            </div>
            <div className="notify__item-content">
              <div className="notify__item-title">
                Bạn đã nhận được 1 thông báo mới
              </div>
              <div className="notify__item-time">8 phút trước</div>
            </div>
          </div>
        </>
      ),
      key: "0",
    },
    {
      label: (
        <div className="notify__item">
          <div className="notify__item-icon">
            <FolderOutlined />
          </div>
          <div className="notify__item-content">
            <div className="notify__item-title">
              Bạn đã nhận được 1 thông báo mới
            </div>
            <div className="notify__item-time">8 phút trước</div>
          </div>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div className="notify__item">
          <div className="notify__item-icon">
            <FolderOutlined />
          </div>
          <div className="notify__item-content">
            <div className="notify__item-title">
              Bạn đã nhận được 1 thông báo mới
            </div>
            <div className="notify__item-time">8 phút trước</div>
          </div>
        </div>
      ),
      key: "2",
    },
    {
      label: (
        <div className="notify__item">
          <div className="notify__item-icon">
            <FolderOutlined />
          </div>
          <div className="notify__item-content">
            <div className="notify__item-title">
              Bạn đã nhận được 1 thông báo mới
            </div>
            <div className="notify__item-time">8 phút trước</div>
          </div>
        </div>
      ),
      key: "3",
    },
    {
      label: (
        <div className="notify__item">
          <div className="notify__item-icon">
            <FolderOutlined />
          </div>
          <div className="notify__item-content">
            <div className="notify__item-title">
              Bạn đã nhận được 1 thông báo mới
            </div>
            <div className="notify__item-time">8 phút trước</div>
          </div>
        </div>
      ),
      key: "4",
    },
    {
      label: (
        <div className="notify__item">
          <div className="notify__item-icon">
            <FolderOutlined />
          </div>
          <div className="notify__item-content">
            <div className="notify__item-title">
              Bạn đã nhận được 1 thông báo mới
            </div>
            <div className="notify__item-time">8 phút trước</div>
          </div>
        </div>
      ),
      key: "5",
    },
    {
      label: (
        <div className="notify__item">
          <div className="notify__item-icon">
            <FolderOutlined />
          </div>
          <div className="notify__item-content">
            <div className="notify__item-title">
              Bạn đã nhận được 1 thông báo mới
            </div>
            <div className="notify__item-time">8 phút trước</div>
          </div>
        </div>
      ),
      key: "6",
    },
    {
      label: (
        <div className="notify__item">
          <div className="notify__item-icon">
            <FolderOutlined />
          </div>
          <div className="notify__item-content">
            <div className="notify__item-title">
              Bạn đã nhận được 1 thông báo mới
            </div>
            <div className="notify__item-time">8 phút trước</div>
          </div>
        </div>
      ),
      key: "7",
    },
    {
      label: (
        <div className="notify__item">
          <div className="notify__item-icon">
            <FolderOutlined />
          </div>
          <div className="notify__item-content">
            <div className="notify__item-title">
              Bạn đã nhận được 1 thông báo mới
            </div>
            <div className="notify__item-time">8 phút trước</div>
          </div>
        </div>
      ),
      key: "8",
    },
  ];
  return (
    <>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
        dropdownRender={(menu) => (
          <>
            <div className="notify__dropdown">
              <div className="notify__header">
                <div className="notify__header-title">
                  <BellOutlined />
                  &nbsp; Notification
                </div>
                <Button type="link"> View All</Button>
              </div>
              <div className="notify__body">{menu}</div>
            </div>
          </>
        )}
      >
        <Badge>
          <Avatar
            shape="square"
            size="middle"
            icon={<BellOutlined />}
            style={{ marginRight: "10px" }}
          />
        </Badge>
      </Dropdown>
    </>
  );
}
export default Notify;
