import { useState } from 'react'; 

function Search(props) {
  const findSearch = (event) => {
    // console.log(event.target.value);
  }

  const searchBoard = (event) => {
    // 엔터키에 대해서만 체크
    if (event.code === 'Enter') {
      props.findBoard(event.target.value);
    }
  }

  return (
    <div className='input-box'>
      <input 
        type='text' 
        className='input-form'
        onChange={(e) => {findSearch(e)}}
        onKeyDown={(e) => {searchBoard(e)}}
        >
      </input>
    </div>
  )
}

export default Search;