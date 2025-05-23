import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Code = styled('code')(({ theme }) => ({
    fontFamily: 'monospace',
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(255, 255, 255, 0.12)',
    padding: '2px 4px',
    borderRadius: 4,
}));



function createData(number, name, importance, link, message) {
  return { number, name, importance, link, message };
}

function getRows(data){
    if (data === undefined)
        return [];
    return data.tests? data.tests.map((elem)=>{
        return createData(elem.allure_id, elem.name, elem.importance, elem.link, elem.message);
    }) : [];
}

function getCard(data){
    return (
        <Card sx={{ maxWidth: 180 }}>
            <CardContent>
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 12 }}>
                    {data.number}
                </Typography>
                <Typography component="div" 
                sx={{ 
                    textAlign: 'left', 
                    display: '-webkit-box',  
                    WebkitLineClamp: 3, 
                    WebkitBoxOrient: 'vertical', 
                    fontWeight: 700, 
                    color: 'text.primary', 
                    fontSize: 11, 
                    overflow:'clip', 
                    textOverflow: 'ellipsis' 
                    }}
                >
                    {data.name}
                </Typography>
                <Typography sx={{ fontSize: 10, color: 'red', mb: 0.5 }}>{data.importance}</Typography>
                <Typography sx={{ fontSize: 10, mb: 0.5, textAlign: 'left' }}>
                Ошибка:
                <br />
                <Code>{`${data.message}`}</Code>
                </Typography>
            </CardContent>
            <CardActions>
                <Button href={data.link} size="small">Открыть</Button>
            </CardActions>
        </Card>
    )
}

export function Cards({id, data}) {
    const [num, setNum] = React.useState(null);

    React.useEffect( () => {
        setNum( id )
      }, [id]);

  return (
    <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
            {getRows(data[num]).map((row) => { return getCard(row); })} 
        </Grid>
    </Box>
  );
}