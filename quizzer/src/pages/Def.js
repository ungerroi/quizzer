import React, {useEffect, useState} from 'react';
import { duration, makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

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

  useEffect(() => {
    fetch(`http://localhost:4000/exm/${eid}`)
      .then($ => $.json())
      .then($ => {
        setDetails($.details)
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
    }
    if (makeFetch) setFetching(true)
  };

  const convertTimeToSeconds = (time) => {
    const arr = time.split(':')
    console.log(arr)
  }

  const sts = () => {
    const obj = {details}
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
    </div>
  );
}
