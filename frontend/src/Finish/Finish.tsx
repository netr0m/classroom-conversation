import React from 'react'
import { useParams, useHistory } from 'react-router-dom'

import { StyledFinish } from './Finish.styled'

import {
  removeConversation,
  getRecordedConversation,
  getSelectedAvatar,
  getSelectedStudent,
} from './../helpers'
import { UrlParams, Questions, Question, Answers, Answer } from './../types'

import clock from './../static/clock.png'

import teacherFemale from './../static/teacher_woman.png'
import teacherMale from './../static/teacher_man.png'
import studentGirl from './../static/student_girl.png'
import studentBoy from './../static/student_boy.png'

import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
  Image,
} from '@react-pdf/renderer'

Font.register({
  family: 'opensans',
  src: 'https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0ef8pkAg.ttf',
})

Font.register({
  family: 'gloriahallelujah',
  src: 'https://fonts.gstatic.com/s/gloriahallelujah/v11/LYjYdHv3kUk9BMV96EIswT9DIbW-MIS11zamvVCE.ttf',
})

const styles = StyleSheet.create({
  page: {
    padding: 20,
    border: '2 dotted black',
    fontFamily: 'opensans',
  },
  section: {
    textAlign: 'left',
    margin: 15,
  },
  question: { fontSize: 14, marginBottom: 3 },
  answer: { fontSize: 12 },
  notes: {
    height: '91%',
    margin: '5%',
    border: '2 dotted black',
    fontFamily: 'opensans',
  },
  header: {
    margin: 20,
    fontFamily: 'opensans',
    fontSize: 20,
    textAlign: 'center',
  },
  introPage: {
    height: '100%',
  },
  conversatioName: {
    fontFamily: 'gloriahallelujah',
    textAlign: 'center',
    fontSize: 35,
    margin: '5%',
    marginTop: '20%',
  },
  conversationDescription: {
    fontFamily: 'opensans',
    textAlign: 'center',
    fontSize: 17,
    margin: '10%',
  },
  conversationDate: {
    fontFamily: 'opensans',
    fontSize: 12,
    textAlign: 'center',
    bottom: 20,
    position: 'absolute',
    color: 'darkgrey',
  },
  teacher: {
    width: 200,
    position: 'absolute',
    bottom: 0,
    left: 10,
  },
  student: {
    width: 150,
    position: 'absolute',
    bottom: 0,
    right: 10,
  },
})

type PDFProps = {
  name: string
  intro: string
  questions: Questions
  dialog: string[]
  answers: Answers
  student: string
  teacher: string
}

type FinishProps = {
  name: string
  intro: string
  questions: Questions
  answers: Answers
}

const getDate = () => {
  const now = new Date()
  return now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear()
}

const PDFDocument = ({
  name,
  intro,
  questions,
  dialog,
  answers,
  student,
  teacher,
}: PDFProps) => (
  <Document>
    <Page size="A4" style={styles.introPage}>
      <Text style={styles.conversatioName}>{name}</Text>
      <Text style={styles.conversationDescription}>{intro}</Text>

      <Image style={styles.teacher} src={teacher} />
      <Image style={styles.student} src={student} />
      <Text style={styles.conversationDate}>Dato: {getDate()}</Text>
    </Page>

    <Page size="A4" style={styles.page}>
      {dialog.map((q, i) => {
        const question: Question = questions[q]
        const answer: Answer = answers[questions[q].selectedAnswer]

        return (
          <View key={i} style={styles.section}>
            <Text style={styles.question}>
              {i < dialog.length - 1 ? `Lærer ${i + 1}: ` : `Avslutning: `}
              {question.label}
            </Text>
            {answer && i < dialog.length - 1 && (
              <Text style={styles.answer}>
                Elev: {answer ? answer.label : ''}
              </Text>
            )}
          </View>
        )
      })}
    </Page>
    <Page size="A4">
      <View style={styles.notes}>
        <Text style={styles.header}>Notater:</Text>
      </View>
    </Page>
  </Document>
)

const Finish = ({ name, intro, questions, answers }: FinishProps) => {
  const history = useHistory()
  const { uuid } = useParams<UrlParams>()

  const teacherImg: string =
    getSelectedAvatar() === 1 ? teacherFemale : teacherMale
  const studentImg: string =
    getSelectedStudent(uuid) === 1 ? studentGirl : studentBoy
  const finishedAt = new Date().toISOString()
  const pdfFileName = `conversation-${finishedAt}.pdf`

  return (
    <StyledFinish>
      <h1>Samtalen er nå ferdig!</h1>
      <div>
        <button
          onClick={() => {
            removeConversation(uuid)
            history.push('/conversation/' + uuid + '/start')
          }}
        >
          Start samtalen på ny
        </button>

        <PDFDownloadLink
          className="download"
          document={
            <PDFDocument
              name={name}
              intro={intro}
              questions={questions}
              dialog={getRecordedConversation(uuid)}
              answers={answers}
              student={studentImg}
              teacher={teacherImg}
            />
          }
          fileName={pdfFileName}
        >
          {({ loading }: { loading: boolean }) =>
            loading ? 'Loading document...' : 'Last ned samtale'
          }
        </PDFDownloadLink>

        <button onClick={() => history.push('/browse/')}>
          Velg ny samtale
        </button>
      </div>

      <img src={clock} alt="Clock icon"></img>
    </StyledFinish>
  )
}

export default Finish
