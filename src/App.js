import * as React from 'react';
import './App.css';
import { PieChart } from '@mui/x-charts';
import Stack from '@mui/material/Stack';
import { ChartsLegend } from '@mui/x-charts/ChartsLegend';
import { ResponsiveChartContainer } from '@mui/x-charts/ResponsiveChartContainer';

const styleNotSelected = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none'
};

const colors=["#ff6464", "#ffe162", "#91c483", "#d9d9d9"];

const data = [
  { id: 0, value: 18, label: "Неуспешные" },
  { id: 1, value: 3, label: "Сломанных" },
  { id: 2, value: 51, label: "Успешных" },
  { id: 3, value: 14, label: "Пропущенных" },
];

const total = data.reduce((accum, item) => accum + item.value, 0);

data.forEach(item => {
  item.percent = total > 0 ? item.value / total : 0;
  console.log(item.value / total);
})

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
  
  return (
    <div className="App">
      <p><i>Отчёт о прогоне автотестов:</i></p>
      <div><b><i>Прогон API автотестов по сервису ekd на стенде test02</i></b></div>
      <div><i>(Сборка: 17298)</i></div>
      <p>
        <a href='https://testops.allure.devops.bftcom.com/launch/89445'>Открыть в ТестОпс</a>
        <span> </span>
        <a href='https://testops.allure.devops.bftcom.com/launch/89445'>Открыть в CI/CD</a>
      </p>
      {/* <button onClick={onClose}>Close</button> */}
      <Stack direction="row">
        <PieChart
          className='pieChart'
          colors={colors}
          slotProps= { {legend: { hidden: true }} }
          series={[
            {
              data: data,
              innerRadius: innerRadius,
              outerRadius: outerRadius,
              paddingAngle: 1,
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
              <div style={styleNotSelected}><b>{( highlightedStat.percent * 100 ).toFixed(2) + "%"}</b></div>
              <div style={styleNotSelected}>из {total}</div>
            </div>
          </PieCenterLabel>
        </PieChart>
        <ResponsiveChartContainer 
        series={[
          {
              type: 'pie',
              id: 'series-1',
              label: 'Series 1',
              data: data,
            }
          ]} width={200} height={200} colors={colors}>
          <ChartsLegend
            direction="row"
            position={{
              horizontal: 'left',
              vertical: 'top',
            }}
          />
        </ResponsiveChartContainer>
      </Stack>
    </div>
  );
}

export default App;
