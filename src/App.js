import React, { useState, useEffect } from 'react';
import axios from 'axios';

import ReactPaginate from 'react-paginate';

import RepoCard from './components/RepoCard';
import UserDetails from './components/UserDetails';
import SearchBar from './components/SearchBar';

const getGithubUser = async () => {
  const { data } = await axios.get('https://api.github.com/users/johnpapa');
  return data;
};

const getGithubRepos = async (search, currentPage) => {
  const qUser = 'user:johnpapa';
  let queryUrl = 'q=';
  if (search) {
    queryUrl += encodeURIComponent(`${qUser} ${search} in:name`);
  } else {
    queryUrl += encodeURIComponent(qUser);
  }

  const { data } = await axios.get(
    `https://api.github.com/search/repositories?${queryUrl}&page=${currentPage}&per_page=10`
  );
  return data;
};

function App() {
  const [repos, setRepos] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getGithubUser().then((data) => {
      setUser(data);
    });

    getGithubRepos(search, currentPage).then((data) => {
      setRepos(data.items);
      setPageCount(Math.ceil(data.total_count / 10));
      setLoading(false);
    });
  }, [currentPage, search]);

  const handlePageChange = (data) => {
    const newOffset = data.selected + 1;
    setCurrentPage(newOffset);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='container'>
      <div className='row mt-3'>
        <UserDetails user={user} />
      </div>
      <div className='row mt-3 mb-3 d-flex justify-content-center'>
        <SearchBar search={search} setSearch={setSearch} />
      </div>
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
          containerClassName={'pagination d-flex justify-content-center'}
          previousLinkClassName={'page-link'}
          activeClassName={'page-item active'}
          disabledClassName={'page-item disabled'}
          activeLinkClassName={'page-link'}
          pageLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          breakLinkClassName={'page-link'}
        />
      </div>
    </div>
  );
}

export default App;
