import React from 'react';
import {useState} from 'react';
import {StyleSheet,View,} from 'react-native';
import MyButton from "./src/componentes/button"
import Display from './src/componentes/display';

const estadoInicial = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0,0],
  current: '0'
}

function App(): JSX.Element {
  const [estado, setState] =  useState( {...estadoInicial} );

  const addDigit = (n) => {
  const clearDisplay = estado.displayValue === '0' ||  estado.clearDisplay
  if(n === '.'&& !clearDisplay && estado.displayValue.includes('.')) {
    return;
 }
//  ta aqui o erro
  const currentValue = clearDisplay ? '' : estado.displayValue
  const displayValue = currentValue + n;

  setState(estado => ({ ...estado,displayValue: displayValue}));

  if(n != '.'){
    const newValue = parseFloat(displayValue)
    const values = [...estado.values]
    values[estado.current] = newValue
    setState(estado => ({ ...estado,values: values }))
    console.warn(estado);
  }

  if (estado.operation) {
    console.warn(estado.operation)
    setState((estado) => ({ ...estado, clearDisplay: false }));
  }
  }

  const clearMemory = () => {
    setState({...estadoInicial})
  }

  const setOperation = (operation) => {
    if(estado.current === '0'){
      setState(estado =>({...estado,operation,current: 1,clearDisplay:true}))
    }
    else{
      const equals = operation === '='
      const values = [...estado.values]
    try {
      values[0] = eval(`${values[0]} ${estado.operation} ${values[1]}`)
  } catch(e){
    values[0] = estado.values[0]
  }
  values[1] = 0
  setState(estado => ({...estado,displayValue:`${values[0]}`,
    operation: equals ? null : operation,
    current : equals? 0:1,
    clearDisplay : !equals,
    values
  }))
  
  }
}
  return (
   <View style={styles.container}>
    <Display value={estado.displayValue}></Display>
    <View style = {styles.buttons}>

   <MyButton label='AC' triple onClick={clearMemory}></MyButton>
   <MyButton label='/' operation onClick={()=>{setOperation('/')}}></MyButton>
   <MyButton label='7' onClick={() => addDigit(7)}></MyButton>
   <MyButton label='8'onClick={() => addDigit(8)}></MyButton>
   <MyButton label='9'onClick={() => addDigit(9)}></MyButton>
   <MyButton label='*' operation onClick={()=>{setOperation('*')}}></MyButton>
   <MyButton label='4' onClick={() => addDigit(4)}></MyButton>
   <MyButton label='5' onClick={() => addDigit(5)}></MyButton>
   <MyButton label='6' onClick={() => addDigit(6)}></MyButton>
   <MyButton label='-' operation onClick={()=>{setOperation('-')}}></MyButton>
   <MyButton label='1' onClick={() => addDigit(1)}></MyButton>
   <MyButton label='2' onClick={() => addDigit(2)}></MyButton>
   <MyButton label='3' onClick={() => addDigit(3)}></MyButton>
   <MyButton label='+' operation onClick={()=>{setOperation('+')}}></MyButton>
   <MyButton label='0' double onClick={() => addDigit(0)}></MyButton>
   <MyButton label='.' onClick={() => addDigit('.')}></MyButton>
   <MyButton label='=' operation onClick={()=>{setOperation('=')}}></MyButton>
    </View>
   </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
}
})

export default App;
