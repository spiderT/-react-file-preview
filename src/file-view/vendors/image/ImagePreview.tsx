/**
 * @module ItemPreview
 * @description 预览指定项
 */
import React from 'react';
import { UploadFile } from 'antd/lib/upload/interface';
import { Image } from 'antd';

export const mapping = {
  image: /\.(png|jpg|jpeg|gif|bmp|webp)$/,
};

export interface ItemPreviewProps {
  onCancel: () => void;
  file: UploadFile;
}

export interface ItemPreviewState {}

export default class ItemPreview extends React.Component<ItemPreviewProps, ItemPreviewState> {
  onCancel = () => {
    this.props?.onCancel();
  };

  // 默认渲染预览
  renderDefaultPreview(url: string) {
    if (mapping.image.test(url)) {
      return (
        <Image.PreviewGroup preview={{ onVisibleChange: this.onCancel, visible: true }}>
          <Image src={url} style={{ display: 'none' }} />
        </Image.PreviewGroup>
      );
    }
    this.onCancel();
  }

  render() {
    const { file } = this.props;
    const url = file?.url || file?.thumbUrl as string;
    if (!file) return '';
    return this.renderDefaultPreview(url);
  }
}
