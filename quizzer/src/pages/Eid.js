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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';



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

  const [fetching, setFetching] = useState('false')
  const [details, setDetails] = useState({})
  const [rps, setRps] = useState([])
  const [performed, setPerformed] = useState([])

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

  useEffect(() => {
    if (fetching === true) {
      sts()
      setFetching(false)
    }
  }, [fetching])

  const handleChange = (prop, state, makeFetch) => (event) => {
    switch (state) {
      case 'details':
        setDetails({ ...details, [prop]: event.target.value || event.target.innerText });
        break
      case 'rps':
        const newRps = rps.map($ => $.rid === prop ? {...$, elected: event.target.checked} : $)
        setRps(newRps);
        break
    }
    if (makeFetch) setFetching(true)
  };

  const convertTimeToSeconds = (time) => {
    const arr = time.split(':')
    console.log(arr)
  }

  const history = useHistory()
  console.log(history)
  const cndLink = (cid) => {
    history.push(`/adm/cnd/${cid}`)
  }

  const sts = () => {
    const obj = {details, rps, performed}
    console.log(obj)
    fetch(`http://localhost:4000/exm/${eid}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
      }
    ).catch(err => alert('failed to save'))
  }

  return (
    <div className={classes.wrap}>
      <Typography className={classes.title} variant="h4" component="h4" contentEditable suppressContentEditableWarning={true}
        onBlur={handleChange('title', 'details', true)}
      >
          {details.title}
        </Typography>
      <section>
        <FormControl className={classes.formControl}>
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
            onChange={handleChange('maxDuration', 'details', false)}
            onBlur={sts}
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
            onChange={handleChange('preContent', 'details', false)}
            placeholder="Pre content..." />
        </FormControl>
        <FormControl className={classes.formControl} style={{width: '48%'}}>
          <span>Sum content</span>
          <TextareaAutosize
            rowsMax={4}
            rowsMin={4}
            value={details.sumContent}
            onBlur={sts}
            onChange={handleChange('sumContent', 'details', false)}
            placeholder="Sum content..." />
        </FormControl>
      </section>
      <section>
        <h2>Composition of repositories</h2>
        <List component="nav">
        {rps.map(($, i) => (
            <FormControlLabel
              key={i}
              control={
                <Checkbox
                  checked={$.elected}
                  onChange={handleChange($.rid, 'rps', true)}
                  color="primary"
                />
              }
              label={$.title}
            />
          ))}
        </List>
        <Divider />
      </section>
      <section>
        <h2>Performed</h2>
            <List component="nav">
              {performed.map(($, i) => (
              <ListItem
                button
                key={i} 
                onClick={() => cndLink($.cid)}
              >
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
