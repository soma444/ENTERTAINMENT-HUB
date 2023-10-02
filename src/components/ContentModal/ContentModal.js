import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import "./ContentModal.css";
import axios from "axios";

import { useState,useEffect } from 'react';
import {
    img_500,
    unavailable,
    unavailableLandscape,
  } from "../../config/config";
import { YoutubeSearchedForOutlined } from '@mui/icons-material';
import Carousel from '../Carousel/Carousel';
const style = {
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    height: '80%',
    backgroundColor: '#39445a',
    border: '1px solid #282c34',
    borderRadius: 10,
    color: 'white',
    boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.5)', // Equivalent boxShadow value
    padding: '8px 8px 24px', // Equivalent padding value
  },
};

  

export default function ContentModal({ children, media_type, id }) {
    const [open, setOpen] = useState(false);
  const [content, setContent] = useState();
  const [video, setVideo] = useState();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const fetchData = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setContent(data);
    // console.log(data);
  };
  const fetchVideo = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );

    setVideo(data.results[0]?.key);
  };
  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <Button onClick={handleOpen} className='media'>
        {children}
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
        style={style.modal} // Apply the modal style to the Modal component
      >
        <Fade in={open}>
         {content &&( 
         <Box sx={style.paper}> {/* Apply the paper style to the Box component */}
           <div className='ContentModal'>
            <img
              alt={content.name || content.title}
              className='Content_portrait'
              src={
                  content.poster_path
                        ? `${img_500}/${content.poster_path}`
                        : unavailable
              }
            
            />
           <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__landscape"
                />
                <div className="ContentModal__about">
                  <span className="ContentModal__title">
                      {content.name || content.title} (
                      {(
                        content.first_air_date ||
                        content.release_date ||
                        "-----"
                      ).substring(0, 4)}
                      )
                    </span> 
                    {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                  )}  
                   <span className="ContentModal__description">
                    {content.overview}
                  </span>  
                  <div>
                    <Carousel id={id} media_type={media_type}/>
                  </div>
                  <Button
                    variant="contained"
                    startIcon={<YoutubeSearchedForOutlined />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                </div>
           </div>
          </Box>
          )}
        </Fade>
      </Modal>
    </div>
  );
}



