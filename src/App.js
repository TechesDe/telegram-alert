import * as React from 'react';
import './App.css';
import { PieChart } from '@mui/x-charts';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { Icon } from "@iconify/react";
import { theme } from './theme/theme.js';
import Link from '@mui/material/Link';

const styleNotSelected = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none'
};

const colors=[theme.palette.status.fail, theme.palette.status.broken, theme.palette.status.success, theme.palette.status.skip];

const data = [
  { id: 0, value: 18, label: "Неуспешные", color: theme.palette.status.fail, 
    tests:[
      {
        title: "ЛК Работодателя. Формы отчётности - Заполнение отчётов",
        importance: "Блокирующий",
        link: "(https://testops.allure.devops.bftcom.com/launch/89445/tree?treeId=48342960&search=W3siaWQiOiJ0ZXN0Q2FzZUlkT3JOYW1lIiwidHlwZSI6InN0cmluZyIsInZhbHVlIjoiMjEyNjk1In1d)"
      }
    ] 
  },
  { id: 1, value: 3, label: "Сломанных", color: theme.palette.status.broken },
  { id: 2, value: 51, label: "Успешных", color: theme.palette.status.success },
  { id: 3, value: 14, label: "Пропущенных", color: theme.palette.status.skip },
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
    console.log(highlightedItem);
    sethighlightedStat( highlightedItem ? data[highlightedItem.dataIndex] : defaultStat)
  }, [highlightedItem]);

  return (
    <div className="App">
      <p><i>Отчёт о прогоне автотестов:</i></p>
      <div><b><i>Прогон API автотестов по сервису ekd на стенде test02</i></b></div>
      <div><i>(Сборка: 17298)</i></div>
      <Stack direction="row" gap={2} useFlexGap sx={{ p:2, justifyContent: "center", alignItems: "center", flexWrap: 'wrap'}}>
        <Link href="https://testops.allure.devops.bftcom.com/launch/89445" underline="always">
          {'Открыть в ТестОпс'}
        </Link>
        <Link href="https://testops.allure.devops.bftcom.com/launch/89445" underline="always">
          {'Открыть в CI/CD"'}
        </Link>
      </Stack>
      {/* <button onClick={onClose}>Close</button> */}
      <Stack direction="column" gap={2} sx={{ justifyContent: "center", alignItems: "center"}}>
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
          onItemClick={(elem, d)=>{setHighLightedItem(d)}}
          highlightedItem={highlightedItem}
          //onHighlightChange={setHighLightedItem}
        >
          <PieCenterLabel>
            <div>
              <div style={styleNotSelected}><b>{( highlightedStat.percent * 100 ).toFixed(2) + "%"}</b></div>
              <div style={styleNotSelected}>из {total}</div>
            </div>
          </PieCenterLabel>
        </PieChart>
          <Stack direction="row" gap={2} useFlexGap sx={{ flexWrap: 'wrap' }}>
          {
            data.map(
              elem => {
                return <Chip 
                theme={theme} 
                sx={{ backgroundColor: `${elem.color}` }} 
                icon={<Icon icon="material-symbols-light:done" width="24" height="24" />} 
                label={`${elem.label}`} 
                onClick={()=>{
                  setHighLightedItem({
                    "seriesId": "auto-generated-id-0",
                    "dataIndex": elem.id
                });
                }}
                />
              })
          }
          </Stack>
          <div>
            {data.filter(elem => elem.id === highlightedItem?.dataIndex).map(elem => <span>{`${elem.label}`}</span>)}
          </div>
          <div>
            {
              data.find(elem => elem.id === highlightedItem?.dataIndex)?.tests?.map(elem => <span>{`${elem.title}`}</span>)
            }
          </div>
      </Stack>
    </div>
  );
}

export default App;
