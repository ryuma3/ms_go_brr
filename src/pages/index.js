import Head from 'next/head'
import { DodecahedronGeometry } from 'three'
import styles from '../styles/Home.module.sass'
import BG from '/src/comps/bg/bg'
import MS from '/src/comps/ms/ms'

export default function Home() {
  return (
    <div className={styles.main}>
      <Head>
        <title>ubu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <BG />
     <MS />
    </div>
  )
}
