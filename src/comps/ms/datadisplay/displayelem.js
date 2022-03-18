import styles from '/src/comps/ms/datadisplay/displayelem.module.sass'

export default function DisplayElem({val, s1, s2, e1, e2, i}) {

    const showS1 = s1===i ? ' '+styles.s1:""
    const showS2 = s2===i ? ' '+styles.s2:""
    const showR1 = s1<=i && i<=e1 ? ' '+styles.r1:""
    const showR2 = s2<=i && i<=e2 ? ' '+styles.r2:""

    return (
        <div className={styles.elem}>
            <div className={styles.bar+showS1+showS2+showR1+showR2} style={{height:`${val*20}px`}}></div>
            <div className={styles.val}>{`${val}`}</div>
        </div>
    )
}

