import { NativeModules } from 'react-native';

const { UrlMetaModule } = NativeModules;

export interface UrlMetaType {
  parseMetaData(
    url: string,
    callback: (image?: string, title?: string, description?: string) => void,
  ): void;
}

const UrlMeta = UrlMetaModule as UrlMetaType;

export default UrlMeta;
