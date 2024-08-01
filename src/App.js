import React, { useState } from 'react';
import './index.css';

const initialData = [
  { category_name: "Home Loan", id: 1, threshold: 10, isSelected: false },
  { category_name: "Loan Against property", id: 2, threshold: 10, isSelected: false },
  { category_name: "Personal Loan", id: 3, threshold: 10, isSelected: false },
  { category_name: "Business loan", id: 4, threshold: 10, isSelected: false },
  { category_name: "Life Insurance", id: 10, threshold: 10, isSelected: false },
  { category_name: "Health Insurance", id: 11, threshold: 10, isSelected: false },
  { category_name: "General Insurance", id: 12, threshold: 10, isSelected: false }
];

function App() {
  const [data, setData] = useState(initialData);
  const [globalThreshold, setGlobalThreshold] = useState(10);
  const [showThreshold, setShowThreshold] = useState('yes');

  console.log("data", data.filter(cat => cat.isSelected).map(cat => ({ id: cat.id, threshold: cat.threshold })));

  const handleRadioChange = (event) => {
    setShowThreshold(event.target.value);
  };

  const handleCheckboxChange = (category) => {
    const newData = data.map(item =>
      item.id === category.id
        ? { ...item, isSelected: !item.isSelected }
        : item
    );
    setData(newData);

  };

  const handleSelectAllChange = (event) => {
    const selectAll = event.target.checked;
    const newData = data.map(item => ({
      ...item,
      isSelected: selectAll,
      threshold: selectAll ? globalThreshold : item.threshold
    }));
    setData(newData);
  };

  const handleGlobalThresholdChange = (event) => {
    const newThreshold = Number(event.target.value);
    setGlobalThreshold(newThreshold);

    const newData = data.map(item =>
       {return { ...item, threshold: newThreshold } }
    );
    setData(newData);
  };

  const handleIndividualThresholdChange = (id, value) => {
    const newData = data.map(item =>
      item.id === id ? { ...item, threshold: Number(value) } : item
    );
    setData(newData);
  };

  return (
    <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen w-full">
      <h1 className="text-2xl font-bold mb-6">Payout</h1>

      <div className="mb-4 max-w-md flex flex-col justify-start items-start w-full">
        <label className='flex gap-2'>
          <input
            type="radio"
            name="showThreshold"
            value="yes"
            checked={showThreshold === 'yes'}
            onChange={handleRadioChange}
          />
          Set flat payout % for all sub-products
        </label>
        <label className='flex gap-2'>
          <input
            type="radio"
            name="showThreshold"
            value="no"
            checked={showThreshold === 'no'}
            onChange={handleRadioChange}
          />
          Set payout % per sub-product
        </label>
      </div>

      {showThreshold === 'yes' && (
        <div className="mb-6 w-full max-w-md flex justify-between items-center">
          <label htmlFor="global-threshold-input" className="block mb-2 text-md font-medium">
            Enter Flat payout
          </label>
          <div className='flex gap-4 items-center justify-center'>
            <input
              type="number"
              id="global-threshold-input"
              min="0"
              value={globalThreshold}
              onChange={handleGlobalThresholdChange}
              className="border border-gray-300 w-16 rounded-md p-2 text-center"
            />
            <div>%</div>
          </div>
        </div>
      )}

      <div className="max-w-md flex justify-between items-center mb-4 w-full font-medium">
        <div>Sub Product</div>
        <div>Payout %</div>
      </div>

      <div className="mb-4 max-w-md flex items-center justify-start w-full">
        <input
          type="checkbox"
          id="select-all"
          checked={data.length > 0 && data.every(item => item.isSelected)}
          onChange={handleSelectAllChange}
          className="mr-4 w-4 h-4"
        />
        <label htmlFor="select-all" className="text-md">Select All</label>
      </div>

      <div className="w-full max-w-md mb-6">
        {data.map(item => (
          <div key={item.id} className="flex justify-between items-center mb-4">
            <div>
              <input
                type="checkbox"
                id={`checkbox-${item.id}`}
                checked={item.isSelected}
                onChange={() => handleCheckboxChange(item)}
                className="mr-4 w-4 h-4"
              />
              <label htmlFor={`checkbox-${item.id}`} className="text-md font-medium">{item.category_name}</label>
            </div>
            <div className='flex gap-4 items-center justify-center'>
              <input
                type="number"
                id={`input-${item.id}`}
                value={showThreshold === 'yes'  ? item.threshold : (item.isSelected ?  item.threshold :"")}
                min="0"
                onChange={(e) => handleIndividualThresholdChange(item.id, e.target.value)}
                className="border border-gray-300 rounded-md p-2 w-16 text-center ml-4"
                disabled={showThreshold === 'yes' || !item.isSelected}
              />
              <div>%</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
