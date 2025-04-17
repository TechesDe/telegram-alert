import * as React from 'react';
import './App.css';
import Stack from '@mui/material/Stack';
import { theme } from './theme/theme.js';
import Link from '@mui/material/Link';
import { Chart } from './components/chart.js';
import { colors } from './theme/statusColors.js';
import { data } from './constant/data.js';
import { Chippler } from './components/chippler.js';


const defaultStat = data.length > 0 ? data[0] : null;

const tg = window.Telegram.WebApp;
function App() {
  const [highlightedItem, setHighLightedItem] = React.useState(null);
  const [highlightedStat, sethighlightedStat] = React.useState(defaultStat);

  React.useEffect( () => {
    tg.ready();
  }, []);

  React.useEffect( () => {
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
        <Chart 
          colors = {colors}
          data = {data}
          highlightedItem = {{item: highlightedItem, set: setHighLightedItem}}
          highlightedStat = {highlightedStat}
        />
        <Chippler 
          data = {data} 
          setHighLightedItem={setHighLightedItem} 
          theme = {theme} 
        />
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
