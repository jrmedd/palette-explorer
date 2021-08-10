import * as React from 'react';
import { Button, Platform, Share, View } from 'react-native';
import styled from 'styled-components/native';
import * as Clipboard from 'expo-clipboard';
import { useToast } from "react-native-toast-notifications";
import { MainContainer, Row, TextWithBackground, RightHeaderButtonWrapper } from '../Layout';
import { PalettesContext } from '../utils/PalettesContext';

export const ColorList = ({ navigation, route }) => {
  const toast = useToast();
  const [palettes, setPalettes] = React.useContext(PalettesContext);
  const currentPalette = palettes.paletteData[route.params.paletteIndex];
  const paletteUrl = `https://lospec.com/palette-list/${currentPalette.name.toLowerCase().replace(' ', '-')}`
  const onShare = async () => {
    try {
      const result = await Share.share({
        title: `Lospec Palette – ${currentPalette.name}`,
        message: `${Platform.OS === 'ios' ? `${currentPalette.name}: ${currentPalette.colors.join(', ')}` : paletteUrl}`,
        url: paletteUrl
      },{
        dialogTitle:`Lospec Palette – ${currentPalette.name}`,
        subject: `Lospec Palette – ${currentPalette.name}`

      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
        } 
        else {
        }
      } else if (result.action === Share.dismissedAction) {
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const copyToClipboard = color => {
    Clipboard.setString(color);
    toast.show(`Copied ${color} to clipboard`);
  }
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RightHeaderButtonWrapper>
          <Button onPress={onShare} title="Share" />
        </RightHeaderButtonWrapper>
      ),
    });
  }, [navigation]);
  return (
    <MainContainer>
      { currentPalette.colors.map(color => <Row onPress={()=>copyToClipboard(color)} key={color} background={color}><TextWithBackground>{color}</TextWithBackground></Row>)}
    </MainContainer>
  );
};
