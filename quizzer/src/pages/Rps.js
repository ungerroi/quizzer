import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    width: '60%',
    margin: 'auto'
  },
  tableHeadline: {
    position: 'relative'
  },
  tableHeadlineButtonSec: {
    position: 'absolute',
    right: '0',
    top: '50%'
  },
  tableHeadlineButton: {
    fontSize: '18px',
    transform: 'translate(0, -50%)'
  }
});



export default function Rps() {
  const classes = useStyles();

  const history = useHistory()
  const hyperLink = (rid) => {
    history.push(`./rps/${rid}`)
  }

  const [rpsList, setRpsList] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/allrps')
      .then($ => $.json())
      .then($ => {
        setRpsList($)
      })
  }, [])

  // Methods
  const createNewRpsModal = () => {
    // please replace with an html modal
    const title = prompt('New Repo Name:')
    if (title) {
      const options = {
        method: 'POST',
        body: JSON.stringify({title: title}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      fetch('http://localhost:4000/newrps', options)
        .then($ => $.json())
        .then($ => hyperLink(`./${$.rid}`))
    }
  }

  return (
    <div className={classes.table} >
      <div className={classes.tableHeadline}>
        <h1>Repositories</h1>
        <div className={classes.tableHeadlineButtonSec}>
          {/* <Link to="rps/new"></Link> */}
        <button onClick={() => createNewRpsModal()} className={classes.tableHeadlineButton}>New</button>
          {/* <button onClick={() => hyperLink('arc')} className={classes.tableHeadlineButton}>Archive</button> */}
        </div>
      </div>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">Questions</TableCell>
              <TableCell align="right">Create date</TableCell>
              <TableCell align="right">Last change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {rpsList.map((row, i) => (
              <TableRow key={i} onClick={() => {hyperLink(`./${row.rid}`)}}>
                <TableCell>{row.title}</TableCell>
                <TableCell align="right">{row.questions}</TableCell>
                <TableCell align="right">{row.cDate}</TableCell>
                <TableCell align="right">{row.lChange}</TableCell>
              </TableRow>
          ))}
          </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}
