import { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');
  const [err, setErr] = useState(null);
  const [load, setLoad] = useState(false);

  const fetchData = async () => {
    setLoad(true);
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) throw new Error('Fetch failed');

      const result = await res.json();
      setData(result);
      setErr(null);
    } catch (e) {
      setErr(e.message);
    } finally {
      setLoad(false); // ✅ fixed typo and better placement
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = q
    ? data.filter(d =>
        d.name.toLowerCase().includes(q.toLowerCase())
      )
    : data;

  return (
    <div>
      <h1>User Data</h1>

      {err && <div>Error: {err}</div>}

      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search"
      />

      {load ? (
        <div>Loading...</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>City</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length ? (
              filtered.map(({ id, name, email, address }) => (
                <tr key={id}>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{address.city}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No results</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      <button onClick={fetchData}>Refresh</button>
    </div>
  );
};

export default DataFetcher;








----MAIN.JSX----

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataFetcher from './App';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
