import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Axios GET 요청 함수
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.yerimkim-domain.click:8080/users");
        console.log(response)
        setData(response.data); // 응답 데이터 설정
      } catch (err) {
        setError(err); // 에러 처리
      } finally {
        setLoading(false); // 로딩 상태 종료
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Data from API</h1>
      {data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>
              ID: {user.id}, Name: {user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
