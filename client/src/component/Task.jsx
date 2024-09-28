import React, { useEffect } from "react";
import axios from 'axios';

const Task = ({ token }) => {

  useEffect(() => {
    if (token) {
      fetchData(token);
    }
  }, [token]);

  const fetchData = async (token) => {
    console.log('token prop ===========++> ', token)
    try {
      const res = await axios.get('http://localhost:8000/taskList', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });
      console.log('response data ============> ', res.data);
    } catch (error) {
      // Log the error response
      if (error.response) {
        console.log('Error response:', error.response.data);
        console.log('Status code:', error.response.status);
      } else {
        console.log('Error:', error.message);
      }
    }
  };

  return (
    <div>
      <h1>List of todo</h1>
    </div>
  );
}

export default Task;
