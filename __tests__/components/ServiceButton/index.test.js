import { render, act, fireEvent } from '@testing-library/react-native';
import React from 'react';
import ServiceButton from '~/components/ServiceButton';
import EspIcon from '~/assets/icons/servicos/esp-icon.svg';

const onPressMock = jest.fn();

const propsMock = {
  Icone: EspIcon,
  titulo: 'Title',
  iconBackgroundColor: '#000',
  onPress: onPressMock,
};

describe('ServiceButton', () => {
  it('Deve renderizar', () => {
    const serviceButton = render(<ServiceButton {...propsMock} />);

    expect(serviceButton).toBeTruthy();
  });

  it('Deve aparecer o Título que foi passado como parâmetro', () => {
    const { getByText } = render(<ServiceButton {...propsMock} />);

    const title = getByText(propsMock.titulo);

    expect(title).toBeTruthy();
  });

  it('Deve chamar o onPess quando clicado', () => {
    const { container } = render(<ServiceButton {...propsMock} />);

    act(() => {
      fireEvent.press(container);
    });

    expect(onPressMock).toHaveBeenCalled();
  });

  it('Deve ter a cor de fundo passada por props', () => {
    const { getByTestId } = render(<ServiceButton {...propsMock} />);

    const serviceButtonIconeWrapper = getByTestId(
      'service-button-icone-wrapper',
    );

    expect(serviceButtonIconeWrapper).toBeTruthy();

    expect(serviceButtonIconeWrapper.props.style[0].backgroundColor).toEqual(
      propsMock.iconBackgroundColor,
    );
  });
});
