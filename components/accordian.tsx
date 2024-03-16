import { useEffect } from 'react';
import { styled } from 'nativewind';
import { View, Text, StyleSheet } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';

const StyledView = styled(View);
const StyledText = styled(Text);

type AccordianProps = {
  sections: {
    title: string;
    content: string;
  }[];
};

export default function MyAccordian(props: AccordianProps) {
  const SECTIONS = [
    {
      title: 'First',
      content: 'Lorem ipsum...',
    },
    {
      title: 'Second',
      content: 'Lorem ipsum...',
    },
  ];
  const _updateSections = (activeSections: number[]) => {
    console.log('activeSections:', activeSections);
  };

  const _renderHeader = (title: string) => {
    return (
      <StyledView>
        <StyledText>{title}</StyledText>
      </StyledView>
    );
  };

  const _renderContent = (content: string) => {
    return (
      <StyledView>
        <StyledText>{content}</StyledText>
      </StyledView>
    );
  };

  return (
    <Accordion
      activeSections={[0]}
      sections={['Section 1', 'Section 2', 'Section 3']}
      renderHeader={_renderHeader}
      renderContent={_renderContent}
      onChange={_updateSections}
    />
  );
}
