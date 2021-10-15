import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SlateEditor from "./SlateEditor";
import DraftEditor from "./DraftEditor";
import {useDispatch, useSelector} from "react-redux";
import {abc} from "./redux/pageSlice";
import {EditorState,convertToRaw,convertFromRaw} from "draft-js";
import {useSelected} from "slate-react";

function TabPanel(props) {

    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonAuto() {


    const dispatch = useDispatch();

    // dispatch(abc(counter))
    const classes = useStyles();
    const [currentPageId, setCurrentPageId] = useState("scrollable-auto-tab-0");

    const sctabe = useSelector(state => state.pageReducer[currentPageId]);
    console.log("sctabe", sctabe);
    let editorState1;
    if (sctabe)
    {editorState1 = convertFromRaw(sctabe);}
    const [value, setValue] = React.useState(0);
    const [throwAwayVar,setThrowAwayVar] =  React.useState(0);
    //console.log("editorStateBefore",editorState1.getPlainText(""),currentPageId);
    console.log("ekys",Object.keys(useSelector(state => state.pageReducer)))
    const keyList = useSelector(state => state.pageReducer);
    const handleChange = (event, newValue) => {
      //  editorState1 = useSelector(state =>state.pageReducer[currentPageId])
        console.log("handleChange with old value",value);
        setCurrentPageId(`scrollable-auto-tab-${newValue}`)
        setValue(newValue);
        console.log("handleChange with new value",newValue,currentPageId);
    };
    const [tabarray,settabarray] = useState([]);
    useEffect(()=>{

        const tempArr = [];
        for(let items of Object.keys(keyList)){
            const index = items.split("scrollable-auto-tab-")[1];
            tempArr.push(<Tab label={`Fl ${index}`}  {...a11yProps(index)} key={index} />)
        }
       tempArr.length? settabarray(tempArr):  settabarray(oldstate =>[...oldstate,<Tab label={`Fl 0`}  {...a11yProps(0)} key={0}/> ]);

    },[])

    const func = () =>{
        console.log("called")
        setThrowAwayVar(prevState => prevState+1);
    }
    //setThrowAwayVar(prevState => prevState+1)
    useEffect(() => {
        window.addEventListener("storage", func);
        return () => {
            window.removeEventListener("storage", func);
        };
    },[] );

    const addnewtab = () =>{
         setValue(tabarray.length);
         setCurrentPageId(`scrollable-auto-tab-${tabarray.length}`);
         settabarray(oldstate =>[...oldstate,<Tab label={`Fl ${tabarray.length}`}  {...a11yProps(tabarray.length)} key={tabarray.length}/> ]);
         dispatch(abc({id:`scrollable-auto-tab-${tabarray.length}`,body:convertToRaw(EditorState.createEmpty().getCurrentContent())}))
    }

 /*   useEffect(()=>{
        settabarray(defaultarray)
    },[])*/
/*
    useEffect(()=>{
        b(editorState1)
    },[editorState1]);
*/

const somefunc = (stateObj) =>{
   console.log("desasldfjal;sjfl;asjfl;",stateObj)
    dispatch(abc({id:currentPageId,body:convertToRaw(stateObj.getCurrentContent())}))
};

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="scrollable auto tabs example"
                >
                    {tabarray}
                </Tabs>
            </AppBar>
            {editorState1 && <DraftEditor keyq={EditorState.createWithContent(editorState1)} callback={somefunc}/>}
            <button onClick={addnewtab}>new tab</button>
        </div>
    );
}
