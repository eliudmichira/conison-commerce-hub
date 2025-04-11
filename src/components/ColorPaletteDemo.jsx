import React from 'react';
import { useDarkMode } from '../context/DarkModeContext';

const ColorSwatch = ({ color, name, hex }) => {
  const { isDarkMode } = useDarkMode();
  
  return (
    <div className="flex flex-col items-center">
      <div 
        className={`w-24 h-24 rounded-lg shadow-md mb-2`} 
        style={{ backgroundColor: hex }}
      ></div>
      <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{name}</p>
      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{hex}</p>
    </div>
  );
};

const ColorPaletteDemo = () => {
  const { isDarkMode } = useDarkMode();
  
  const mainColors = [
    { name: 'Yellow', hex: '#fce300', variable: 'conison-yellow' },
    { name: 'Cyan', hex: '#00adee', variable: 'conison-cyan' },
    { name: 'Magenta', hex: '#ec008c', variable: 'conison-magenta' },
    { name: 'Gray', hex: '#555356', variable: 'conison-gray' },
    { name: 'White', hex: '#ffffff', variable: 'conison-white' },
  ];
  
  const darkVariants = [
    { name: 'Yellow Dark', hex: '#d9c200', variable: 'conison-yellow-dark' },
    { name: 'Cyan Dark', hex: '#0098d1', variable: 'conison-cyan-dark' },
    { name: 'Magenta Dark', hex: '#c9007a', variable: 'conison-magenta-dark' },
  ];
  
  const lightVariants = [
    { name: 'Yellow Light', hex: '#fffbd6', variable: 'conison-yellow-light' },
    { name: 'Cyan Light', hex: '#d6f5ff', variable: 'conison-cyan-light' },
    { name: 'Magenta Light', hex: '#ffd6ef', variable: 'conison-magenta-light' },
    { name: 'Gray Light', hex: '#e6e6e6', variable: 'conison-gray-light' },
  ];
  
  return (
    <div className={`py-16 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4">
        <h2 className={`text-3xl font-bold mb-8 text-center ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Conison Technologies Color Palette
        </h2>
        
        <div className="mb-12">
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Main Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {mainColors.map((color) => (
              <ColorSwatch 
                key={color.name} 
                color={color.variable} 
                name={color.name} 
                hex={color.hex} 
              />
            ))}
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Dark Variants</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {darkVariants.map((color) => (
              <ColorSwatch 
                key={color.name} 
                color={color.variable} 
                name={color.name} 
                hex={color.hex} 
              />
            ))}
          </div>
        </div>
        
        <div>
          <h3 className={`text-xl font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Light Variants</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {lightVariants.map((color) => (
              <ColorSwatch 
                key={color.name} 
                color={color.variable} 
                name={color.name} 
                hex={color.hex} 
              />
            ))}
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>UI Elements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Buttons</h4>
              <div className="flex flex-col space-y-4">
                <button className="bg-conison-magenta text-white px-4 py-2 rounded-md hover:bg-conison-magenta-dark transition-colors">
                  Primary Button
                </button>
                <button className="bg-conison-cyan text-white px-4 py-2 rounded-md hover:bg-conison-cyan-dark transition-colors">
                  Secondary Button
                </button>
                <button className="bg-conison-yellow text-conison-gray px-4 py-2 rounded-md hover:bg-conison-yellow-dark transition-colors">
                  Accent Button
                </button>
                <button className="border border-conison-magenta text-conison-magenta px-4 py-2 rounded-md hover:bg-conison-magenta hover:text-white transition-colors">
                  Outline Button
                </button>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Text Elements</h4>
              <div className="space-y-3">
                <h5 className="text-conison-gray font-bold">Heading Text</h5>
                <p className="text-conison-gray">Regular paragraph text</p>
                <p>Text with <span className="text-conison-magenta">magenta</span> highlight</p>
                <p>Text with <span className="text-conison-cyan">cyan</span> highlight</p>
                <p>Text with <span className="text-conison-yellow bg-conison-gray p-1 rounded">yellow</span> highlight</p>
                <a href="#" className="text-conison-cyan hover:text-conison-cyan-dark">Link Text</a>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
              <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Form Elements</h4>
              <div className="space-y-4">
                <div>
                  <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Input Field</label>
                  <input 
                    type="text" 
                    className="w-full px-3 py-2 border border-conison-gray rounded-md focus:border-conison-cyan focus:ring focus:ring-conison-cyan-20"
                    placeholder="Enter text" 
                  />
                </div>
                <div>
                  <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Checkbox</label>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      className="h-4 w-4 text-conison-magenta border-conison-gray rounded focus:ring-conison-magenta" 
                    />
                    <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Check me</span>
                  </div>
                </div>
                <div>
                  <label className={`block mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Radio Button</label>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="radio-demo"
                      className="h-4 w-4 text-conison-cyan border-conison-gray focus:ring-conison-cyan" 
                    />
                    <span className={`ml-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Select me</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteDemo; 