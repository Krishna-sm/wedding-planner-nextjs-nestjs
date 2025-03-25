import React from 'react'
import MarkdowIt from 'markdown-it'
import './style.css'
const MarkdownViewCompoents = ({data}) => {

    const md = MarkdowIt()

  return (
    <>
            <article id='markdow_data_compoent' className=' px-3  lg:px-10' dangerouslySetInnerHTML={{__html:md.render(data)}} />
    </>
  )
}

export default MarkdownViewCompoents