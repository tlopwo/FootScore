import React, { useEffect, useState } from "react";

const NewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // Pobieranie newsów (na razie symulacja)
    const fetchNews = async () => {
      const fetchedNews = [
        { id: 1, title: "New's 1", date: "data1" },
        { id: 2, title: "New's 2", date: "data2" },
        { id: 3, title: "New's 3", date: "data3" },
      ];
      setNews(fetchedNews);
    };

    fetchNews();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Aktualności piłkarskie:</h2>
      <ul className="space-y-4">
        {news.map((item) => (
          <li key={item.id} className="border p-4 rounded shadow-sm">
            <h3 className="text-blue-600 font-bold">{item.title}</h3>
            <p className="text-gray-500 text-sm">{item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsSection;