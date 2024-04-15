import { motion } from "framer-motion";
import { Link } from "lucide-react";
import React from "react";
import Card from "./card";

function EditDetailMenu() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        exit={{ opacity: 0, x: 0, translateY: -10 }}
        className=" absolute right-0 top-[100%] z-50 min-h-[156px] w-[207px] drop-shadow-sm"
      >
        {/* mobile menu */}
        <Card className="shadow-xl">
          {/* sec 1 */}
          <ul className="flex w-full flex-col">
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="/account/history">Edit phone number</Link>
            </li>
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="/account/auto-topups">Edit amount</Link>
            </li>
            <li className="my-[10px] w-full font-satoshi text-sm">
              <Link href="/account/auto-topups">Edit auto top-up</Link>
            </li>
          </ul>
        </Card>
      </motion.div>
    </>
  );
}

export default EditDetailMenu;
