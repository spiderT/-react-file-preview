import React, { useState, useRef } from 'react';
import { HotTable } from '@handsontable/react';
import { Button } from 'antd';
import { registerLanguageDictionary, zhCN } from 'handsontable/i18n';
import './index.scss';

// 矩阵的宽度
export function fixMatrix(data: any, colLen: number) {
  for (const row of data) {
    for (let j = 0; j < colLen; j++) {
      if (!row[j]) {
        row[j] = '';
      }
    }
  }
  return data;
}

registerLanguageDictionary(zhCN);

interface PreviewProps {
  workbook: {
    _worksheets: [];
  };
}

export default function Table(props: PreviewProps) {
  const { workbook } = props;
  const table = useRef(null);
  const [sheetIndex, setSheetIndex] = useState<number>(1);

  function hotSettings() {
    return {
      language: 'zh-CN',
      readOnly: true,
      data: data(),
      cell: cell(),
      mergeCells: merge(),
      colHeaders: true,
      rowHeaders: true,
      height: 'calc(100vh - 107px)',
      outsideClickDeselects: false,
      licenseKey: 'non-commercial-and-evaluation',
    };
  }
  function ws(): any {
    if (workbook?._worksheets) {
      const index = sheetIndex || sheets()[0].id;
      return workbook?._worksheets?.[index];
    }
    return null;
  }
  function sheets(): any[] {
    if (workbook._worksheets) {
      return workbook._worksheets.filter((sheet: { _rows: string | any[] }) => sheet._rows.length);
    }
    return [];
  }
  function merge(this: any) {
    const { ws: { _merges: merges = {left: 0,top:0, right:0, bottom:0} } = {} } = this;
     // @ts-ignore
    return Object.values(merges).map(({ left, top, right, bottom }) => {
      // 构建区域
      return {
        row: top - 1,
        col: left - 1,
        rowspan: bottom - top + 1,
        colspan: right - left + 1,
      };
    });
  }
  function data() {
    return fixMatrix(
      ws()
        .getRows(1, ws().actualRowCount)
        .map((row: { _cells: any[] }) =>
          row._cells.map((item: { model: { value: any } }) => {
            const value = item.model.value;
            if (value) {
              return value.richText ? value.richText.text : value;
            }
            return '';
          })
        ),
      cols()?.length
    );
  }
  function cols() {
    return ws().columns.map((item: { letter: any }) => item.letter);
  }
  function columns() {
    return ws().columns.map((item: { width: number; alignment: any }) => ({
      ...(item.width ? { width: item.width < 100 ? 100 : item.width } : { width: 100 }),
      renderer: 'styleRender',
    }));
  }
  function cell() {
    return ws()
      .getRows(1, ws().actualRowCount)
      .flatMap((row: { _cells: any[] }, ri: any) => {
        return row._cells
          .map((cell: { style: any; alignment: any }, ci: any) => {
            if (cell.style) {
              return {
                row: ri,
                col: ci,
                style: cell.style,
              };
            }
          })
          .filter((i: any) => i);
      });
  }

  function updateTable() {
    // @ts-ignore
    table.current?.()?.updateSettings({
      mergeCells: merge(),
      data: data(),
      colHeaders: cols(),
      columns: columns(),
      cell: cell(),
    });
  }

  // 切换sheet
  function handleSheet(index: any) {
    if (sheetIndex !== index) {
      setSheetIndex(index);
      updateTable();
    }
  }

  return (
    <div>
       {/* @ts-ignore */}
      <HotTable settings={hotSettings()} ref={table} />
      <div className="btn-group">
        {sheets()?.map((item: { id: React.Key; name: string }) => (
          <Button key={item.id} onClick={() => handleSheet(item.id)} type={sheetIndex === item.id ? 'primary' : 'default'}>
            {item.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
