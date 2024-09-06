import React, { useEffect, useRef, useState } from 'react'

export default function Chat({socket}) {

    const menssageRef = useRef()        
    const [menssageList,setMenssageList] = useState([])

    useEffect(()=>{
        socket.on('recive_menssage',data =>{
            setMenssageList((current)=>[...current,data])
        })
        return()=> socket.off('recive_menssage')
    },[socket])

    const handleSubmit = ()=> {
        const menssage = menssageRef.current.value
        if(!menssage.trim()) return
        console.log(menssage)

        socket.emit('menssage', menssage)
        limparInput()
    }

    const limparInput = ()=>{
        menssageRef.current.value = ''
    }

  return (
    <div>
        <h1>Chat</h1>
        {
            menssageList.map((menssage,index)=>(
                <p key={index}>{menssage.authorName} : {menssage.text}</p>
            ))
        }
        <input type="text" ref={menssageRef} placeholder='mensagem' />
        <button onClick={()=>handleSubmit()}>enviar</button>
    </div>
  )
}
