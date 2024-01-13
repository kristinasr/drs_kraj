import React from 'react';
import axios from 'axios';

const Odjava = () => {
  const odjaviSe = async () => {
    try {
      await axios.post('http://localhost:5000/Odjava');
      window.location.reload();
    } catch (error) {
      console.error('Greška prilikom odjave:', error);
    }
  };

  const stilOdjave = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    width: '100%',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#3d2b1f',
    fontFamily: 'Calibri',
  };

  return (
    <button onClick={odjaviSe} style={stilOdjave}>
      <img src="Pozadine/signout.png" alt="Odjava" style={{ width: '20px', height: '20px', marginRight: '5px' }} />
      Odjava
    </button>
  );
};

export default Odjava;
