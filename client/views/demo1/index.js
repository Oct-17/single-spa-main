import {useEffect} from "react";

const Demo1 = () => {
  useEffect(() => {
    fetch(`${__webpack_public_path__ || '/'}api/getList`, {
      method: 'post'
    }).then(res => {
      return res.json();
    }).then(data => {
      console.log(data);
    });
  }, []);
  return <div>Demo1</div>
}


export default Demo1;
