import * as React from 'react';
import './App.css';
import Stack from '@mui/material/Stack';
import { theme } from './theme/theme.js';
import { Chart } from './components/chart.js';
import { colors } from './theme/statusColors.js';
import { data } from './constant/data.js';
import { Chippler } from './components/chippler.js';
import { BasicTable } from './components/table.js';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Cards } from './components/cards.js';


const defaultStat = data.length > 0 ? data[0] : null;

const tg = window.Telegram.WebApp;
function App() {
  const [highlightedItem, setHighLightedItem] = React.useState(null);
  const [highlightedStat, sethighlightedStat] = React.useState(defaultStat);
  const [view, setView] = React.useState("cards");

  React.useEffect( () => {
    tg.ready();
  }, []);

  React.useEffect( () => {
    sethighlightedStat( highlightedItem ? data[highlightedItem.dataIndex] : defaultStat)
  }, [highlightedItem]);

  return (
    <div className="App">
      <header>
        <div><i>Отчёт о прогоне автотестов:</i></div>
        <div><b><i>Прогон API автотестов по сервису ekd на стенде test02</i></b></div>
        <div><i>(Сборка: 17298)</i></div>
      </header>
      <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{padding: "10px" }}>
        <Button href="https://testops.allure.devops.bftcom.com/launch/89445">Открыть в ТестОпс</Button>
        <Button href="https://testops.allure.devops.bftcom.com/launch/89445">Открыть в CI/CD</Button>
      </ButtonGroup>
      {/* <button onClick={onClose}>Close</button> */}
      <Stack direction="column" gap={2} sx={{ width: "100%", justifyContent: "center", alignItems: "center"}}>
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
        <ToggleButtonGroup
          color="primary"
          value={view}
          exclusive
          onChange={(event, newAlignment) => { setView(newAlignment); }}
          aria-label="Вид отображения"
        >
          <ToggleButton value="table">Таблица</ToggleButton>
          <ToggleButton value="cards">Карточки</ToggleButton>
        </ToggleButtonGroup>
        {view === "table" && <BasicTable data={data} id={highlightedItem?.dataIndex}/>}
        {view === "cards" && <Cards data={data} id={highlightedItem?.dataIndex}/>}
        
      </Stack>
    </div>
  );
}

export default App;
