import Intro from './intro/intro'
import DataDisplay from './datadisplay/datadisplay'
import { useState } from 'react'
import {floor, random} from 'mathjs'


let step = 600 //the amount of time between each swap/next being displayed (ms)
let mult = 0 //var to hold current time offset (ms)
const data_len = 20 //how many nombre
const data_range = 20 //how big nombre
const display_anim_in_duration = 4000
const initial_wait = 1500 //how long to wait before start merging array (after array built)

const delay_func = (func,arr, s1, s2, e1, e2, delay) =>{
    setTimeout(() => {  
        func([...arr], s1, s2, e1, e2)
    }, delay)
}

//In place Merge Sort (data is the full array, L is the start of the sub arry, R is the end of the sub array)
function IPMS(data, L, R, rend){  
    //base case
    if (L==R){return}
    const mid = floor((L+R)/2)
    //IPMS on sub arrays of data (split at middle)
    IPMS(data, L, mid, rend)
    IPMS(data,mid+1,R, rend)
    
    //merge data[L,mid] and data[mid+1, R] to sorted array
    IPM(data, L, mid, R, rend)
}

//In Place Merge (data is also the full array btw)
function IPM(data, L, mid, R, rend){
    let s1=L
    let s2=mid+1
    let temp
    delay_func(rend, [...data], s1, s2, mid, R, step*mult) //delay function to display intial state (before any merges or moves for this sub array)
    while (s1<=mid && s2<=R){ //while havent passed end of current sub arrays
        mult += 1
        //A SINGLE MERGE STEP

        //s1 smaller so go to next s1 (s1 is already in teh right place)
        if (data[s1] <= data[s2]){s1 += 1} //go to next s1

        //s2 smaller so do shift and swap then go to next s2
        else{
            temp = data[s2] //store the value to be moved (as it will get overwritten)
            for(let i=s2; i>s1; i--){data[i] = data[i-1]} //shift sub array right
            data[s1] = temp //do the swap
            mid = mid + 1 //mid shifted right one
            s1 += 1 //the index of the first start got shifted by 1 because the sub array starting at it got shifted by 1
            s2 += 1 // go to next s2
        }
        delay_func(rend, [...data], s1, s2, mid, R, step*mult) //delay function to display data after moves and/or swaps
    }
}

function randInt(max) {
    return floor(random() * max)+1;
}
function genData(arr){
    for (let i=0; i<data_len; i++){arr[i] = randInt(data_range)}
}
let prevShowData = false

export default function MS() {
    const [showData, setShowData] = useState(false)
    const [data, setData] = useState({
        arr: new Array(data_len),
        s1:0,s2:0,e1:0,e2:0
    })
    
    if (showData && !prevShowData){
        prevShowData = true
        genData(data.arr)
        setTimeout(() =>{IPMS(data.arr, 0, data.arr.length - 1, setAllData)}, display_anim_in_duration + initial_wait)
    }

    const setAllData = (arr, s1, s2, e1, e2) =>{
        data.arr = arr
        data.s1=s1; data.s2=s2; data.e1=e1; data.e2=e2;
        setData({...data})
    }

    return (<>
        <DataDisplay  data={data} showData={showData}/>
        <Intro setShowData={setShowData}/>
    </>)
}
