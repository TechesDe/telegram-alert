import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import { Icon } from "@iconify/react";

export function Chippler({data, setHighLightedItem, theme, ...props}) {
    return (
    <Stack direction="row" gap={2} useFlexGap sx={{ flexWrap: 'wrap' }} >
        {
          data.map(
            elem => {
              return <Chip 
              theme={theme} 
              sx={{ backgroundColor: `${elem.color}` }} 
              icon={<Icon icon="material-symbols-light:done" width="24" height="24" />} 
              label={`${elem.label} | ${elem.value}`} 
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
        );
}