import React, { useRef, useEffect } from 'react';
import { UploadFile } from 'antd/lib/upload/interface';
import { CloseOutlined } from '@ant-design/icons';
import ImagePreview, { mapping } from './vendors/image/ImagePreview';
import { getExtend, readBuffer, render } from './util';
import './index.scss';

export interface PreviewProps {
  onCancel?: () => void;
  file?: UploadFile;
  fileUrl?: string;
}

export interface PreviewState {}

export default function FilePreview(props: PreviewProps) {
  const { file, fileUrl: url } = props;
  const outputRef = useRef(null);

  function displayResult(buffer: any, file: UploadFile, url: string) {
    const { name } = file;
    const extend = getExtend(name);
    const output = outputRef.current;
    return new Promise((resolve, reject) => render(buffer, extend, output, url).then(resolve).catch(reject));
  }

  async function handleFile() {
    if (!file) {
      return;
    }
    const originFileObj = file.originFileObj;
    const arrayBuffer = await readBuffer(originFileObj);
    // @ts-ignore
    await displayResult(arrayBuffer, originFileObj, url);
  }

  useEffect(() => {
    handleFile();
  }, [file]);

  if (!file) return null;
  console.log('file', file)
  // @ts-ignore
  if (mapping.image.test(url)) {
    // @ts-ignore
    return <ImagePreview file={file} onCancel={props.onCancel} />;
  }
  return (
    <div className="file-view-container">
      <CloseOutlined className="close-icon" onClick={props.onCancel} />
      <div className="content" ref={outputRef} />
    </div>
  );
}
