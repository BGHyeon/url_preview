import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import UrlMeta from '../native/urlMeta.ts';

type UrlMetaContainerProps = {
  url: string;
  num: number;
};
type MetaData = {
  error?: boolean;
  title?: string;
  image?: string;
  description?: string;
};

const UrlMetaContainer: React.FC<UrlMetaContainerProps> = props => {
  const [meta, setMeta] = useState<MetaData | null>(null);
  useEffect(() => {
    UrlMeta.parseMetaData(props.url, (image, title, description) => {
      setMeta({
        error: !title && !description && !image,
        title,
        image,
        description,
      });
    });
  }, [props.url]);
  return (
    <View
      style={{
        marginVertical: 4,
        borderRadius: 16,
        overflow: 'hidden',
        borderColor: 'gray',
        backgroundColor: 'white',
        borderWidth: 1,
      }}
    >
      <View
        style={{ padding: 8, borderBottomWidth: 1, borderBottomColor: 'gray' }}
      >
        <Text>
          {props.num}. {props.url}
        </Text>
      </View>
      <View style={{ padding: 8 }}>
        {!meta ? (
          <View
            style={{
              height: 300,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ActivityIndicator size="large" />
          </View>
        ) : meta.error ? (
          <View
            style={{
              height: 300,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text>Meta 데이터를 불러오는데 실패했습니다</Text>
          </View>
        ) : (
          <View>
            {!!meta.title && (
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                {meta.title}
              </Text>
            )}
            {!!meta.description && (
              <Text style={{ fontSize: 12, color: 'gray' }}>
                {meta.description}
              </Text>
            )}
            {!!meta.image && (
              <View
                style={{ borderRadius: 16, overflow: 'hidden', marginTop: 8 }}
              >
                <Image
                  style={{ width: '100%', height: 200 }}
                  source={{ uri: meta.image }}
                  resizeMode={'cover'}
                />
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

export default UrlMetaContainer;
