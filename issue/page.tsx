import Link from "next/link";
import { Button } from "@radix-ui/themes";
import React from "react";

const NewIssueButton = () => {
  return (
    <Link href="/issue/new">
      <Button style={{ background: "yellowgreen" }}>New issue</Button>
    </Link>
  );
};

export default NewIssueButton;
