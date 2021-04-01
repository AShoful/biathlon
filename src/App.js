import { useState, useEffect } from "react";
import "./App.css";
import db from "./db";

function App() {
  const [search, setSearch] = useState("");
  const [table, setTable] = useState([]);
  const [sort, setSort] = useState(1);

  useEffect(() => {
    if (Array.isArray(db)) {
      setTable(db);
    }
  }, []);

  const styles = (width) => ({ width: `${width}%`, textAlign: "center" });

  const tableAfterSearch = table.filter((i) =>
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortTable = (field) => {
    setTable((table) =>
      table.sort((a, b) => (a[field] <= b[field] ? sort : sort * -1))
    );
    setSort(sort * -1);
  };

  return (
    <div className="App">
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="search name"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
      </form>
      <table className="table">
        <thead className="thead">
          <tr>
            <td style={styles(5)} onClick={() => sortTable("id")}>
              №
            </td>
            <td style={styles(40)} onClick={() => sortTable("name")}>
              name
            </td>
            <td style={styles(10)} onClick={() => sortTable("hitting")}>
              hitting
            </td>
            <td style={styles(10)} onClick={() => sortTable("rateOfFire")}>
              rateOfFire
            </td>
            <td style={styles(10)} onClick={() => sortTable("country")}>
              country
            </td>
            <td style={styles(15)} onClick={() => sortTable("rate")}>
              rate
            </td>
          </tr>
        </thead>
        <tbody>
          {tableAfterSearch.map((item) => (
            <tr key={item.id} className="tr">
              <td className="td">{item.id}</td>
              <td className="td">{item.name}</td>
              <td className="td">{item.hitting}</td>
              <td className="td">{item.rateOfFire}</td>
              <td className="td">{item.country}</td>
              <td className="td">{item.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
