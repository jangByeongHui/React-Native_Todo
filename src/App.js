import React,{useState} from 'react';
import styled,{ThemeProvider} from 'styled-components/native';
import {theme} from './theme';
import {Dimensions, StatusBar} from 'react-native';
import Input from './components/Input';
import {images} from './images';
import IconButton from './components/IconButton';
import Task from './components/Task';
import {AppLoading} from 'expo';
//import AsyncStorage from '@react-native-community/async-storage';
const Container = styled.View`
    flex:1;
    background-color:${({theme})=>theme.background};
    align-items:center;
    justify-content:flex-start;
`;

const Title =styled.Text`
    font-size:40px;
    font-weight:600;
    color:${({theme})=>theme.main};
    align-self:flex-start;
    margin: 0px 20px; 
`
const Contaniner=styled.SafeAreaView`
    flex:1;
    background-color:${({theme})=>theme.background};
    align-items:center;
    justify-content:flex-start;
`; 

const List = styled.ScrollView`
    flex:1;
    width:${({width})=>width-40}px;
`;

export default function App(){
    //const [isReady,setIsReady]=useState(false);
    const [newTask,setNewTasks]=useState('');
    const width =Dimensions.get('window').width;
    const [tasks,setTasks]=useState({});
/*
    const _saveTasks=async tasks=>{
        try{
            await AsyncStorage.setItem('tasks',JSON.stringify(tasks));
            setTasks(tasks);
        } catch(e)
        {
            console.error(e);
        }
    };
    const _loadTasks=async()=>{
        const loadedTasks=async()=>{
            const loadedTasks=await AsyncStorage.getItem('tasks');
            setTasks(JSON.parse(loadedTasks||'{}'));
        };
    };
*/
    const _handleTextChange=text=>{
        setNewTasks(text);
    };

    const _addTask=()=>{
        const ID =Date.now().toString();
        const newTaskObject={
            [ID]:{id:ID, text:newTask,completed:false},
        };
        setNewTasks('');
        setTasks({...tasks,...newTaskObject});
    };

    const _deleteTask=id=>{
        const currentTasks=Object.assign({},tasks);
        delete currentTasks[id];
        setTasks(currentTasks);
    };
    const _toggleTask=id=>{
        const currentTasks = Object.assign({},tasks);
        currentTasks[id]['completed']=!currentTasks[id]['completed'];
        setTasks(currentTasks);
    };
    const _updateTask=item=>{
        const currentTasks=Object.assign({},tasks);
        currentTasks[item.id]=item;
        setTasks(currentTasks);
    };
    const _onBlur=()=>{
        setNewTasks('');
    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar 
                    barStyle="light-content"
                    backgroundColor={theme.background}
                />
                <Title>TODO-List</Title>
                <Input 
                    placeholder="+ Add a Task"
                    value={newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask}
                    onBlur={_onBlur}
                    />
                <List width={width}>
                    {Object.values(tasks)
                    .reverse()
                    .map(item=>(
                        <Task 
                            key={item.id} 
                            item={item}  
                            deleteTask={_deleteTask} 
                            toggleTask={_toggleTask}
                            updateTask={_updateTask}
                        />
                    ))}

                </List>
            </Container>
        </ThemeProvider>
    );
        
}

