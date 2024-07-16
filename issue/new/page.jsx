'use client';
import { TextField,TextArea, Button } from '@radix-ui/themes'
import React from 'react'

const NewIssuePage = () => {
  return (
    <div className='max-w-xl space-y-3 '>
      <TextField.Root placeholder="Title…"  >
        
      </TextField.Root> 
      <TextArea placeholder="Description…" />
      <Button style={{background:"yellowgreen"}}>Submmit new issue</Button>
    </div>
  )
}

export default NewIssuePage;
