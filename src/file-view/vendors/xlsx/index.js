import React from 'react';
import ExcelJS from 'exceljs';
import Table from './Table';
import 'handsontable/dist/handsontable.full.min.css';
import { createRoot } from 'react-dom/client';

/**
 * 渲染excel
 */
export default async function render(buffer, target) {
  const workbook = await new ExcelJS.Workbook().xlsx.load(buffer);
  return createRoot(target).render(<Table workbook={workbook} />);
}
