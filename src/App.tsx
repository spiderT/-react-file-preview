import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import 'antd/dist/reset.css';
import type { UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import FileView from './file-view';

interface UploadFileValue extends UploadFile {
  url?: string;
  key?: string;
  width?: number;
  height?: number;
  config?: any;
}

interface PreviewProps {
  file?: UploadFileValue;
  url?: string;
}

const App: React.FC = () => {
  const [preview, setPreview] = useState<PreviewProps | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const transformObj = (file: UploadFileValue) => {
    file = file || ({} as UploadFileValue);
    const response = file.response || file;
    return {
      url: response.key || response.url,
      width: response.width || file.width,
      height: response.height || file.height,
      config: file.config,
      type: file.type,
      ...file,
    };
  };

  const handleCancel = () => setPreview(null);

  const handlePreview = (file: UploadFile) => {
    const previewFile = transformObj(file);
    const url = previewFile?.url;
    setPreview({
      file: previewFile,
      url,
    });
  };

  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <>
      {/* // action 上传接口 */}
      <Upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" fileList={fileList} onPreview={handlePreview} onChange={handleChange} accept="*">
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </Upload>
      <FileView file={preview?.file} fileUrl={preview?.url} onCancel={handleCancel} />
    </>
  );
};

export default App;
