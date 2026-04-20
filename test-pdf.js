import React from 'react';
import { renderToFile } from '@react-pdf/renderer';
import Chalan from './components/dashboard/chalan/chalan.jsx';

const mockData = {
  createdAt: new Date().toISOString(),
  deliveredQuantity: 100,
  deliveredBy: 'Test Driver',
  roleQuantity: 10,
  vechileNumber: 'ABC-1234',
  order: {
    unit: 'Fabric',
    fabricsName: 'Cotton',
    company: { companyName: 'Test Inc', location: 'Dhaka' },
    details: { sl: '1', style: 'A' },
  }
};

async function testPdf() {
  try {
    await renderToFile(<Chalan data={mockData} id="12345" />, 'test.pdf');
    console.log("PDF GENERATION SUCCESSFUL!");
  } catch (error) {
    console.error("PDF GENERATION FAILED:");
    console.error(error.stack);
  }
}

testPdf();
