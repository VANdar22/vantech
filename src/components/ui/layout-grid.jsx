import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(selected === card.id ? null : card.id);
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-full p-4 md:p-10 grid grid-cols-1 md:grid-cols-3  max-w-7xl mx-auto gap-4 ">
      {cards.map((card, i) => (
        <div key={i} className={cn(
          card.className,
          "relative overflow-hidden",
          selected === card.id ? "rounded-lg cursor-pointer fixed inset-0 h-1/2 w-full md:w-1/2 m-auto z-50" : "h-full min-h-[200px]"
        )}>
          <motion.div
            onClick={() => handleClick(card)}
            className={cn(
              card.className,
              "relative overflow-hidden",
              "w-full h-full bg-cover bg-center",
              "cursor-pointer"
            )}
            style={{
              backgroundImage: `url(${card.thumbnail})`,
            }}
            layout
          >
            {selected !== card.id && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                <div className="text-white">
                  {card.content}
                </div>
              </div>
            )}
            {selected === card.id && (
              <motion.div
                className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 md:p-8"
                layoutId="card-content"
              >
                <div className="max-w-2xl mx-auto">
                  {card.content}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      ))}
      {selected && (
        <motion.div
          onClick={handleOutsideClick}
          className="fixed inset-0 bg-black/50 z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </div>
  );
};
