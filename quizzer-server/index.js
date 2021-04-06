const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello Roi!')
})

app.get('/allrps', (req, res) => {
    res.json([
        {
          rid: '01',
          title: "node",
          questions: 22,
          cDate: "27/12/20",
          lChange: "28/12/20"
        },
        {
          rid: '02',
          title: "javascript",
          questions: 56,
          cDate: "27/12/20",
          lChange: "28/12/20"
        },
        {
          rid: '03',
          title: "react",
          questions: 17,
          cDate: "27/12/20",
          lChange: "28/12/20"
        },
        {
          rid: '04',
          title: "html/css",
          questions: 12,
          cDate: "27/12/20",
          lChange: "28/12/20"
        }
      ])
})

app.get('/allexm', (req, res) => {
  res.json([
      {
        eid: '01',
        title: "node",
        gpa: 87,
        cDate: "27/12/20",
        lChange: "28/12/20"
      },
      {
        eid: '02',
        title: "javascript",
        gpa: 56,
        cDate: "27/12/20",
        lChange: "28/12/20"
      },
      {
        eid: '03',
        title: "react",
        gpa: 76,
        cDate: "27/12/20",
        lChange: "28/12/20"
      },
      {
        eid: '04',
        title: "html/css",
        gpa: 92,
        cDate: "27/12/20",
        lChange: "28/12/20"
      },
    ])
})

app.get('/allcnd', (req, res) => {
  res.json([
      {
        cid: '01',
        fullname: "chani arad",
        id: '015783658',
        status: 'candidate',
        performed: 2,
        waiting: 2
      },
      {
        cid: '02',
        fullname: "ayala zmir",
        id: '038772345',
        status: 'candidate',
        performed: 3,
        waiting: 1
      },
      {
        cid: '03',
        fullname: "noam rachel",
        id: '029487266',
        status: 'candidate',
        performed: 1,
        waiting: 4
      },
      {
        cid: '04',
        fullname: "rinat madmoni",
        id: '018238483',
        status: 'candidate',
        performed: 0,
        waiting: 4
      },
    ])
})

app.get('/rps/:rid', (req, res) => {
    res.json(
      {
        title: 'some title',
        qanda: [
          {
            q: 'How to create a nested webpage in HTML?',
            o: ['frame tag', 'iframe tag', 'javascript', 'it\'s impossible'],
            a: 1
          }, 
          {
            q: 'Which of those tags is a html5 semantic tag?',
            o: ['div', 'header', 'span', 'select'],
            a: 1
          }
        ]
      }
    )
})

app.post('/newrps', (req, res) => {
  res.json({rid: 5})
})

app.get('/exm/:eid', (req, res) => {
  res.json(
    {
      details: {
        title: 'front end',
        maxDuration: '01:30',
        preContent: 'Default pre content',
        sumContent: 'Default sum content',
      },
      rps: [
        {
          rid: '01',
          title: "node",
          elected: false
        },
        {
          rid: '02',
          title: "javascript",
          elected: true
        },
        {
          rid: '03',
          title: "react",
          elected: true
        },
        {
          rid: '04',
          title: "html/css",
          elected: true
        }
      ],
      performed: [
        {
          fullname: 'rachel taub',
          score: 75
        }, {
          fullname: 'ayala izakov',
          score: 90
        }
      ] 
    }
  )
})

app.get('/cnd/:cid', (req, res) => {
  res.json(
    {
      info: {
        fullname: 'rachel toub',
        realID: '039448396',
        password: '12345678',
        status: 'candidate'
      },
      exams: {
        performed: [
          {
            title: 'node',
            eid: '05',
            grade: 70
          },
          {
            title: 'html/css',
            eid: '01',
            grade: 90
          }
        ],
        toTake: [
          {
            title: 'react',
            eid: '04'
          },
          {
            title: 'javascript',
            eid: '02'
          }
        ]
      }
    }
  )
})

app.post('/rps/:rid', (req, res) => {
    const a = req.body
    res.send('done')
})

app.post('/cnd/:cid', (req, res) => {
  const a = req.body
  console.log(a)
  res.send('done')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})