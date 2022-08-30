import '../static/css/style.css'

interface TaskItem{
    id:number
    notes:string
    fullname:string
    startdate:string
    running:boolean
    timespent:number
}

export function Table(props:any){
    const list = props.records.map((r:TaskItem,index:number)=>(
        <tr key={index}>
            <td>{r.notes}</td>
            <td>{r.fullname}</td>
            <td>{r.startdate.split("T")[0]}</td>
            <td>{r.running ? "running" : r.timespent}</td>
        </tr>
    ))
    return(
        <table className='list_table'>
            <thead>
                <tr>
                <th>Notes</th>
                <th>Tracked By</th>
                <th>Date</th>
                <th>Time</th>
                </tr>
            </thead>
            <tbody>
                {list}
            </tbody>
        </table>
    )
    
}