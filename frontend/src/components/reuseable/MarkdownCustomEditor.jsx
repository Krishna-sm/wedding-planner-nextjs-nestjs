'use client'
import React,{useState} from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';

// const mdStr = `# This is a H1  \n## This is a H2  \n###### This is a H6`;

export default function MarkDownCustomEditor({setFieldValue,value,Contentname}) {
    // const [markdown, setMarkdown] = useState(value);

  return (
    <div>
     <MarkdownEditor
    data-color-mode="light"
      value={value}
      height="200px"
      onChange={(value, viewUpdate) => setFieldValue(Contentname,value)}
    />
    </div>
  )
}
