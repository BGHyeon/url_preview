import React from 'react';
import { FlatList, Text, View } from 'react-native';
import UrlMetaContainer from './urlMetaContainer.tsx';

type UrlContainerListProp = {
  urls: string[];
};

const UrlContainerList: React.FC<UrlContainerListProp> = props => {
  return (
    <FlatList
      style={{ flex: 1 }}
      contentContainerStyle={{ margin: 16, marginBottom: 32 }}
      data={props.urls}
      ListEmptyComponent={
        <View
          style={{
            height: 600,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>URL을 입력해 보세요</Text>
        </View>
      }
      renderItem={({ item, index }) => (
        <UrlMetaContainer url={item} num={props.urls.length - index} />
      )}
    />
  );
};
export default UrlContainerList;
