import React from 'react';
import { createRoot } from 'react-dom/client';
import { readText } from '../../util';
import CodeViewer from './CodeViewer';

/**
 * 渲染文本
 * @param buffer 文本二进制内容
 * @param target 目标
 */
export default async function renderText(buffer, target) {
  const text = await readText(buffer);
  return createRoot(target).render(<CodeViewer value={text} />);
}
