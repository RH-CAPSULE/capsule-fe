import React from 'react';
import axios from 'axios';
import { handleConfirm } from 'react-handle-alert';
import { API_DOMAIN } from '../static';

const TestPage = () => {
  const test = async () => {
    const response = await axios.get(`${API_DOMAIN}/test`);
    console.log(response.data);
  };

  const login = async () => {
    if (!(await handleConfirm('로그인 하시겠습니까?'))) return;
    const response = await axios.post(`${API_DOMAIN}/auth/signin`, {
      email: 'ryoon50@gmail.com',
      password: '1234',
    });
    console.log(response.data);
  };

  return (
    <div>
      <button type="button" onClick={login}>
        로그인
      </button>
      <button type="button" onClick={test}>
        api1
      </button>
      무언가 문제가 있제?
    </div>
  );
};

export default TestPage;
