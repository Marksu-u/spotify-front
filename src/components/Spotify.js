import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import Body from './Body';
import Sidebar from './Sidebar';
import Footer from './Footer';
import CardAlbum from './CardAlbum';

const Spotify = () => {
  return (
    <Container>
      <div className="spotify__body">
        <Sidebar />
        <div className="body">
          <div className="body__contents">
            <Routes>
              <Route path="/" element={<Body />} />
              <Route path="album/:albumId" element={<CardAlbum />} />
            </Routes>
          </div>
        </div>
      </div>
      <div className="spotify__footer">
        <Footer />
      </div>
    </Container>
  );
};

const Container = styled.div`
  max-width: 100vw;
  max-height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-rows: 85vh 15ch;
  .spotify__body {
    display: grid;
    grid-template-columns: 15vw 85vw;
    height: 100%;
    width: 100%;
    background: linear-gradient(transparent, rgba(0, 0, 0, 1));
    background-color: rgb(32, 87, 100);
    .body {
      height: 100%;
      width: 100%;
      overflow: auto;
    }
  }
`;

export default Spotify;
