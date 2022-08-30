import {  gql } from '@apollo/client'

export const GET_TASKS = gql`

fragment TIMERECORD_INFO on Timerecord {
    id
    timespent
    startdate
    enddate
    running
    notes
    task{
      id
    }
    contact {
      id
      fullname
    }
  }
  
  query GET_TASKS {
    tasks(
      input: {
        limit: 10
        orderby: { name: asc }
        where: { 
            displaytype:{NEQ:heading},
            status: { EQ: active } }
      }
    ) {
      id
      name
      timerecords(input:{running:{IN:[true,false]}}) {
        ...TIMERECORD_INFO
      }
      taskTotalTimespent: timespent
    }
  }
  
`

export const START_TIMERECORD = gql`
fragment TIMERECORD_INFO on Timerecord {
  id
  timespent
  startdate
  enddate
  running
  notes
  task{
    id
  }
  contact {
    id
    fullname
  }
}

mutation START_TIMERECORD($input: StartTimerecordInput) {
  startTimerecord(input: $input) {
    ...TIMERECORD_INFO
  }
}
`

export const STOP_TIMERECORD = gql`
fragment TIMERECORD_INFO on Timerecord {
  id
  timespent
  startdate
  enddate
  running
  notes
  task{
    id
  }
  contact {
    id
    fullname
  }
}

mutation STOP_TIMERECORD($input: StartTimerecordInput) {
  stopTimerecord(input: $input) {
   ...TIMERECORD_INFO
    }
}
`
