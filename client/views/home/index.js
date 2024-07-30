import Tab1 from "./tab1.js";
import './style.less';
import {Link, Outlet} from "react-router-dom";
import {Space} from "antd";

const App = () => {
  return (<div className={'home'}>
    <Tab1 />
    <Space>
      <Link to={'/demo1'}>demo1</Link>
      <Link to={'/demo2'}>demo2</Link>
      <Link to={'/demo3'}>demo3</Link>
    </Space>

    <Outlet />
  </div>);
}

export default App;
