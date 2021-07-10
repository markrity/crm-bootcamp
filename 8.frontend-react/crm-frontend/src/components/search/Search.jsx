import React, {useState, useEffect} from 'react';
import './search.scss'
import CrmApi from '../../helpers/CrmApi';
import SearchResult from '../searchResult/searchResult';

const crmApi = new CrmApi(); 

function Search(props) {

    const [input, setInput] = useState('');
    const [resultsList, setResultList] = useState([]);

    const updateInput = async (input) => {
        if(input !== ''){
            var tempList = await crmApi.getAllClients(input);
        }
        setResultList(tempList);
        setInput(input);
    }


    return (
        <div className='search-container' >
        <input className='form-input'
        key="search"
        value={input}
        placeholder={"Search Client"}
        onChange={(e) => updateInput(e.target.value)}
        />
        <div className='results'>
        { 
        resultsList && resultsList.map((data,index) => {
        if (data) {
          return (
            <div className='result' key={data.client_name}>
                <SearchResult main={data.client_name} second={[data.client_mail, data.client_phone]}/>
	        </div>	
    	   )	
    	 }
    	 return null
        }) }
        </div>
        </div>
    );
}

export default Search;