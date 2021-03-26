// Mock the ImagePickerManager native module to allow us to unit test the JavaScript code
export default {
  showImagePicker: jest.fn(),
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
};
