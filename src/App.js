import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
        console.log(typeof response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  

  useEffect(() => {
    const filtered = data.filter(post => post.title.toLowerCase().includes(searchData.toLowerCase()));
    setFilteredData(filtered);
  }, [searchData, data]);

  const handleSearch = (event) => {
    setSearchData(event.target.value);
  };

  const handleSort = () => {
    const sorted = [...filteredData].sort((a, b) => a.title.localeCompare(b.title));
    setFilteredData(sorted);
  };

  return (
    <div>
      <input type="text" placeholder="Search" value={searchData} onChange={handleSearch} />
      <button onClick={handleSort}>Sort by Title</button>

      {filteredData.length > 0 ? (
        filteredData.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))
      ) : (
        <p>No Data found.</p>
      )}

    </div>
  );
};

export default App;