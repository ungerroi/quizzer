  import React, {useEffect, useState} from 'react';
  import { makeStyles } from '@material-ui/core/styles';
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
  import ListItem from '@material-ui/core/ListItem';
  import ListItemText from '@material-ui/core/ListItemText';

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
      textTransform: 'uppercase'
    }
  }));

  export default function Cid() {
    const classes = useStyles()
    const {cid} = useParams()

    const [info, setInfo] = useState({})
    const [totake, setTotake] = useState([])
    const [performed, setPerformed] = useState([])

    const [showPass, setShowPass] = useState(false);

    useEffect(() => {
      fetch(`http://localhost:4000/cnd/${cid}`)
        .then($ => $.json())
        .then($ => {
          setInfo($.info)
          setTotake($.exams.toTake)
          setPerformed($.exams.performed)
        })
        .catch(err => alert('faild to fetch'))
    }, [cid])

    const handleChange = (prop) => (event) => {
      setInfo({ ...info, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
      setShowPass(!showPass);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const sts = () => {
      fetch(`http://localhost:4000/cnd/${cid}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(info)
        }
      ).catch(err => alert('faled to save'))
    }

    return (
      <div className={classes.wrap}>
        <h1 className={classes.title}>{info.fullname}</h1>
        <section>
          <h2>Personal Information</h2>
          <FormControl className={classes.formControl}>
            <InputLabel>Full Name</InputLabel>
            <Input defaultValue="..." value={info.fullname} onBlur={sts} onChange={handleChange('fullname')} placeholder="full name..." />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Real ID</InputLabel>
            <Input defaultValue="..." value={info.realID} onBlur={sts} onChange={handleChange('realID')} placeholder="real id..."/>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
            <Input
              type={showPass ? 'text' : 'password'}
              defaultValue="..."
              value={info.password}
              onChange={handleChange('password')}
              onBlur={sts}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Status</InputLabel>
            <Select
              value={info.status || ' '}
              onChange={handleChange('status')}
              onBlur={sts}
            >
              <MenuItem value="candidate">candidate</MenuItem>
              <MenuItem value="employed">employed</MenuItem>
            </Select>
          </FormControl>
          <Divider />
        </section>
        <section>
          <h2>Exams to take</h2>
          <List component="nav">
          {totake.map(($, i) => (
            <ListItem button key={i}>
              <ListItemText primary={$.title} />
            </ListItem>
            ))}
          </List>
          <Divider />
        </section>
        <section>
          <h2>Exams Performed</h2>
              <List component="nav">
                {performed.map(($, i) => (
                <ListItem button key={i}>
                  <div><span style={{minWidth: '200px', display: 'inline-block'}}>{$.title}</span><span>{$.grade}</span></div>
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
