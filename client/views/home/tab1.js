import {useState} from "react";
import {Button} from 'antd';

const Tab1 = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <h1>micro</h1>
      <Button type={'primary'} onClick={() => {
        setCount(count + 1);
      }}>click{count}</Button>123123
    </div>
  );
};

export default Tab1;
