import React, { useState, useEffect } from "react";
import axios from "axios";

import ReactPaginate from "react-paginate";

import RepoCard from "./components/RepoCard";
import UserDetails from "./components/UserDetails";

function App() {
  const [repos, setRepos] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    const optionsUser = {
      method: "GET",
      url: "https://api.github.com/users/johnpapa",

      headers: {
        "User-Agent": "request",
      },
    };

    const optionsRepo = {
      method: "GET",
      url: `https://api.github.com/users/johnpapa/repos?per_page=10&page=${
        currentPage
      }`,
      headers: {
        "User-Agent": "request",
      },
    };

    axios.request(optionsUser).then(function (response) {
      setUser(response.data);
    });

    axios
      .request(optionsRepo)
      .then(function (response) {
        setRepos(response.data);

        const repos_count  = response.data.length;
        const pages = Math.ceil(repos_count / 2);
        setPageCount(pages);

        setLoading(false);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [currentPage]);

  const handlePageChange = (data) => {
    const newOffset = data.selected + 1;
    setCurrentPage(newOffset);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className='row mt-3'><UserDetails user={user}/></div>
      <div className='row'>
        {repos &&
          repos.map((repo) => {
            return <RepoCard repo={repo} key={repo.id} />;
          })}
      </div>
      <div className='row mt-3'>
        <ReactPaginate
          pageCount={pageCount}
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          onPageChange={handlePageChange}
          containerClassName={"pagination d-flex justify-content-center"}
          previousLinkClassName={"page-link"}
          activeClassName={"page-item active"}
          disabledClassName={"page-item disabled"}
          activeLinkClassName={"page-link"}
          pageLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          breakLinkClassName={"page-link"}
        />
      </div>
    </div>
  );
}

export default App;
