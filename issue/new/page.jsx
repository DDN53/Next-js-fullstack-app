'use client';
import { TextField,Button } from '@radix-ui/themes'
import React from 'react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3 '>
      <TextField.Root placeholder="Title…"  >
        
      </TextField.Root> 
      <SimpleMDE placeholder="Description…" />
      <Button style={{background:"yellowgreen"}}>Submmit new issue</Button>
    </div>
  )
}

export default NewIssuePage;
