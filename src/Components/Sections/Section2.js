import React from "react";
import "./Section2.scss";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


const Section2 = ({allItems}) => {
  return (
    <div className="section2Container">
      <div className="textContainer">

      <ImageList className="ImageList">
      <ImageListItem key="Subheader" cols={2}>
        {/* <ListSubheader component="div">December</ListSubheader> */}
      </ImageListItem>
      {allItems.map((item) => (
        <ImageListItem key={item.Photo}>
          <img
            srcSet={`data:image/jpg;base64,${item.Photo}`}
            src={`data:image/jpg;base64,${item.Photo}`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>

        {/* <div className="textSection2">
        <p><h3>"Explore</h3> the musical revolution in our online store! Discover
          cutting-edge instruments and innovative accessories that will take
          your creativity to <strong>new heights</strong>. From tech-infused guitars to unique
          effects, each product has been carefully curated to inspire. Dive into
          musical innovation and elevate your art to unprecedented levels.
          Welcome to the store where music finds its <strong>future!"</strong></p>
        </div> */}
      </div>
    </div>
  );
};

export default Section2;
