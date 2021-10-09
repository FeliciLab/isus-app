import React from 'react';
import { Snackbar } from 'react-native-paper';

function Alerta({ visivel, textoDoAlerta }) {
  return (
    <Snackbar
      visible={visivel}
      wrapperStyle={{ position: 'relative', zIndex: 500 }}
    >
      {textoDoAlerta}
    </Snackbar>
  );
}

export default Alerta;
