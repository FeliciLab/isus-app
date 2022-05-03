import React from 'react';
import { Snackbar } from 'react-native-paper';

function Alerta(props) {
  const { visivel, textoDoAlerta, duration, ...rest } = props;
  return (
    <Snackbar
      visible={visivel}
      wrapperStyle={{ position: 'relative', zIndex: 500 }}
      duration={duration}
      {...rest}>
      {textoDoAlerta}
    </Snackbar>
  );
}

export default Alerta;
