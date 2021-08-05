import styled from 'styled-components/native';

export const MainContainer = styled.View(props => `
  flex: 1;
  background:black;
`);
export const Row = styled.Pressable(props => `
  flex: ${props.squeeze ? 1.5 : 1};
  flex-direction: row;
  position: relative;
  justify-content: center;
  background-color: ${props.background ?? "#000000"};
`);
export const Tile = styled.View(props => `
  flex: 1;
  background-color: ${props.background};
  justify-content: center;
`);
export const PaletteNameWrapper = styled.View(props => `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: center;
  align-items: center;
`);
export const TextWithBackground = styled.Text(props => `
  color: white;
  background: rgba(0,0,0,0.5);
  padding: 8px;
  text-align: center;
  align-self: center;
  opacity: ${props.hidden ? 0 : 1};
`);
