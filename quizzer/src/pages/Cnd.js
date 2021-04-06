import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link, useHistory } from 'react-router-dom';
import { useEffect } from 'react';


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



export default function Cnd() {
  const classes = useStyles();

  const history = useHistory()
  const rowLink = (cid) => {
    history.push(`./cnd/${cid}`)
  }

  const [cndList, setCndList] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/allcnd')
      .then($ => $.json())
      .then($ => {
        setCndList($)
      })
      .catch(err => {
        alert('can\'t fetch data')
        console.log(err)
      })
  }, []) 

  return (
    <div className={classes.table}>
        <div className={classes.tableHeadline}>
        <h1>Candidates</h1>
        <div className={classes.tableHeadlineButtonSec}>
          <Link to="cnd/new"><button className={classes.tableHeadlineButton}>New</button></Link>
          <button className={classes.tableHeadlineButton}>Archive</button>
        </div>
      </div>
        <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Full name</TableCell>
                <TableCell>ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Performed</TableCell>
                <TableCell align="center">Waiting</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {cndList.map((row, i) => (
                <TableRow key={i} onClick={() => {rowLink(`./${row.cid}`)}}>
                  <TableCell>{row.fullname}</TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell align="center">{row.performed}</TableCell>
                  <TableCell align="center">{row.waiting}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
}
