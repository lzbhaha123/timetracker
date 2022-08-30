import { useQuery,useMutation } from '@apollo/client'
import {GET_TASKS,START_TIMERECORD,STOP_TIMERECORD} from '../api/queries'
import {useState} from 'react'
import '../static/css/style.css'
import {Table} from './Table'
import {Button} from './Button'

interface TaskOption{
    id:number
    name:string
}


interface TaskItem{
    id:number
    notes:string
    fullname:string
    startdate:string
    running:boolean
    timespent:number
}

var once = true
var disableSelection : boolean = false
export function Tasks(){
    const { loading, error, data  } = useQuery(GET_TASKS)
    const [startTimerecord, { data:startData,reset:startReset}] = useMutation(START_TIMERECORD)
    const [stopTimerecord, { data:stopData,reset:stopReset }] = useMutation(STOP_TIMERECORD)
    var emptyArray:TaskItem[] = [] // use for set taskArray as an empty array
    const [taskArray,setTaskArray] = useState(emptyArray)
    const [taskItem,setTastItem]  = useState(null)
    if (loading) return <p>Loading...</p>
    if (error) return <p>Error!</p>
    if(stopData){  // update the last item of taskArray and enable the select tag
        stopReset()
        var t = stopData.stopTimerecord
        taskArray.pop()
        taskArray.push({id:t.id,notes:t.notes,fullname:t.contact.fullname,startdate:t.startdate,running:t.running,timespent:t.timespent})
        setTaskArray([...taskArray])
        disableSelection = false 
    }
    if(startData){ // update the last item of taskArray and disable the select tag
        if(once){ // the start data alway be pass for 2 times, 'once' is used to avoid this.
            startReset()
            once=false
            var t = startData.startTimerecord
            taskArray.push({id:t.id,notes:t.notes,fullname:t.contact.fullname,startdate:t.startdate,running:t.running,timespent:t.timespent})
            setTaskArray([...taskArray])
            disableSelection = true
        }
        
    }
    const selectTask = (e:any) =>{
        var i = e.target.value - 1 //the first option (its index is 0) is 'Select Task'
        
        if(i==-1){
            setTaskArray(emptyArray)
            setTastItem(null)
        }else{
            
            if(data.tasks[i].timerecords==null){
                setTaskArray(emptyArray)
            }else{
                var items:TaskItem[] = []
                for (let t of data.tasks[i].timerecords) {
                    items.push({id:t.id,notes:t.notes,fullname:t.contact.fullname,startdate:t.startdate,running:t.running,timespent:t.timespent})
                }
                setTaskArray(items)
            }
            setTastItem(data.tasks[i])
        }
    }
    

    const startTask = (e:any) =>{
        once = true
        startTimerecord({ variables: { input:  {
            "taskid": e.id,
            "notes": e.name
          } 
        }})
    }

    const stopTask = (e:any) =>{
        stopTimerecord({ variables: { input:  {
            "taskid": e.id,
            "notes": e.name
          } 
        }})
    }
    const values = data.tasks.map((t:TaskOption,index:number)=>(
        <option value={index+1} key={t.id}>{t.name}</option>
    ))
    var selection;
   
    if(disableSelection){
        selection = <select onChange={selectTask} disabled>
                        <option value="0">Select Task</option>
                        {values}
                    </select>
    }else{
        selection = <select onChange={selectTask}>
                        <option value="0">Select Task</option>
                        {values}
                    </select>
    }

    return (
        <div >
            <div className='selection_bar'>
                {selection}
                {taskItem ? (
                    <Button records={taskArray} task={taskItem} handleStart={startTask}  handleStop={stopTask} />
                    ) :(
                    <button className='button_frozen'>
                        Start
                    </button>)
                } 
                {taskArray.length == 0 ? "" :  
                    <Table records={taskArray} />
                }
            </div>
        </div>
    )
}

