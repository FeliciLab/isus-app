import React from 'react';
import ConteudoInicial from './ConteudoInicial';
import IDSaudeLoginTemplate from './IDSaudeLoginTemplate';

function Login({ route }) {
  return (
    <IDSaudeLoginTemplate route={route}>
      <ConteudoInicial />
    </IDSaudeLoginTemplate>
  );
}

export default Login;
