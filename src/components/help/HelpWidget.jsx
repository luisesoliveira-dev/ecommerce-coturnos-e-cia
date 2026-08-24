import { useState } from "react";

import { HelpFloatingButton } from "./HelpFloatingButton";
import { HelpMenu } from "./HelpMenu";

export function HelpWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HelpMenu isOpen={isOpen} />

      <HelpFloatingButton
        isOpen={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      />
    </>
  );
}