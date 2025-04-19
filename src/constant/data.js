import { theme } from '../theme/theme.js';
import launch from '../data/Прогон API автотестов по сервису ekd на стенде test02.json';

const skipped = launch.filter(elem => elem.status === "skipped");
const failed = launch.filter(elem => elem.status === "failed");
const passed = launch.filter(elem => elem.status === "passed");
const broken = launch.filter(elem => elem.status === "broken");


export const data = [
  { id: 0, value: failed.length, label: "Неуспешныx", color: theme.palette.status.fail, tests: failed },
  { id: 1, value: broken.length, label: "Сломанных", color: theme.palette.status.broken, tests: broken },
  { id: 2, value: passed.length, label: "Успешных", color: theme.palette.status.success, tests: passed },
  { id: 3, value: skipped.length, label: "Пропущенных", color: theme.palette.status.skip, tests: skipped },
];

const total = data.reduce((accum, item) => accum + item.value, 0);

data.forEach(item => {
  item.percent = total > 0 ? item.value / total : 0;
})