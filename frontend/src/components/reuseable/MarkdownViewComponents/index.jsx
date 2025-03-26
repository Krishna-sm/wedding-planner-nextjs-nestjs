import React from 'react'
import markdownit from 'markdown-it'
import './style.css'
const MarkdownViewCompoents = ({data,className}) => { 

    const md = markdownit()
    const result = md.render(data);
if(!data){
  return <></>
}
  return (
    <> 
            <article id='markdow_data_compoent' className={`  lg:px-10 bg-white py-10 rounded-md shadow-3xl ${className}`} dangerouslySetInnerHTML={{__html:result}} />
    </>
  )
}

export default MarkdownViewCompoents