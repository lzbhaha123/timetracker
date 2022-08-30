import { useMutation } from '@apollo/client'
import {START_TIMERECORD,STOP_TIMERECORD} from '../api/queries'
import {useState} from 'react'
import '../static/css/style.css'

export function Button(props:{task:any,records:any[],handleStart:any,handleStop:any}){
    const tasks = props.records
    var ableStart = tasks.length == 0 ? true : !tasks[tasks.length-1].running //if the tasks' length is 0, it means no task is being processed.
    const startTask = () =>{
        props.handleStart(props.task)
    }
    const stopTask = () =>{
        props.handleStop(props.task)
    }
    if(ableStart){
        return (<button onClick={startTask}> Start </button>)
    }else{
        return (<button onClick={stopTask}> Stop </button>)
    }

    
}