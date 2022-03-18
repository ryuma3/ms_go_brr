import styles from '/src/comps/ms/intro/intro.module.sass'
import { useState } from 'react'

export default function Intro({setShowData}) {
    const [showIntro, setShowIntro] = useState(true)
    const show = showIntro ? ' '+styles.show:' '+styles.fade
    const fadeU = showIntro ? "":' '+styles.fadeU
    const fadeD = showIntro ? "":' '+styles.fadeD
    const collapse = () =>{
        setShowIntro(false)
        setTimeout(()=>{
            setShowData(true)
        }, 200)
    }
    return (
    <div className={styles.ms+show}>
        <div className={styles.cont+show}>
            <div className={styles.title+show+fadeD}>Merge Sort</div>
            <button className={styles.gen+show+fadeU} onClick={collapse}>OwO</button>
        </div>
    </div>
    )
}
