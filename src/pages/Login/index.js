import React from 'react';
import ConteudoInicial from './ConteudoInicial';
import IDSaudeLoginTemplate from './idsaudeLoginTemplate';

function Login({ route }) {
  return (
    <IDSaudeLoginTemplate route={route}>
      <ConteudoInicial />
    </IDSaudeLoginTemplate>
  );
}

export default Login;
