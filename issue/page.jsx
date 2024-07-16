import React from 'react'
import { Flex, Text, Button, Link } from '@radix-ui/themes';

export default function page() {
  return (
    <div>
      <Button><Link href='/issue/new'>New issue</Link></Button>
    </div>
  )
}
