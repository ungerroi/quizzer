import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

export default function Exm() {
  const classes = useStyles();

  const history = useHistory()
  
  const hyperLink = (eid) => {
    history.push(`./exm/${eid}`)
  }

  const [exmList, setExmList] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/allexm')
      .then($ => $.json())
      .then($ => {
        setExmList($)
      })
  }, [])

  const createNewExmModal = () => {
    // please replace with an html modal
    const title = prompt('New Exam Name:')
    if (title) {
      const options = {
        method: 'POST',
        body: JSON.stringify({title: title}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
      fetch('http://localhost:4000/newexm', options)
        .then($ => $.json())
        .then($ => hyperLink(`./${$.eid}`))
    }
  }

  return (
    <div className={classes.table} >
      <div className={classes.tableHeadline}>
        <h1>Exams</h1>
        <div className={classes.tableHeadlineButtonSec}>
          <button onClick={() => createNewExmModal()} className={classes.tableHeadlineButton}>New</button>
          {/* <button className={classes.tableHeadlineButton}>Archive</button> */}
          <Link to="/adm/def"><button className={classes.tableHeadlineButton}>Defaults</button></Link>
        </div>
      </div>
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>GPA</TableCell>
              <TableCell>Create date</TableCell>
              <TableCell>Last change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {exmList.map((row, i) => (
              <TableRow key={i} onClick={() => {hyperLink(`./${row.eid}`)}}>
              <TableCell component="th" scope="row">
                  {row.title}
              </TableCell>
              <TableCell>{row.gpa}</TableCell>
              <TableCell>{row.cDate}</TableCell>
              <TableCell>{row.lChange}</TableCell>
            </TableRow>
        ))}
        </TableBody>
      </Table>
      </TableContainer>
    </div>
  );
}
