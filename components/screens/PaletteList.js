import * as React from 'react';
import { Button, LayoutAnimation } from 'react-native';
import { MainContainer, Row, Tile, TextWithBackground, PaletteNameWrapper, RightHeaderButtonWrapper } from '../Layout';
import { PalettesContext } from '../utils/PalettesContext';

export const PaletteList = ({ navigation, route }) => {
  const palettes = React.useContext(PalettesContext);
  const [visibleColorNames, setVisibleColorNames] = React.useState([]);
  const [pressed, setPressed] = React.useState([]);
  const toggleColors = paletteName => {
    setVisibleColorNames(visibleColorNames.includes(paletteName) ? visibleColorNames.filter(item => item !== paletteName) : [paletteName, ...visibleColorNames]);
  };
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
    <MainContainer>
      {palettes.map((palette, index) => (
        <Row
          onPressIn={() => { setPressed([palette.name, ...pressed]); }}
          onPressOut={() => { setPressed(pressed.filter(item => item !== palette.name)); }}
          onPress={() => toggleColors(palette.name)} key={`palette-${index}`}
          squeeze={pressed.includes(palette.name)}
          onLongPress={() => navigation.navigate('Color list', { paletteName: palette.name, paletteAuthor: palette.author, paletteIndex: index })}
        >
          {palette.colors.map(color => <Tile key={color} background={color}><TextWithBackground hidden={!visibleColorNames.includes(palette.name)}>{color}</TextWithBackground></Tile>)}
          <PaletteNameWrapper key={palette.name}><TextWithBackground hidden={visibleColorNames.includes(palette.name)}>{palette.name}</TextWithBackground></PaletteNameWrapper>
        </Row>
      ))}
    </MainContainer>
  );
};
