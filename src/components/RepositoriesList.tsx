import React, { useState } from "react";
import { useAction } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");

  const { searchRespositories } = useAction();

  const { loading, data, error } = useTypedSelector((state) => state.repositories);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchRespositories(term);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <h2>Search Repositories</h2>
        <input onChange={(e) => setTerm(e.target.value)} value={term} />
        <button>Search</button>
        {loading && <h3>Loading...</h3>}
        {error && <h3>{error}</h3>}
        {data?.map((result, index) => (
          <h4 key={index}>{result}</h4>
        ))}
      </form>
    </div>
  );
};

export default RepositoriesList;
