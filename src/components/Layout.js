import React from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';
import styled from 'styled-components';

const Layout = ({ children }) => {
  return (
    <Container>
      <Sidebar />
      <MainContent>{children}</MainContent>
      <Footer />
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

const MainContent = styled.div`
  overflow: auto;
`;

export default Layout;
