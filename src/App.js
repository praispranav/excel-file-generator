import React, { useState } from 'react';
// import './style.css';
import Excel from 'exceljs';
import saveAs from 'file-saver';
// const Excel = require("exceljs");
export default function App() {
  const [ state, setState ] = useState('abc')
  const handleChange = (e) => setState(e.target.value)

  const Data = [
    {
      label: 'Some Name 1',
      columns: [
        { header: 'Category', key: 'category', width: 20, outlineLevel: 1 },
        { header: 'Products', key: 'product', width: 20, outlineLevel: 1 },
        { header: 'Price', key: 'price', width: 20, outlineLevel: 1 }
      ],
      data: [
        { category: 'Baby Food ', product: 'horlicks', price: '100' },
        { category: 'Food', product: 'Banana', price: '2000' }
      ]
    },
    {
      label: 'SOme Name 2',
      columns: [
        { header: 'Mobile', key: 'mobile', width: 20 },
        { header: 'Price', key: 'price', width: 20 }
      ],
      data: [
        { mobile: 'vikdslasvo', price: '10000' },
        { mobile: 'samsundasdg', price: '20000' }
      ]
    },
    {
      label: 'SOme Name 3',
      columns: [
        { header: 'SOme Other Header', key: 'mobile', width: 40 },
        { header: 'Some Other Header Price', key: 'price', width: 40 }
      ],
      data: [
        { mobile: 'vivdssadaso', price: '10000' },
        { mobile: 'samsunsdasdg', price: '20000' }
      ]
    },
    {
      label: 'SOme Name 4',
      columns: [
        { header: 'Mobile', key: 'mobile', width: 20 },
        { header: 'Price', key: 'price', width: 20 }
      ],
      data: [
        { mobile: 'vivo', price: '10000' },
        { mobile: 'samsung', price: '20000' }
      ]
    },
    {
      label: 'SOme Name 5',
      columns: [
        { header: 'Mobile', key: 'mobile', width: 20 },
        { header: 'Price', key: 'price', width: 20 }
      ],
      data: [
        { mobile: 'vivo', price: '10000' },
        { mobile: 'samsung', price: '20000' }
      ]
    }
  ];

  const generateExcel = async () => {
    const ExcelJSWorkbook = new Excel.Workbook();
    for (let i = 0; i < Data.length; i++) {
      let worksheet = ExcelJSWorkbook.addWorksheet(Data[i].label);

      worksheet.columns = Data[i].columns;

      Data[i].data.forEach(item => {
        worksheet.addRow(item);
      });
      const row = worksheet.getRow(1);
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFF7D7D'
        },
        bgColor: {
          argb: 'FF000000'
        }
      };

      row.font = {
        name: 'Comic',
        size: 16,
        bold: true,
        family: '2',
        color: { argb: 'FFFFFFF' }
      };
    }
    await ExcelJSWorkbook.xlsx.writeBuffer().then(function(buffer) {
      saveAs(
        new Blob([buffer], { type: 'application/octet-stream' }),
        `${state}.xlsx`
      )
    });
  };

  return (
  <div style={{ display: "flex" }}>
    <input type="text" value={state} onChange={handleChange} />
    <button onClick={() => generateExcel()}>Generate Excel Sheet</button>
  </div>
  )
}
