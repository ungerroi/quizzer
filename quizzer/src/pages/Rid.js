  import React, {useEffect, useState} from 'react';
  import { makeStyles } from '@material-ui/core/styles';
  import List from '@material-ui/core/List';
  import ListItem from '@material-ui/core/ListItem';
  import ListItemIcon from '@material-ui/core/ListItemIcon';
  import ListItemText from '@material-ui/core/ListItemText';
  import Divider from '@material-ui/core/Divider';
  import LiveHelpIcon from '@material-ui/icons/LiveHelp';
  import Typography from '@material-ui/core/Typography';
  import Container from '@material-ui/core/Container';
  import TextField from '@material-ui/core/TextField';
  import Button from '@material-ui/core/Button';
  import { green } from '@material-ui/core/colors';
  import { useParams } from 'react-router-dom';

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      // maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    newBtn: {
      float: 'right',
      right: '-70px'
    },
    qandContainer: {
      marginBottom: '18px'
    },
    ta: {
      color: green[500]
    }
  }));

  export default function Rid() {
    const classes = useStyles();
    const [qanda, setQanda] = useState([])
    const [title, setTitle] = useState('')
    const {rid} = useParams()
    useEffect(() => {
      fetch(`http://localhost:4000/rps/${rid}`)
        .then($ => $.json())
        .then($ => {
          setQanda($.qanda)
          setTitle($.title)
        })
        .catch(err => alert('faild to fetch'))
    }, [rid])
    useEffect(() => {
      fetch(`http://localhost:4000/rps/${rid}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({title: title})
        }
      ).catch(err => alert('faled to save'))
    }, [title, rid])
    const inputAnswerHandler = (payload) => {
      const newQanda = [...qanda]
      newQanda[payload.qid].o[payload.aid] = payload.value
      setQanda(newQanda)
    }
    const iconAnswerHandler = (payload) => {
      const newQanda = [...qanda]
      newQanda[payload.qid].a = payload.aid
      setQanda(newQanda)
      console.log(qanda)
      sts()
    }
    const inputQuestionHandler = (payload) => {
      const newQanda = [...qanda]
      newQanda[payload.qid].q = payload.value
      setQanda(newQanda)
      console.log(qanda)
      sts()
    }
    const titleSts = (e) => {
      setTitle(e.target.innerText)
    }
    const sts = () => {
      fetch(`http://localhost:4000/rps/${rid}`,
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(qanda)
        }
      ).catch(err => alert('failed to save'))
    }
    const makeNewQuestion = () => {
      const newQanda = [...qanda]
      newQanda.unshift({
        q: 'Create new question...',
        o: ['Opiton one', 'Opiton two', 'Opiton three', 'Opiton four'],
        a: 0
      })
      setQanda(newQanda)
    }

    return (
      <div className={classes.root}>
        <Container maxWidth="sm">
        <Typography variant="h2" component="h2" contentEditable suppressContentEditableWarning={true} onBlur={e => titleSts(e)}>
          {title}
        </Typography>
        <hr />
        <Button className={classes.newBtn} variant="contained" color="primary" onClick={makeNewQuestion}>
            New
        </Button>
        <List component="nav" aria-label="main mailbox folders">
          {qanda.map(($a, ia) => (
            <div key={ia} className={classes.qandContainer}>
              <Typography variant="h5" contentEditable suppressContentEditableWarning={true}
                onBlur={e =>inputQuestionHandler({value: e.target.innerText, qid: ia})}
              >
              {$a.q}
              </Typography>
              {$a.o.map(($b, ib) => (
                <div key={ib}>
                  <ListItem>
                    <ListItemIcon>
                      <LiveHelpIcon
                        onClick={e => iconAnswerHandler({qid: ia, aid: ib})}
                        className={ib === qanda[ia].a ? classes.ta : ''}
                      />
                    </ListItemIcon>
                    <ListItemText>
                      <TextField
                      multiline
                      rowsMax={4}
                      value={$b}
                      onInput={e => inputAnswerHandler({value: e.target.value, qid: ia, aid: ib})}
                      onBlur={sts}
                    />
                    </ListItemText>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </div>
          ))}
        </List>
        </Container>
      </div>
    );
  }
