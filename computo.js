const calculo = () => {
   
    let range = 100
    let randomNum = []
    for(let i=0; i < 200000; i++) {
      let random = Math.floor(Math.random() * range) + 1;
      randomNum.push(random)
    }
    return randomNum
} 

process.on('message', mesajeComputoSend => {
    
    process.send(`${calculo()}`)
})
