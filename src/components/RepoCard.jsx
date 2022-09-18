import React, { useState, useEffect } from "react";
import axios from "axios";
import Language from "./Language";

const RepoCard = (props) => {
  const [languages, setLanguages] = useState(null);
  useEffect(() => {
    const options = {
      method: "GET",
      url: `${process.env.REPO_URL}/${props.repo.owner.login}/${props.repo.name}/languages`,
      headers: {
        "User-Agent": "request",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        setLanguages(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, [props.repo.owner.login, props.repo.name]);
  return (
    <div className="col-md-6">
        <div className='card mb-3' style={{minHeight: "160px"}}>
          <div className='card-body'>
            <h4 className='card-title'>{props.repo.name}</h4>
            <p className='card-text'>{props.repo.description}</p>
            <p className='card-text'>
              {languages &&
                Object.keys(languages).map((language, index) => (
                    <Language language={language} key={index}/>
                ))}
            </p>
          </div>
        </div>
    </div>
  );
};

export default RepoCard;
