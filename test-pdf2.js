require('module-alias/register');
const { createElement } = require('react');
const { renderToFile } = require('@react-pdf/renderer');

// Registering require hook for jsx
require('@babel/register')({
  presets: ['@babel/preset-react', '@babel/preset-env'],
  ignore: [/node_modules/]
});

const Chalan = require('./components/dashboard/chalan/chalan.jsx').default;

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
    await renderToFile(createElement(Chalan, { data: mockData, id: "12345" }), 'test.pdf');
    console.log("PDF GENERATION SUCCESSFUL!");
  } catch (error) {
    console.error("PDF GENERATION FAILED:");
    console.error(error.stack);
  }
}

testPdf();
