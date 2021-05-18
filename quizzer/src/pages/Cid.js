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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import CommentIcon from '@material-ui/icons/Comment';

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
  },
  flex: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  appBar: {
    position: 'relative',
  },
  dialogTitle: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  centerlize: {
    width: '50%',
    margin: 'auto'
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Cid() {
  const classes = useStyles()
  const {cid} = useParams()

  const [info, setInfo] = useState({})
  const [toTake, setToTake] = useState([])
  const [exmList, setExmList] = useState([])
  const [performed, setPerformed] = useState([])
  const [showPass, setShowPass] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [examSelected, setExamSelected] = useState([])

  useEffect(() => {
    fetch(`http://localhost:4000/cnd/${cid}`)
      .then($ => $.json())
      .then($ => {
        setInfo($.info)
        setToTake($.exams.toTake)
        setExamSelected($.exams.toTake)
        setPerformed($.exams.performed)
      })
      .catch(err => alert('faild to fetch'))
  }, [cid])

  useEffect(() => {
    if (modalOpen) {
      fetch(`http://localhost:4000/allexm`)
        .then($ => $.json())
        .then($ => {
          setExmList($)
        })
        .catch(err => alert('faild to fetch'))
    } else {setExmList([])}
  }, [modalOpen])

  useEffect(() => {
    sts()
  }, [toTake])

  const handleChange = (prop) => (event) => {
    setInfo({ ...info, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const examSelectedHandler = (exm) => {
    const test = examSelected.filter($ => $.eid === exm.eid)
    let newExamSelected = []
    if (test.length > 0) {
      newExamSelected = examSelected.reduce((acc, $) => {
        if ($.eid !== exm.eid) {
          acc.push($)
        }
        return acc
      }, [])
    } else {
      newExamSelected = [...examSelected]
      newExamSelected.push(exm)
    }
    console.log(newExamSelected)
    setExamSelected(newExamSelected)
  }

  const checkExmStatus = (eid) => {
    const check = examSelected.filter($ => $.eid === eid)
    return check.length > 0 ? true : false
  }

  const modalHandler = (open, setState) => {
    setModalOpen(open);
    setState ? setToTake(examSelected) : setExamSelected(toTake)
  }

  const sts = () => {
    fetch(`http://localhost:4000/cnd/${cid}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({info, toTake})
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
        <div className={classes.flex}>
          <h2>Exams to take</h2>
          <Button onClick={() => modalHandler(true, false)} variant="contained" color="primary">register</Button>
        </div>
        <List component="nav">
        {toTake.map(($, i) => (
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
      <Dialog className={classes.centerlize} fullScreen open={modalOpen} onClose={() => modalHandler(false, false)} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => modalHandler(false, false)} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.dialogTitle}>
            Registration for exams
          </Typography>
          <Button autoFocus color="inherit" onClick={() => modalHandler(false, true)}>
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <List>
        {exmList.map(($, i) => (
          <>
            <ListItem key={i} dense button
              onClick={(e) => examSelectedHandler({title: $.title, eid: $.eid})}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checkExmStatus($.eid)}
                />
              </ListItemIcon>
              <ListItemText primary={$.title} />
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Dialog>
    </div>
  );
}
