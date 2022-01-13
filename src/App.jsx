import React, { useEffect, useState } from "react";
import axios from "./Axios/axios";

const App = () => {
  let [state, setState] = useState([]);
  let [searchTerm, setSearchTerm] = useState("");
  let [ascending, setAscending] = useState([]);
  let [descending, setDescending] = useState([]);

  useEffect(() => {
    let Data = async () => {
      let finalData = await axios.get("/posts");
      setState(finalData.data);
    };
    Data();
  }, []);

  let handleAscending = e => {
    e.preventDefault();
    let ascending = state.sort((a, b) => {
      return a.id - b.id;
    });
    setAscending(ascending);
  };

  let handleDescending = e => {
    e.preventDefault();
    let descending = state.sort((a, b) => {
      return b.id - a.id;
    });
    setDescending(descending);
  };

  const displayTitle = state
    .filter((val, ind) => {
      if (setSearchTerm == "") {
        return val;
      } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return val;
      }
    })
    .map(x => {
      return (
        <div key={x.id}>
          <h1>Id:{x.id}</h1>
          <h1>Title:{x.title}</h1>
        </div>
      );
    });

  return (
    <section className=" flex content-center justify-center bg-gray-200 font-bold">
      <article className="mt-[50px]">
        <form>
          <input
            type="search"
            placeholder="Search title ..."
            className="w-[300px]"
            onChange={e => {
              setSearchTerm(e.target.value);
            }}
          />
          <button
            onClick={handleAscending}
            className="bg-red-900 text-white ml-2"
          >
            Ascending
          </button>
          <button
            onClick={handleDescending}
            className="bg-red-900 text-white ml-2"
          >
            Descending
          </button>
        </form>
        <div className="mt-[50px]">
          <h1>{displayTitle}</h1>
        </div>
      </article>
    </section>
  );
};

export default App;
