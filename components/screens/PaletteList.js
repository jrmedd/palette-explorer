import * as React from 'react';
import { Button, LayoutAnimation, Text } from 'react-native';
import { MainContainer, Row, Tile, TextWithBackground, PaletteNameWrapper, RightHeaderButtonWrapper } from '../Layout';
import { PalettesContext } from '../utils/PalettesContext';
import styled from 'styled-components/native';

const VisuallyHiddenText = styled.Text(props=>`
  position: absolute;
  z-index: 0;
`)

export const PaletteList = ({ navigation, route }) => {
  const [palettes, setPalettes] = React.useContext(PalettesContext);
  const [visibleColorNames, setVisibleColorNames] = React.useState([]);
  const [pressed, setPressed] = React.useState([]);
  React.useLayoutEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }, [pressed]);
  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => (
        <RightHeaderButtonWrapper>
            <Button title="About" onPress={()=> navigation.navigate('About')} />
        </RightHeaderButtonWrapper>
        ),
    });
    }, [navigation]);
  return (
    <MainContainer accessibilityRole="menu">
      <VisuallyHiddenText>Top 10 palettes containing {palettes.numberOfColors} colors</VisuallyHiddenText>
      {palettes.paletteData.map((palette, index) => (
        <Row
          accessibilityRole="button"
          accessibilityLabel={`Palette: ${palette.name}. Press and hold to see this palette's individual colour values.`}  
          accessibilityHint={`Pressing and holding this button will navigate you to the palette's individual colour values.`}
          key={`palette-${index}`}
          onPressIn={() => { setPressed([palette.name, ...pressed]); }}
          onPressOut={() => { setPressed(pressed.filter(item => item !== palette.name)); }}
          squeeze={pressed.includes(palette.name)}
          onLongPress={() => navigation.navigate('Color list', { paletteName: palette.name, paletteAuthor: palette.author, paletteIndex: index })}
        >
          {palette.colors.map(color => <Tile key={color} background={color}><TextWithBackground hidden={!visibleColorNames.includes(palette.name)}>{color}</TextWithBackground></Tile>)}
          <PaletteNameWrapper><TextWithBackground hidden={visibleColorNames.includes(palette.name)}>{palette.name}</TextWithBackground></PaletteNameWrapper>
        </Row>
      ))}
    </MainContainer>
  );
};
