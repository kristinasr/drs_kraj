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
    alignItems: 'center',
    justifyContent: 'center',
    padding: '5px',
    width: '100%',
    color: '#3d2b1f',
    fontWeight: 'bold',
    backgroundColor: 'white',
    fontFamily: 'Calibri',
    borderRadius: '5px',
  };

  return (
    <button onClick={odjaviSe} style={stilOdjave}>
      <img src="Pozadine/signout.png" alt="Odjava" style={{ width: '20px', height: '20px' }} />
      Odjava
    </button>
  );
};

export default Odjava;
