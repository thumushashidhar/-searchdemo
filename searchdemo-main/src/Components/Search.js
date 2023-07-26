import { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
var data = require("../data.json");

export default function App() {
  const [value, setValue] = useState("");
  const [info, setInfo] = useState([]);
  var flag = false;
  useEffect(() => {
    if (value.length >= 1) {
      axios
        .get("http://127.0.0.1:8000/get", { params: { value: value } })
        .then((res) => {
          console.log(res);
          setInfo(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }    
  }, [value]);
  if (value.length >= 1) {
    flag = true;
  }
  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);

    console.log("search ", searchTerm);
  };
  return (
    <div className="App">
      <div className="container">
        <div className="search-bar">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Search for something..."
          />
          <button className="but" onClick={() => onSearch(value)}>
            {" "}
            <img src="search.png" alt=""></img>{" "}
          </button>
        </div>
        {flag ? (
          <div className="autocom-box">
            {data
              .filter((item) => {
                const searchTerm = value.toLowerCase();
                const fullName = item.full_name.toLowerCase();

                return (
                  searchTerm &&
                  fullName.startsWith(searchTerm) &&
                  fullName !== searchTerm
                );
              })
              .slice(0, 10)
              .map((item) => (
                <div
                  onClick={() => onSearch(item.full_name)}
                  className="dropdown-row"
                  key={item.full_name}
                >
                  {item.full_name}
                </div>
              ))}
          </div>
        ) : null}
        <div className="content">{info[0]}</div>
        <div className="content">{info[1]}</div>
        <div className="content">{info[2]}</div>
      </div>
    </div>
  );
}
