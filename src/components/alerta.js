import React from 'react';
import { Snackbar } from 'react-native-paper';

function Alerta({ visivel, textoDoAlerta }) {
  return (
    <Snackbar
      visible={visivel}
    >
        {textoDoAlerta}
    </Snackbar>
  );
}

export default Alerta;
