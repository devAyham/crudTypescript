import { Menu } from "antd";
import { Header } from "antd/es/layout/layout";

const Headerbar = () => {
  return (
    <>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={new Array(15).fill(null).map((_, index) => {
            const key = index + 1;
            return {
              key,
              label: `nav ${key}`,
            };
          })}
        />
      </Header>
    </>
  );
};
export default Headerbar;
