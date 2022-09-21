import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Language from './Language';

const RepoCard = (props) => {
  const [languages, setLanguages] = useState(null);

  const getLanguages = useCallback(async () => {
    const response = await axios.get(props.repo.languages_url);
    setLanguages(response.data);
  }, [props.repo.languages_url]);

  useEffect(() => {
    getLanguages();
  }, [getLanguages]);

  return (
    <div className='col-md-6'>
      <div className='card mb-3' style={{ minHeight: '160px' }}>
        <div className='card-body'>
          <h4 className='card-title'>{props.repo.name}</h4>
          <p className='card-text'>{props.repo.description}</p>
          <div className='card-text'>
            {languages &&
              Object.keys(languages).map((language, index) => (
                <Language language={language} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
