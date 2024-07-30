import '../config/public-path.js';
import {createRoot} from 'react-dom/client';
import {RouterProvider} from "react-router-dom";
import {ConfigProvider} from 'antd';
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn';

// 这里要使用alias配置的路径，不然会报错。
import App from "client/views/home";
import router from "./router.js";

let root = null;

const render = (props) => {
  let container = document.querySelector('#main-app');
  if (props.container) {
    container = props.container.querySelector('#main-app');
  }

  root = createRoot(container);

  root.render(<ConfigProvider
    locale={zhCN}
  >
    <RouterProvider router={router}/>
  </ConfigProvider>);
};

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

/**
 * bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在 unmount 阶段被销毁的应用级别的缓存等。
 */
export async function bootstrap() {
  console.log('react app bootstraped');
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount(props) {
  console.log('asss::', props);
  console.log(props?.getGlobalState());
  render(props);
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  if (root) {
    root.unmount();
  }
}

