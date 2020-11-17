import React from 'react';
import featureAtivas from '../../../src/featureAtivas';
import feature from '../../../src/constantes/features';
import HomeScreen from '../../../src/pages/Home'

if (featureAtivas.includes(feature.EDICAO_DE_INFORMACOES_PROFISSIONAIS)) {
    test('verifica se seção de linhas de cuidado esta na tela', () => {
        const { getByText } = render(<HomeScreen/>);
        const titulo = getByText('Linhas de Cuidado');

        expect(titulo).not.toBeNull();
    })
}