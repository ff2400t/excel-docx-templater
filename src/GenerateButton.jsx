import { Button } from "@mantine/core";
// import { useEffect, useState } from "react";
import generateFiles from "./generateFiles";

export default function GenerateButton(props) {
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   if (isLoading) {
  //   const worker = new Worker(new URL('./worker.js', import.meta.url), { type: "module" })
  //   worker.postMessage({
  //     table: props.state.table,
  //     fieldName: props.state.fieldName,
  //     templateBinaryString: props.state.templateBinaryString,
  //   });

  //   worker.onmessage = (e) => {
  //     setIsLoading(falsee);
  // });
  //   };
  // }
  // }, [isLoading]);

  const clickHandler = () => {
    // setIsLoading(true);
    const { table, fieldName, templateBinaryString } = props.state;
    props.dispatch({
      type: "generated",
      value: generateFiles(table, fieldName, templateBinaryString),
    });
    // setIsLoading(false)
  };

  return (
    <Button
      // loading={isLoading}
      onClick={clickHandler}
    >
      Generate
    </Button>
  );
}
