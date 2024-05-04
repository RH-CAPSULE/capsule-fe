import React from 'react';
import axios from 'axios';
import { API_DOMAIN } from '../static';

const TestPage = () => {
  const test = async () => {
    const response = await axios.post(`${API_DOMAIN}/auth/signin`, {
      email: 'ryoon50@gmail.com',
      password: '1234',
    });
    console.log(response.data);
  };

  return (
    <div>
      <button type="button" onClick={test}>
        api1
      </button>
      무언가 문제가 있제?
    </div>
  );
};

export default TestPage;
