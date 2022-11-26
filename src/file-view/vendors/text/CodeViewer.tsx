import React from 'react';
import './index.scss';

interface PreviewProps {
  value: string;
}

export default function CodeViewer(props: PreviewProps) {
  return <pre className="code-area">{props.value}</pre>;
}
