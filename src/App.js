import * as React from 'react';
import './App.css';
import { PieChart } from '@mui/x-charts';
import Stack from '@mui/material/Stack';

const data = [
  { id: 0, value: 10, label: "Неуспешные" },
  { id: 1, value: 10, label: "Сломанных" },
  { id: 2, value: 10, label: "Успешных" },
  { id: 3, value: 10, label: "Пропущенных" },
];

const defaultStat = data.length > 0 ? data[0] : null;

const innerRadius = 70;
const outerRadius = 100;
const innerBox = { 
  left: (outerRadius - (Math.sqrt(2) * innerRadius)/2),
  top: outerRadius - (Math.sqrt(2) * innerRadius)/2,
  width: Math.sqrt(2) * innerRadius,
  height: Math.sqrt(2) * innerRadius,
}

function PieCenterLabel({ children }) {
  return (
    <foreignObject x={innerBox.left} y={innerBox.top} width={innerBox.width} height={innerBox.height}>
      <div xmlns="http://www.w3.org/1999/xhtml" style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {children}
      </div>
    </foreignObject>
  );
}

const tg = window.Telegram.WebApp;
function App() {
  const [highlightedItem, setHighLightedItem] = React.useState(null);
  const [highlightedStat, sethighlightedStat] = React.useState(defaultStat);

  React.useEffect( () => {
    tg.ready();
  }, []);

  React.useEffect( () => {
    console.log(highlightedItem?.dataIndex);
    sethighlightedStat( highlightedItem ? data[highlightedItem.dataIndex] : defaultStat)
  }, [highlightedItem]);

  const onClose = () => {
    tg.close();
  }

  return (
    <div className="App">
      <p>Тут должны быть отчеты по вашему прогону...</p>
      <button onClick={onClose}>Close</button>
      <Stack direction="row">
        <PieChart
          className='pieChart'
          colors={["#ff6464", "#ffe162", "#91c483", "#d9d9d9"]}
          slotProps= { {legend: { hidden: true }} }
          series={[
            {
              data: data,
              innerRadius: innerRadius,
              outerRadius: outerRadius,
              paddingAngle: 5,
              cornerRadius: 5,
              startAngle: 0,
              endAngle: 365,
              highlightScope: { highlight: 'item', fade: 'global' },
            },
          ]}
          margin={{ right: 5 }}
          width={200}
          height={200}
          highlightedItem={highlightedItem}
          onHighlightChange={setHighLightedItem}
        >
          <PieCenterLabel>
            <div>
              <div>{highlightedStat.label}</div>
              <div>{highlightedStat.value}</div>
            </div>
          </PieCenterLabel>
        </PieChart>
      </Stack>
    </div>
  );
}

export default App;
