import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

type UrlInputProps = {
  onSubmit: (url: string) => void; // 메시지 전송 콜백
  clearOnSubmit: boolean;
};

const UrlInput: React.FC<UrlInputProps> = ({ onSubmit, clearOnSubmit }) => {
  const [url, setUrl] = useState('');

  const handleSend = () => {
    const trimmed = url.trim();
    if (trimmed.length > 0) {
      onSubmit(trimmed);
      if (clearOnSubmit) setUrl('');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ ios: 'padding', android: undefined })}
      keyboardVerticalOffset={80}
      style={styles.container}
    >
      <View style={styles.inner}>
        <TextInput
          style={styles.input}
          value={url}
          numberOfLines={2}
          onChangeText={setUrl}
          multiline
          returnKeyType={'send'}
          onSubmitEditing={handleSend}
        />
        <TouchableOpacity style={[styles.sendButton]} onPress={handleSend}>
          <Text style={styles.sendButtonText}>Go</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default UrlInput;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  inner: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    maxHeight: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: 'center',
  },

  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
