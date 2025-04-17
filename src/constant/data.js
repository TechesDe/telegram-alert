import { theme } from '../theme/theme.js';

export const data = [
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
})