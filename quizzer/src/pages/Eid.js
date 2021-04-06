import React, {useEffect, useState} from 'react';
import { duration, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Divider from '@material-ui/core/Divider';
import { useParams } from 'react-router-dom';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  wrap: {
    width: '60%',
    margin: 'auto'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  title: {
    minHeight: '38px',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    margin: '22px auto'
  }
}));

export default function Exm() {
  const classes = useStyles()
  const {eid} = useParams()

  const [details, setDetails] = useState({})
  const [rps, setRps] = useState([])
  const [performed, setPerformed] = useState([])
  const [duration, setDuration] = useState('')

  useEffect(() => {
    fetch(`http://localhost:4000/exm/${eid}`)
      .then($ => $.json())
      .then($ => {
        setDetails($.details)
        setRps($.rps)
        setPerformed($.performed)
      })
      .catch(err => alert('failed to fetch'))
  }, [eid])

  const handleChange = (prop) => (event) => {
    setDetails({ ...details, [prop]: event.target.value });
  };

  const convertTimeToSeconds = (time) => {
    const arr = time.split(':')
    console.log(arr)
  }

  const sts = () => {
    fetch(`http://localhost:4000/exm/${eid}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(details)
      }
    ).catch(err => alert('failed to save'))
  }

  return (
    <div className={classes.wrap}>
      <Typography className={classes.title} variant="h4" component="h4" contentEditable suppressContentEditableWarning={true}>
          {details.title}
        </Typography>
      <section>
        <FormControl className={classes.formControl}>
          {console.log(details)}
          <TextField
            type="time"
            label='Max Duration'
            value={details.maxDuration}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            inputProps={{
              step: 300, // 5 min
            }}
            onChange={handleChange('maxDuration')}
          />
        </FormControl>
        <br />
        <FormControl className={classes.formControl} style={{width: '48%'}}>          
          <span>Pre content</span>
          <TextareaAutosize
            rowsMax={4}
            rowsMin={4}
            value={details.preContent}
            onBlur={sts}
            onChange={handleChange('preContent')}
            placeholder="Pre content..." />
        </FormControl>
        <FormControl className={classes.formControl} style={{width: '48%'}}>
          <span>Sum content</span>
          <TextareaAutosize
            rowsMax={4}
            rowsMin={4}
            value={details.sumContent}
            onBlur={sts}
            onChange={handleChange('sumContent')}
            placeholder="Sum content..." />
        </FormControl>
      </section>
      <section>
        <h2>Composition of repositories</h2>
        <List component="nav">
        {rps.map(($, i) => (
          <ListItem button key={i}>
            <ListItemText primary={$.title} />
          </ListItem>
          ))}
        </List>
        <Divider />
      </section>
      <section>
        <h2>Performed</h2>
            <List component="nav">
              {performed.map(($, i) => (
              <ListItem button key={i}>
                <div><span style={{minWidth: '200px', display: 'inline-block'}}>{$.fullname}</span><span>{$.score}</span></div>
              </ListItem>
              ))}
            </List>
        <Divider />
      </section>
      <section>
        <h2>Statistics</h2>
        
        <Divider />
      </section>
    </div>
  );
}
