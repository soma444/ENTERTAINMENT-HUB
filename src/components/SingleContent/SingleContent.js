import React from 'react';
import { img_300, unavailable } from '../../config/config';
import "./SingleContent.css";
import Badge from '@mui/material/Badge';
import ContentModal from '../ContentModal/ContentModal';

const SingleContent = ({
  id,
  poster,
  title,
  date,
  media_type,
  vote_average,
}) => {
  // Round off vote_average to one decimal value
  const roundedVoteAverage = vote_average.toFixed(1);

  return (
    <div className="media">
      <ContentModal media_type={media_type} id={id}>
        <Badge
          badgeContent={roundedVoteAverage}
          color={vote_average >= 6 ? "primary" : "error"} // Set color to "error" for vote_average < 6
        />
        <img
          className='poster'
          src={poster ? `${img_300}${poster}` : unavailable}
          alt={title}
        />
        <b className="title">{title}</b>
        <span className="subTitle">
          {media_type === "tv" ? "TV Series" : "Movie"}
          <span className="subTitle">{date}</span>
        </span>
      </ContentModal>
    </div>
  )
}

export default SingleContent;


