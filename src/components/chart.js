import * as React from 'react';
import './../App.css';
import { PieChart } from '@mui/x-charts';

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

const styleNotSelected = {
    userSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
    msUserSelect: 'none'
  };     

export function Chart({colors, data, highlightedItem, highlightedStat}, ...props) {
    const total = data.reduce((accum, item) => accum + item.value, 0);

    return (
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
        onItemClick={(elem, d)=>{highlightedItem.set(d)}}
        highlightedItem={highlightedItem.item}
        //onHighlightChange={setHighLightedItem}
    >
    <PieCenterLabel>
      <div>
        <div style={styleNotSelected}><b>{( highlightedStat.percent * 100 ).toFixed(2) + "%"}</b></div>
        <div style={styleNotSelected}>из {total}</div>
      </div>
    </PieCenterLabel>
  </PieChart>);
}