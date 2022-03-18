import styles from '/src/comps/ms/datadisplay/datadisplay.module.sass'
import DisplayElem from './displayelem'



let prevShowData = false
export default function DataDisplay({showData, data}) {
     
    let show = ""
    if (showData && !prevShowData){
        prevShowData = true
        show = showData ? " "+styles.show+" "+styles.fadeIn:""
    
    }
    else{show = showData ? " "+styles.show:""}
    return (
    <div className={styles.ms+show}>
        <div className={styles.cont}>{
            data.arr.map((val,i) => {
                return <DisplayElem val={val} s1={data.s1} s2={data.s2} e1={data.e1} e2={data.e2} i={i}/>
            })}
        </div>
    </div>
    )
}

