import React from 'react';
import './index.css';

const Loader = () => (
  <div className="loader-container">
    <div className="loader"></div>
    <p className="loader-text">
      Le premier chargement des données peut prendre de 30 à 50 secondes. Si
      cela prend trop de temps, n'hésitez pas à contacter notre support.
    </p>
  </div>
);

export default Loader;
