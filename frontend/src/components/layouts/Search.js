import React ,{useState} from 'react'

const Search = ({history}) => {

    const[keyWord,setKeyWord]=useState('');

    const searchHandler=(e)=>{
        e.preventDefault()

        if(keyWord.trim()){
            history.push(`/search/${keyWord}`)
        }else{
            history.push('/')
        }
    }
    return (
            <form onSubmit={searchHandler}>
                 <div class="input-group">
                    <input
                        type="text"
                        id="search_field"
                        class="form-control"
                        placeholder="Enter Product Name ..."
                        onChange={(e)=>setKeyWord(e.target.value)}
                    />
                    <div class="input-group-append">
                        <button id="search_btn" class="btn">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        </button>
                    </div>
                </div> 
            </form>           
    )
}

export default Search
